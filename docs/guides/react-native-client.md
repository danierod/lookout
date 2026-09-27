# React Native client

This guide explains the React Native client. The locked choices live in [0003 React Native client](../decisions/0003-react-native-client.md). That decision is the rule. This guide is why.

## Why this stack

The product client is Expo SDK 57 (React Native 0.86, React 19.2), TypeScript, and Expo Router. New Architecture is already on. A development build is the daily app. Store Expo Go is still on SDK 54, and MMKV, notifications, Sentry, and charts need native code. Continuous native generation keeps native setup in config plugins; `ios/` and `android/` are generated at build time.

The iOS 27 SDK (Xcode 27) will not launch an app that still uses the old `UIApplication` lifecycle. SDK 57 opts in through `expo-build-properties` with `ios.enableSceneSupport` set to `true`. SDK 58 turns scene support on by default, so that property can go away on the next SDK bump.

SDK 56 documents iOS 16.4+ and Android 7+. SDK 57 is a small React Native 0.86 bump on that base.

Open these accounts before the first release: Apple Developer Program ($99/year; an individual account is enough while the app only reads public addresses; a later wallet that stores or moves assets falls under App Store guideline 3.1.5(i) and needs an organization account), Google Play Console ($25 once), an Expo account, a public privacy policy URL, the bundle id `com.lookout.app`, the Android application id `com.lookout.app`, and the URL scheme `lookout://`.

In store questionnaires, describe a portfolio viewer. Reviewers often treat any Solana UI as an exchange. The review note should say the app shows public holdings and does not custody assets, sign, or trade.

## Project skeleton

Create the app with:

```bash
npx create-expo-app@latest --template default@sdk-57
```

Then run `eas init` with development, preview, and production build profiles. Each profile has a matching EAS Update channel. Add `expo-dev-client`. Use EAS environment variables for API keys. A Helius or price-API key stays on a server. The app calls that API. Use strict TypeScript, the Expo ESLint config, and CI that typechecks, lints, and runs unit tests on every pull request.

Map [DESIGN.md](../../DESIGN.md) and [docs/design/theme.css](../design/theme.css) into a typed token module. Components read those tokens. A raw color or spacing value is a review failure, same as the web rule in [engineering](../engineering.md).

[engineering](../engineering.md) still speaks in web terms (button, Escape, focus trap). On device the equivalents are `accessibilityRole`, `accessibilityLabel`, a 44pt hit target, and Dynamic Type. Do not rewrite engineering.md in this change. Mention that gap so a later change can update it when the app starts.

## State

Split state the way [engineering](../engineering.md) already says.

- **Remote data:** TanStack Query. Holdings, prices, shared looks.
- **On-device data:** MMKV (`react-native-mmkv` v4, plus Nitro modules). Watched addresses, query cache.
- **Secrets:** expo-secure-store. Session token only.
- **Local UI:** `useState`. Selected row, draft address, sheet open.
- **Cross-screen UI:** Zustand, only if two screens must share it.

Query owns loading, error, empty, and success. The watched-address list can live on device for the first version. Holdings still need the network.

## Focus and online

TanStack Query already refetches stale data when a window regains focus and when the network returns. On the web those signals come from `visibilitychange` and online/offline. React Native has neither, so the same defaults sit idle until you feed them AppState and NetInfo.

Query does not ask "is the app open?" inside every `useQuery`. Two process-wide singletons hold that answer:

- `focusManager` answers "is the app focused?". With `refetchOnWindowFocus: true` (the default), a change back to focused refetches queries that are mounted and stale.
- `onlineManager` answers "can we reach the network?". With `networkMode: 'online'` (the default), fetches and retries wait while offline. With `refetchOnReconnect: true`, stale queries refetch when the network returns.

Both start optimistic: focused, and online. On a phone, nothing ever flips those flags, so a return from the home screen does no refresh, and airplane mode still burns the default three retries.

Install NetInfo with `npx expo install @react-native-community/netinfo`. Call both setups once from the Expo Router root layout, before any screen runs `useQuery`.

AppState has three values. Only `active` counts as focused. `background` and iOS `inactive` (app switcher, notification shade, incoming call) count as not focused.

```ts
import { AppState, Platform } from 'react-native'
import type { AppStateStatus } from 'react-native'
import { focusManager } from '@tanstack/react-query'

export function setupFocusManager(): void {
  focusManager.setEventListener((setFocused) => {
    const onChange = (status: AppStateStatus) => {
      if (Platform.OS !== 'web') {
        setFocused(status === 'active')
      }
    }

    const subscription = AppState.addEventListener('change', onChange)
    onChange(AppState.currentState)

    return () => subscription.remove()
  })
}
```

NetInfo splits "a radio is up" (`isConnected`) from "that network can reach the internet" (`isInternetReachable`). The published TanStack example uses only `isConnected`. For holdings and price calls, treat an explicit reachability failure as offline, and treat `null` (still probing) as online so the first launch does not pause every query:

```ts
import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'

export function setupOnlineManager(): void {
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(
        state.isConnected === true && state.isInternetReachable !== false,
      )
    })
  })
}
```

`setEventListener` replaces the previous listener. The function you return must unsubscribe, or Fast Refresh and tests leak native subscriptions.

```tsx
export default function RootLayout() {
  useEffect(() => {
    setupFocusManager()
    setupOnlineManager()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
    </QueryClientProvider>
  )
}
```

What a return to the app actually refetches: the user backgrounds Lookout. Prices pass their `staleTime`. They open the app again. AppState becomes `active`, `focusManager` reports focused, and Query refetches mounted queries whose `staleTime` has elapsed. A query still inside `staleTime` stays cached. A query with no mounted observer stays cached. `refetchOnWindowFocus: 'always'` is the override that ignores `staleTime`. Screen focus inside Expo Router is a separate signal. This wiring is the whole app, not one route.

What an offline phone does. `networkMode: 'online'` gives three different outcomes:

- **Pause.** Query wants to fetch, `onlineManager` says offline, and `fetchStatus` becomes `'paused'`. The request does not start. When NetInfo reports online again, that same fetch continues. That resume is separate from `refetchOnReconnect`.
- **Retry.** A failed `queryFn` schedules another attempt (default: 3). Going offline pauses that chain. Coming back online resumes it.
- **Cancel.** An unmounted observer or an explicit cancel aborts the work. A cancelled query does not resume later.

Airplane mode during a holdings fetch pauses it. Turning the radio back on continues that fetch, and `refetchOnReconnect` refreshes other stale queries. NetInfo still only means "try." A 429 or a timeout remains a normal query error.

What this leaves alone: this wiring does not persist the cache across a killed process. That is a persister (MMKV) plus `@tanstack/react-query-persist-client`. It also does not poll. A timer refetch is `refetchInterval`. `staleTime` remains the control for how noisy focus and reconnect are.

Further reading:

- [https://tanstack.com/query/v5/docs/framework/react/react-native](https://tanstack.com/query/v5/docs/framework/react/react-native)
- [https://tanstack.com/query/v5/docs/framework/react/guides/window-focus-refetching](https://tanstack.com/query/v5/docs/framework/react/guides/window-focus-refetching)
- [https://tanstack.com/query/v5/docs/framework/react/guides/network-mode](https://tanstack.com/query/v5/docs/framework/react/guides/network-mode)



## Auth

The first portfolio does not need an account. A person adds public addresses, and MMKV keeps them.

Shared looks need an account. Use Sign in with Apple and Google. App Store guideline 4.8 requires Apple on iOS as soon as any other social login exists.

Clerk (`@clerk/expo`) if you want hosted auth and native Apple and Google buttons. Better Auth with its Expo plugin if the API and the user table are yours.

Session tokens go in SecureStore. The account id is the analytics id. The Solana address is not a login.

## Notifications

Use `expo-notifications` and the Expo push service. EAS stores the APNs key and the FCM v1 credential.

Ask only after the person creates an alert. A prompt on first launch gets denied, and iOS will not ask again until the person changes Settings.

Android 13 and later needs the notifications permission and a channel. The token is stored on your server, next to the user and the alert. A tap opens the wallet or asset through a deep link.

Price moves and large balance changes are the product reasons. Local notifications cover reminders that need no server.

## Analytics and crashes

Sentry (`@sentry/react-native`) for JavaScript and native crashes, with source maps uploaded from EAS.

PostHog for funnels, feature flags, and replay. Use the EU project if you have EU users. Track `wallet_added`, `portfolio_viewed`, `look_shared`, and `alert_created`.

Sentry owns source-map upload. The PostHog Expo build plugin and the Sentry plugin both try to wrap the iOS bundle phase, and together they can ship an app with no JavaScript bundle. Keep PostHog as a runtime SDK.

Skip the advertising id. Then App Tracking Transparency stays off the first launch. Mask balances and addresses in session replay. Put both vendors in the privacy policy and in the Apple and Google data forms.

## Release

EAS is the release path.

1. Development builds go on your phone.
2. Preview builds go to TestFlight and Play internal testing.
3. Production builds go through `eas submit`.

Use a fingerprint or `appVersion` runtime policy so an over-the-air update only lands on a binary that can run it. JavaScript and assets ship with `eas update`. A new native module, permission, or SDK bump needs a store build.

Roll an update out by percentage. If it crashes on launch, `expo-updates` can roll back. A crash after the first screen does not auto-recover, so check for updates early.

Play Store staged rollout and App Store phased release do the same job for binaries. Bump the user-facing version for store releases. Build numbers only increase.

Store listing needs a privacy policy, screenshots at the required phone sizes, and an age rating. There is no trading and no account at first, so the data-safety form stays short until auth and analytics land.

## Libraries

- `@shopify/flash-list` for holdings and wallet lists.
- `expo-image` for token icons.
- `victory-native` with Skia for price history. Load it on the asset screen only.
- `react-native-reanimated` for motion. Keep durations on the design tokens.
- Zod for the address form. A Solana address is base58 and 32 bytes decoded.
- Maestro for three device flows: add an address, open a portfolio, survive an empty list and an error. Jest and React Native Testing Library cover formatting and components.
- Universal links and Android App Links when a shared look has a public URL.



## Setup order

Set up now: Expo SDK 57 app, EAS profiles, dev client, tokens, TanStack Query, MMKV, Sentry, CI, store accounts, privacy policy URL, and a small API so provider keys stay off the device.

Add with the feature: FlashList and charts with the portfolio, PostHog and deep links with sharing, Apple and Google sign-in with shared looks, push with alerts.

Leave until a later decision: in-app purchase, translations, and any signing or send flow.
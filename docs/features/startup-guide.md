# Startup implementation guide

Steps to build [startup](startup.md). The client is the `app` package (Expo SDK 57). The splash is the OS launch image. It is not a route.

## 1. Read before editing

- [startup](startup.md)
- [engineering](../engineering.md)
- [DESIGN.md](../../DESIGN.md) and `app/src/theme/tokens.ts` — the splash background already matches `colors.background` (`#ffffff`)
- `app/AGENTS.md` — fetch the SDK 57 page before touching the API: [expo-splash-screen](https://docs.expo.dev/versions/v57.0.0/sdk/splash-screen/)

`expo-splash-screen` is already a dependency and already a plugin in `app/app.json`. Do not add `expo-video`. Do not use `app/assets/videos/splash.mp4`.

## 2. Point the plugin at the splash image

The plugin block in `app/app.json` is the splash. Set `image` to `./assets/images/splash.png`.

Leave `backgroundColor` at `#ffffff`. Leave `imageWidth` at `340`. The brief sets no other size.

Confirm `app/assets/images/splash.png` exists. A missing file fails the native build. There is no in-app error screen.

`ios/` and `android/` are generated. Do not edit them by hand.

## 3. Leave the app screens alone

The OS hides the splash when the first frame draws. Expo already does that. Do not call `SplashScreen.preventAutoHideAsync()`. That call holds the splash up after the first frame.

Do not add a splash route. Do not move `app/src/app/index.tsx`. That file stays the first screen and still shows the word Lookout. Home screen work stays out of scope.

Do not add a splash component, a player, or a fallback image branch.

## 4. Rebuild

The plugin is native config. A Metro reload does not apply it. `pnpm expo run:ios` compiles the existing `ios/` folder and does not regenerate it. From `app/`, when that folder already exists:

```sh
pnpm expo prebuild --platform ios --clean
pnpm expo run:ios
```

Same pattern for Android, with `--platform android` and `pnpm expo run:android`.

Store Expo Go shows the app icon in place of this splash. A development build does not show every plugin property. Confirm the real splash on a release build.

## 5. Record it

In `docs/architecture.md`, state that the launch splash is the `expo-splash-screen` plugin in `app/app.json`, and that it is not a route. The root route stays `src/app/index.tsx`.

## 6. Check

Cold start on a release build:

- `splash.png` is on screen before the first frame.
- The splash goes away when the Lookout word in `src/app/index.tsx` draws.
- No video plays.
- No splash route exists.

From `app/`, if any TypeScript or route file changed: `pnpm expo lint` and `pnpm exec tsc --noEmit`. An `app.json` image-path change does not need those.

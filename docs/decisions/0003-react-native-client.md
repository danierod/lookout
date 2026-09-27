# 0003 React Native client

Status: accepted

## Context

Lookout has no product implementation yet. The client will be a mobile app. [Address-only lookup](0001-address-only-lookup.md) still holds: a wallet is a public Solana address. The app reads holdings. It does not import keys, sign, or send.

## Decision

The product client is a React Native app created with Expo SDK 57, Expo Router, and TypeScript.

Releases go through EAS Build, EAS Submit, and EAS Update. Day-to-day development uses a development build.

Remote data uses TanStack Query. On-device data uses MMKV. Session tokens use expo-secure-store.

The root layout wires React Native AppState to Query focusManager and NetInfo to Query onlineManager, once, before any query runs.

Provider API keys stay on a server the app calls.

Accounts wait until shared looks. Sign-in is Sign in with Apple and Google. A Solana signature is not a login. Decision 0001 still forbids signing.

Sentry owns crashes and source maps. PostHog owns product analytics. The PostHog Expo build plugin does not upload source maps; Sentry does.

## Consequences

- Do not start the product inside `poc/`.
- Do not add key import, signing, or buy, sell, or send without a new decision and an update to [product](../product.md).
- Expo Go is not the development client, because MMKV, notifications, Sentry, and charts need native code.
- JavaScript and asset fixes can ship with EAS Update. A native module, permission, or SDK bump needs a store build.
- The explanation lives in [docs/guides/react-native-client.md](../guides/react-native-client.md). When a locked choice changes, update this decision. When the explanation changes, update the guide.

# Startup

This feature is the OS launch splash. iOS and Android show it before the first frame of the app. The OS hides it when that frame draws. There is no route.
Use `app/assets/images/splash.png` as the splash image.

## Outcome

Ease in the launch for the user, before any screen.

## Out of scope

- Implementing the Home screen.
- In-app video playback.
- Using `app/assets/videos/splash.mp4` as the launch asset.

## Screens

The splash is the OS launch surface. It is not an Expo Router screen.

### SplashScreen

- **Purpose.** Cover the gap before the first frame.
- **Arrive.** The OS shows it on a cold start.
- **Leave.** The OS hides it when the first screen draws.
- **Primary action.** None

#### Fields

No fields.

#### States

- **Success.** Show the splash image.
- **Empty.** Does not apply.
- **Loading.** Does not apply.
- **Error.** No in-app error. A missing splash image fails the build.

## Open


# Product

Lookout lets someone look at wallets with a wallet address.

Buy, sell, and send stay out of scope until the product imports a wallet. That import is later work. See [Address-only lookup](decisions/0001-address-only-lookup.md).

The app should show every wallet a person cares about in one place.

The product implementation has not started.

## Features

- **Total portfolio.** All watched wallets in one view.
- **Wallet portfolio.** One wallet at a time.
- **Shared looks.** Custom wallet groups a person can share with family, friends, or anyone else. A look is that shared group.
- **Asset details.** Historical prices, profit and loss, and related stats for assets in those wallets. The blocker is a data provider that does not require a large subscription.

## Principles

User experience, then engineering quality, then velocity.

When a trade-off is required, pick user value first, structural integrity second, and speed third.

### User experience

The product has to be enjoyable. That is what keeps people using it.

- **Clean and consistent UI.** One visual language lowers cognitive load and builds trust.
- **Features that matter.** Low-value features are a no-go. Understand the problem and build only for that.
- **No dead ends.** Every flow stays continuous. The person always has a clear next step, even when that step returns them to the start.

### Engineering quality

Teams that keep a steady pace invest early in clean, maintainable, tested code. Slow is smooth, and smooth is fast.

Solid foundations make the next feature easier, cut bugs, and improve performance. Quality is what keeps both customers and developers satisfied.

Code rules for UI work are in [engineering](engineering.md).

### Velocity

A shipped product in someone's hands beats an unfinished masterpiece. Speed is not a reason to ship a feature that makes the product worse.

Build for the marathon. A steady pace beats a series of rushes.

## Later

The app may later import a wallet for real. Buy, sell, and send would land then, either through a third-party provider or a native implementation.

The app should stay free. A freemium model is possible later, with some features unlocked by KYC.

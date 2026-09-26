# Project description

I want to build a Wallet look up app. The user can `look` at wallets using just the wallet address.

Features like Buy, Sell and Send will not be available for now, because that requires a full import of the wallet. So this will be considered later.

The intension for this APP is to provide users a way to see in a single place all their wallets portfolio, so we should have features like:

- Total portfolio -> This shows all the wallets portfolio in a single view.
- Wallet portfolio -> Show the portfolio for a single wallet.
- Shared `look`s -> Like bank accounts, sometimes families want to share their crypto wallets, with this we'll allow users to create custom wallets groups and a `look`and share it with family, friends or anyone they want.
- Users should be able to see asset details for their wallets, this could include historical prices, PnL (profit and loses), etc... the main blocker here is finding a good provider or a way to gather this data without a big subscription investment.

# Product Principles

**User Experience > Engineering Quality > Velocity**

These 3 principles are the core foundation to a successful product. When trade-offs are necessary, we prioritize user value first, structural integrity second and speed third.

**1. User Experience**

Ensuring the product is enjoyable to the users is the greatest drive for improved stickiness and retention. Exceptional user experience riles on:

- **Clean and consistent UI:** A cohesive visual language reduces cognitive load and builds trust.
- **Features that matter**: Cluterring the application with low-value features is a n go! Instead, we deeply understand the specific problem we are solving and focus entirely on it.
- **No dead ends**: Every user flow must be continuous. The user should always have a clear path forward, even if that path simply guides them back to the starting point.

**2. Engineering quality**

Teams capable of maintain a high and consistent velocity over the long term are those that invest early in clean, maintainable and well-tested code. As the saying goes *"Slow is smooth and smooth is fast"*

Building on solid technical foundations makes introducing new features seamless, reduces bugs, and opmitizes performance. Ultimately, engineering quality ensures sustainable development speed while driving both customer and developer satisfaction.

**Velocity**

Velocity matters! A shipped product in the hands of users provides far more value than an unfinished masterpiece. However, speed should never serve as an excuse to ship poor-quality features that defrated the overall experience.

We build for the marathon, not the sprint. A consistent, sustainable pace will ultimately outpace a series of frantic and disjointed rushes.


# For the future

I can see the app evolving later to fully wallet importation, and in this case we would implement Buy, Sell and Send features. For this we could use a 3rd party provider integrated in the App, or implementing it natively.

KYC - I want to keep this App completely free, but we could try a fremium model where some features are unlocked by the KYC.

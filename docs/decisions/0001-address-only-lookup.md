# 0001 Address-only wallet lookup

Status: accepted

## Context

Lookout needs to show what a wallet holds. Importing a private key or connecting a signer would enable buy, sell, and send. Those flows need custody, signing, and a stronger trust model than a portfolio view.

The product only needs a public address.

## Decision

A wallet in Lookout is a public Solana address. The app reads holdings and market data for that address. It does not import keys, sign transactions, or send them.

Buy, sell, and send wait until a later decision accepts real wallet import.

## Consequences

- The product reads public chain data. It does not hold user keys.
- Anyone with the address can open the same view. Shared looks depend on that. The product must not treat an address as a secret.
- Adding execution requires a new decision record and an update to [product](../product.md) before the code lands.

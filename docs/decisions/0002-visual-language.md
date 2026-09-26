# 0002 Visual language

Status: accepted

## Context

Lookout needs one visual language before the first product screens, so later UI does not invent a new palette per feature. A public extraction of another wallet product showed a warm paper surface, warm gray text, and a single blue. That extraction also contained one-off spacing, a proprietary font, and color roles that do not meet contrast when used as text or as a button fill.

The product is a portfolio view. It needs profit and loss colors the reference did not define.

## Decision

Lookout owns the tokens in [DESIGN.md](../../DESIGN.md) and [docs/design/theme.css](../design/theme.css). Those two files stay in step. UI code uses the custom properties in the theme file.

The typeface is Source Sans 3, weights 400 and 600, under the SIL Open Font License. The files live in [docs/design/fonts](../design/fonts). Lookout does not ship another product's proprietary font. The accent blue is for focus, selection, and charts. The primary action is ink with cream text. Gain and loss mark profit and loss. Success and error are a separate green and a separate red for a successful or failed action. The theme is light until a later decision adds a dark theme.

A Dembrandt baseline of Lookout waits until the first product screens render. The reference extraction is not that baseline.

## Consequences

- A new color, type size, space, radius, or duration requires a change to both token files in the same change.
- Copying another product's token export or font into the app undoes this decision.
- [engineering](../engineering.md) treats a raw color or size in a component as a review failure.

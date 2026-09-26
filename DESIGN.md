---
version: alpha
name: Lookout
description: Warm paper, one blue accent, and an ink primary action. Light theme only.
colors:
  background: "#ffffff"
  surface: "#f6f4ef"
  surface-sunken: "#eae6dd"
  text: "#474645"
  text-muted: "#6f6c66"
  ink: "#1c1b19"
  ink-hover: "#343330"
  on-ink: "#f6f4ef"
  accent: "#1a88f8"
  gain: "#067647"
  loss: "#b42318"
  success: "#267614"
  error: "#8c1818"
  border: "#d9d4cb"
typography:
  display:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.02em
  title:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.01em
  body:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.3
  caption:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    height: 40px
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
    textColor: "{colors.on-ink}"
  button-primary-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    height: 40px
  button-secondary-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.text}"
---

# Lookout

## Overview

Lookout is a calm portfolio view. A person should read holdings without a marketing page or a second visual language.

The UI is light, warm, and quiet. White is the page. Cream is a grouped surface. Warm gray is body text. Near-black ink is the one primary action. One blue marks focus, selection, and charts. Green marks profit and a successful action. Red marks a loss and a failed action. Profit and success use different greens. Loss and failure use different reds.

Density stays comfortable. Body text is 17px. A screen uses two weights at most: 400 and 600.

## Colors

Text on white is about 9.4:1. Text on cream is about 8.6:1. Both clear WCAG AAA. Muted text on white is about 5.2:1 and clears AA.

The accent blue on white is about 3.6:1. That clears the 3:1 bar for a focus ring and fails the 4.5:1 bar for text. White text on the blue fails the same way.

- **Background (#ffffff):** The page.
- **Surface (#f6f4ef):** A grouped region, such as a wallet or a look.
- **Surface sunken (#eae6dd):** A nested well, a secondary hover, or a pressed row.
- **Text (#474645):** Body copy and secondary actions.
- **Text muted (#6f6c66):** Captions and metadata.
- **Ink (#1c1b19):** The primary button and any text that must be stronger than body copy.
- **On ink (#f6f4ef):** The label on an ink button. About 15.7:1.
- **Accent (#1a88f8):** Focus rings, the selected wallet, and chart series. Not body text, not links, and not a button fill.
- **Gain (#067647):** Profit, a positive change, and an increase. About 5.7:1 on white.
- **Loss (#b42318):** A loss or a decrease. About 6.6:1 on white.
- **Success (#267614):** A successful action. A warmer green than gain. About 5.7:1 on white.
- **Error (#8c1818):** A failed action, including a field error. A deeper red than loss. About 9.3:1 on white.
- **Border (#d9d4cb):** Hairlines around fields and on a secondary button. A holdings list does not use this color between rows.

## Typography

The face is Source Sans 3, licensed under the SIL Open Font License 1.1. The files live in `docs/design/fonts/`, next to `OFL.txt`. The fallback stack is `ui-sans-serif, system-ui, sans-serif`. Figures are tabular, so columns of amounts line up.

- **Display:** 32px, weight 600. The portfolio total and other single figures that anchor a screen.
- **Title:** 22px, weight 600. A wallet name or a section heading.
- **Body:** 17px, weight 400. Holdings, addresses, and explanatory copy.
- **Label:** 15px, weight 400. Buttons and other compact controls.
- **Caption:** 13px, weight 400. Timestamps, secondary figures, and metadata.

## Layout

Space sits on a 4px grid: 4, 8, 16, 24, 32, 48, and 64. Use those steps. A one-off value such as 5px, 6px, or 9px is a miss.

Group a wallet's holdings inside one surface with 16px or 24px of padding. Separate those rows with space. A hairline between holdings clutters the list and makes it harder to follow. Use a hairline only when space cannot keep adjacent rows distinct. Do not give each asset its own card.

The page margin is 16px on a narrow screen and 32px from 768px up. The content column stops at 960px.

Breakpoints for layout shifts are 640px, 768px, and 1024px.

## Elevation & Depth

Resting surfaces do not float. A border or a change from white to cream separates regions.

One shadow exists, and only for a layer that covers the page, such as a dialog: `0 8px 24px rgba(28, 27, 25, 0.12)`.

## Shapes

Controls that are actions are pills (`999px`). Cards, inputs, and grouped surfaces use 8px. Use 4px only for a tiny nested mark, such as a status chip. Use 12px when a surface is large enough that 8px looks tight. Do not mix a pill and a sharp corner on the same control.

## Components

**Buttons.** One ink button per view. Height 40px, label 15px, horizontal padding 16px. Hover lightens ink to `#343330`. Active returns to ink. Focus draws a 2px accent ring with 2px of offset. Disabled uses the sunken surface and muted text, and it does not respond to hover. A loading button keeps its size and replaces the label with a progress state. A second action is a cream button with a hairline, not a second ink button, and not a blue button.

**Links.** Body color, underlined. The accent blue is not a link color.

**Inputs.** Height 40px, 8px radius, 12px horizontal padding, 1px border. The label sits above the field. Focus uses the same accent ring as a button. A field error uses the error color for the message and the border.

**Lists.** A holding is a row, not a card. Separate rows with space: 16px of vertical padding, or 8px when the row is short. Do not draw a hairline between holdings. The figure aligns to the end of the row. Gain and loss color the change, not the whole row.

**Dialogs.** A dialog traps focus, closes on Escape, and returns focus to the opener. Its surface is white, its radius is 12px, and it uses the overlay shadow.

State changes use 180ms and `cubic-bezier(0.4, 0, 0.2, 1)`. A larger enter, such as a dialog, may use 280ms and `cubic-bezier(0.16, 1, 0.3, 1)`. A press may use 120ms.

## Do's and Don'ts

- Do take every color, font size, space, radius, and duration from `docs/design/theme.css`.
- Do keep the YAML in this file and `docs/design/theme.css` on the same values. Change them together.
- Do use gain and loss only for profit and loss.
- Do use success and error only for a successful or failed action.
- Do keep one ink button as the primary action on a screen.
- Don't write a raw hex, a one-off font size, or a one-off spacing value in a component.
- Don't put white or cream text on the accent blue.
- Don't use the accent blue for body copy or links.
- Don't ship another product's font files or token export as this system.
- Don't draw a hairline between holdings. Space is the separator.
- Don't put a shadow on a resting card.
- Don't use a third font weight on a screen.

# Feature name

Copy this file to `docs/features/<feature-name>.md` when drafting or planning a feature. Do not fill this file in with a real feature.

Leave a section out when it does not apply. Anything under **Open** is undecided. Do not invent an answer to close it.

Colors, type, spacing, and component structure stay out of this brief. Those live in `DESIGN.md` and `docs/engineering.md`.

## Outcome

One sentence: what the person can do after this that they could not do before.

## Out of scope

What this feature does not include.

## Screens

Repeat this block for each screen. Fields and states belong to that screen.

### Screen name

- **Purpose.** Why this screen exists.
- **Arrive.** How the person gets here.
- **Leave.** The next step, including the way back.
- **Primary action.** One action. None, if the screen is only for reading.

#### Fields

For each thing this screen shows:

- **Name.** What the person calls it.
- **Meaning.** What the value is.
- **Unknown.** What to show when the data is missing.

When this screen shows the same object as an earlier screen, name that screen and do not copy its field list.

#### States

- **Success.** What is on screen when the data is there.
- **Empty.** What the person sees, and the next step.
- **Loading.** What stays visible while data is in flight.
- **Error.** What went wrong, and the next step. A dead end is a miss.

## Open

Questions that are not decided yet.

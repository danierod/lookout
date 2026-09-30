# Engineering

UI code follows these rules.

The product implementation has not started. Apply these rules when that code starts.

## SOLID

- **Single responsibility.** One component owns one job. Fetching, formatting, and layout stay separate.
- **Open/closed.** Add behavior with composition and props. Shared components stay stable.
- **Liskov substitution.** A component that matches a prop contract can replace another. The parent keeps working.
- **Interface segregation.** A component receives only the props it uses. The public surface stays small.
- **Dependency inversion.** UI depends on a hook or interface. The concrete API sits behind that boundary.

## Rules

- **Composition.** Build screens from small pieces. A parent assembles children. Children stay reusable.
- **Unidirectional data.** State flows down. Events flow up. One owner writes each piece of state.
- **Colocation.** Keep the component, its styles, and its tests next to the feature that uses them.
- **Pure render.** Render from props and state. Side effects live in hooks or event handlers.
- **Split state kinds.** Remote data (cache, loading, error) stays separate from local UI state (open, selected, draft).
- **Explicit UI states.** Loading, empty, error, and success are first-class. Each state has a clear screen.
- **Accessibility in the contract.** A component ships the right HTML element, keyboard behavior, and an accessible name. Callers pass text and handlers. A button is a `button`. A text field takes a label, and the component ties that label to the input. An icon-only control takes an accessible name. A dialog traps focus, closes on Escape, and returns focus to the opener.
- **Stable references.** Keep the same object or function identity across renders when a new identity would redo real work. A new object or callback is fine when the child only reads it during its own render. Memoize when a memoized child would render again, when the value sits in an effect dependency list, or when the value is context and every consumer would render again.
- **Tokens.** Color, type, spacing, radius, shadow, and motion come from [docs/design/theme.css](design/theme.css). Names and rationale live in [DESIGN.md](../DESIGN.md). Motion and layer behavior live in the Motion and Layers sections of that file. A raw color, font size, spacing value, radius, or duration in a component is a review failure. The accent blue is not a text color or a button fill. Gain and loss mark profit and loss. Success and error mark a successful or failed action.

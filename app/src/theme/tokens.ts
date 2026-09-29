/**
 * Values match docs/design/theme.css.
 * Display size is 32px at weight 600, line height 1.15, tracking -0.02em.
 */

export const colors = {
  background: '#ffffff',
  text: '#474645',
} as const;

export const type = {
  display: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 36.8,
    letterSpacing: -0.64,
  },
} as const;

/* Minimal stand-in for Framer's runtime package.
 *
 * Vendored Framer components reach for a few helpers that only matter inside
 * Framer itself: two drive the editor's property panel, and the third reports
 * whether it's being statically rendered (it isn't, here). */

export function addPropertyControls(..._args: unknown[]): void {
  /* no-op — property controls only drive Framer's editor UI */
}

export const ControlType = {
  Boolean: 'boolean',
  Color: 'color',
  Enum: 'enum',
  File: 'file',
  Image: 'image',
  Number: 'number',
  Object: 'object',
  ResponsiveImage: 'responsiveimage',
  String: 'string',
} as const;

/** We always render in a live browser, never Framer's static renderer. */
export function useIsStaticRenderer(): boolean {
  return false;
}

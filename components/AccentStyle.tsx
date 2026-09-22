const HEX_COLOR_RE = /^#[0-9a-f]{6}$/i;

/** Server-rendered accent override — applied as part of the initial HTML/CSS
 * so the header shows the right color from the very first paint (no flash).
 * Defense in depth: only ever interpolates a strictly-validated hex color
 * into the raw CSS text, regardless of what the caller passes in. */
export default function AccentStyle({ accent }: { accent: string }) {
  const safeAccent = HEX_COLOR_RE.test(accent) ? accent : '#16233f';
  return <style>{`:root{--color-accent:${safeAccent}}`}</style>;
}

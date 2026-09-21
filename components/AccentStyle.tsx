/** Server-rendered accent override — applied as part of the initial HTML/CSS
 * so the header shows the right color from the very first paint (no flash). */
export default function AccentStyle({ accent }: { accent: string }) {
  return <style>{`:root{--color-accent:${accent}}`}</style>;
}

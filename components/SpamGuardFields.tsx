export default function SpamGuardFields() {
  return (
    <>
      <input
        type="text"
        name="hp_reference_code"
        tabIndex={-1}
        autoComplete="off"
        className="visually-hidden"
        aria-hidden="true"
      />
      <input type="hidden" name="formRenderedAt" value={Date.now()} />
    </>
  );
}

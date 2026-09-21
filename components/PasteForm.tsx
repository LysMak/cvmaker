import type { Dictionary } from '@/lib/i18n';

export default function PasteForm({ dict }: { dict: Dictionary['home'] }) {
  return (
    <div className="card form-card">
      <div className="form-notice">{dict.pasteUnavailable}</div>

      <div className="field" style={{ marginBottom: 24 }}>
        <label htmlFor="text">{dict.pasteLabel}</label>
        <textarea id="text" name="text" rows={14} disabled placeholder={dict.pastePlaceholder} />
      </div>

      <button type="button" className="btn btn-primary" disabled>
        {dict.pasteSubmit}
      </button>
    </div>
  );
}

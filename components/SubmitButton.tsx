'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton({ idleLabel, pendingLabel }: { idleLabel: string; pendingLabel: string }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-primary" disabled={pending} aria-busy={pending}>
      {pending && <span className="spinner" aria-hidden="true" />}
      {pending ? pendingLabel : idleLabel}
    </button>
  );
}

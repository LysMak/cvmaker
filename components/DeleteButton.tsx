'use client';

import { useFormStatus } from 'react-dom';
import { deleteCVAction } from '@/app/actions';

function ConfirmSubmit({ label, pendingLabel, confirmMessage }: { label: string; pendingLabel: string; confirmMessage: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) e.preventDefault();
      }}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

export default function DeleteButton({
  slug,
  editToken,
  locale,
  label,
  pendingLabel,
  confirmMessage,
}: {
  slug: string;
  editToken: string;
  locale: string;
  label: string;
  pendingLabel: string;
  confirmMessage: string;
}) {
  return (
    <form action={deleteCVAction} className="cv-delete-form">
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="editToken" value={editToken} />
      <input type="hidden" name="locale" value={locale} />
      <ConfirmSubmit label={label} pendingLabel={pendingLabel} confirmMessage={confirmMessage} />
    </form>
  );
}

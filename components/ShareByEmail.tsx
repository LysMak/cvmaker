'use client';

import { useEffect, useState } from 'react';

export default function ShareByEmail({
  name,
  subjectPrefix,
  bodyIntro,
  placeholder,
  buttonLabel,
}: {
  name: string;
  subjectPrefix: string;
  bodyIntro: string;
  placeholder: string;
  buttonLabel: string;
}) {
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(`${window.location.origin}${window.location.pathname}`);
  }, []);

  const subject = `${subjectPrefix} — ${name}`;
  const body = `${bodyIntro}\n\n${url}`;
  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="share-email">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <a href={mailtoHref}>{buttonLabel}</a>
    </div>
  );
}

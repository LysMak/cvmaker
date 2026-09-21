import type { CSSProperties } from 'react';
import AccentStyle from './AccentStyle';
import type { CV } from '@/lib/types';
import type { Dictionary } from '@/lib/i18n';

export default function CVDisplay({
  cv,
  dict,
  children,
}: {
  cv: CV;
  dict: Dictionary['cv'];
  children?: React.ReactNode;
}) {
  const accentStyle = { '--color-accent': cv.accent } as CSSProperties;

  return (
    <main className="main cv-root" data-template={cv.template} style={accentStyle}>
      <AccentStyle accent={cv.accent} />
      <div className="container">
        {children}
        <div className="card" style={{ overflow: 'hidden' }}>
          <header className="cv-header">
            <div className="cv-header__top">
              <div>
                <p className="cv-header__tag">{dict.profileTag}</p>
                <h1 className="cv-header__name">{cv.name}</h1>
                <p className="cv-header__headline">{cv.headline}</p>
              </div>

              <div className="cv-header__contacts">
                <div>{cv.location}</div>
                <div>{cv.phone}</div>
                <div>{cv.email}</div>
              </div>
            </div>
          </header>

          <div className="cv-body">
            <section className="cv-main">
              <div className="cv-block">
                <h2>{dict.about}</h2>
                <p style={{ color: 'var(--color-muted)', lineHeight: 1.8, fontSize: 15 }}>{cv.about}</p>
              </div>

              {cv.education.length > 0 && (
                <div className="cv-block">
                  <h2>{dict.education}</h2>
                  {cv.education.map((item, i) => (
                    <div key={`${item.school}-${i}`} className="cv-entry">
                      <div className="cv-entry__row">
                        <span className="cv-entry__title">{item.school}</span>
                        <span className="cv-entry__period">{item.period}</span>
                      </div>
                      <div className="cv-entry__degree">{item.degree}</div>
                      {item.note && <div className="cv-entry__note">{item.note}</div>}
                    </div>
                  ))}
                </div>
              )}

              {cv.certificates.length > 0 && (
                <div className="cv-block">
                  <h2>{dict.certificates}</h2>
                  {cv.certificates.map((item, i) => (
                    <div key={`${item.title}-${i}`} className="cv-cert">
                      <div className="cv-entry__row">
                        <span className="cv-entry__title">{item.title}</span>
                        <span className="cv-entry__period">{item.institution}</span>
                      </div>
                      <div className="cv-cert__desc">{item.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <aside className="cv-aside">
              {cv.skills.length > 0 && (
                <div className="cv-block">
                  <h3>{dict.skills}</h3>
                  <div className="skill-tags">
                    {cv.skills.map((skill) => (
                      <span key={skill} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {cv.languages.length > 0 && (
                <div className="cv-block">
                  <h3>{dict.languages}</h3>
                  <ul>
                    {cv.languages.map((language) => (
                      <li key={language}>{language}</li>
                    ))}
                  </ul>
                </div>
              )}

              {cv.driverLicense && (
                <div className="cv-block">
                  <h3>{dict.driverLicense}</h3>
                  <p style={{ fontSize: 15 }}>{cv.driverLicense}</p>
                </div>
              )}

              {cv.hobbies.length > 0 && (
                <div className="cv-block">
                  <h3>{dict.hobbies}</h3>
                  <ul>
                    {cv.hobbies.map((hobby) => (
                      <li key={hobby}>{hobby}</li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

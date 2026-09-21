const cv = {
  name: 'Maksym Lysytsyn',
  headline: 'Junior Web Developer / IT Specialist',
  location: 'Praha',
  email: 'maximax1990makc@gmail.com',
  phone: '+4200606133269',
  about:
    'Čerstvý absolvent oboru IT se zájmem o vývoj webových aplikací. Mám praktické základy v HTML, CSS, Pythonu a C#. Rád a rychle se učím nové věci a při práci efektivně využívám AI nástroje. Hledám juniorní pozici v Praze, kde mohu uplatnit své dosavadní znalosti, získat komerční praxi a dále se rozvíjet pod vedením zkušenějších kolegů.',
  skills: ['HTML5', 'CSS3', 'Python', 'C#', 'GIT', 'Visual Studio Code', 'SQL', 'SQLite', 'AI tools'],
  languages: ['Ukrajinština — výborná', 'Ruština — výborná', 'Angličtina — středně pokročilá', 'Čeština — středně pokročilá'],
  driverLicense: 'B',
  education: [
    {
      school: 'Střední odborná škola automobilní, informatiky a Gymnázium',
      degree: 'Informační technologie (18-20-M/01)',
      period: '2022 — 2026',
      note: 'Nejvyšší dosažené vzdělání: Středoškolské nebo odborné vyučení s maturitou',
    },
  ],
  certificates: [
    {
      title: 'ECDL',
      institution: 'Střední odborná škola automobilní, informatiky a Gymnázium',
      description: 'Základy práce s počítačem a internetem (správa souborů, vyhledávání, email), zpracování textu, tabulky a prezentace.',
    },
    {
      title: 'CISCO',
      institution: 'Střední odborná škola automobilní, informatiky a Gymnázium',
      description: 'Základy fungování počítačů, operačních systémů a řešení hardwarových problémů.',
    },
  ],
  hobbies: ['Basketball (týmový sport)', 'Počítačové hry (logika a strategie)', 'Digitální design (UI a grafika pro weby)'],
};

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#f3f4f6',
      padding: '32px 20px',
      fontFamily: 'Arial, sans-serif',
      color: '#111827',
    }}>
      <div style={{
        maxWidth: 980,
        margin: '0 auto',
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 16,
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
        overflow: 'hidden',
      }}>
        <header style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)',
          color: '#fff',
          padding: '36px 40px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <p style={{ margin: 0, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.8 }}>
                CV Profile
              </p>
              <h1 style={{ margin: '12px 0 8px', fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>{cv.name}</h1>
              <p style={{ margin: 0, fontSize: 20, opacity: 0.95 }}>{cv.headline}</p>
            </div>

            <div style={{ minWidth: 220, fontSize: 15, lineHeight: 1.8 }}>
              <div>{cv.location}</div>
              <div>{cv.phone}</div>
              <div>{cv.email}</div>
            </div>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 0 }}>
          <section style={{ padding: '30px 40px 20px' }}>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ margin: '0 0 12px', fontSize: 26, color: '#0f172a' }}>Představení</h2>
              <p style={{ margin: 0, color: '#374151', lineHeight: 1.8, fontSize: 15 }}>{cv.about}</p>
            </div>

            <div style={{ marginBottom: 28 }}>
              <h2 style={{ margin: '0 0 12px', fontSize: 26, color: '#0f172a' }}>Vzdělání</h2>
              {cv.education.map((item) => (
                <div key={item.school} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: 16 }}>{item.school}</strong>
                    <span style={{ color: '#475569', fontSize: 14 }}>{item.period}</span>
                  </div>
                  <div style={{ marginTop: 4, color: '#1f2937', fontSize: 15 }}>{item.degree}</div>
                  <div style={{ marginTop: 6, fontSize: 14, color: '#4b5563' }}>{item.note}</div>
                </div>
              ))}
            </div>

            <div>
              <h2 style={{ margin: '0 0 12px', fontSize: 26, color: '#0f172a' }}>Certifikáty a školení</h2>
              {cv.certificates.map((item) => (
                <div key={item.title} style={{ marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: 16 }}>{item.title}</strong>
                    <span style={{ color: '#475569', fontSize: 14 }}>{item.institution}</span>
                  </div>
                  <div style={{ marginTop: 8, color: '#374151', lineHeight: 1.7, fontSize: 14 }}>{item.description}</div>
                </div>
              ))}
            </div>
          </section>

          <aside style={{ background: '#f8fafc', borderLeft: '1px solid #e5e7eb', padding: '30px 28px' }}>
            <div style={{ marginBottom: 28 }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 22, color: '#0f172a' }}>Znalosti a dovednosti</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cv.skills.map((skill) => (
                  <span key={skill} style={{
                    background: '#dbeafe',
                    color: '#1d4ed8',
                    borderRadius: 999,
                    padding: '7px 10px',
                    fontSize: 12,
                    fontWeight: 700,
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 22, color: '#0f172a' }}>Jazyky</h3>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#374151', lineHeight: 1.9 }}>
                {cv.languages.map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: 28 }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 22, color: '#0f172a' }}>Řidičský průkaz</h3>
              <p style={{ margin: 0, color: '#374151', fontSize: 15 }}>{cv.driverLicense}</p>
            </div>

            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: 22, color: '#0f172a' }}>Zájmy a koníčky</h3>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#374151', lineHeight: 1.9 }}>
                {cv.hobbies.map((hobby) => (
                  <li key={hobby}>{hobby}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

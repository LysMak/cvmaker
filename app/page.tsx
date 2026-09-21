const sampleCv = {
  name: 'John Smith',
  headline: 'Frontend Developer',
  location: 'Prague, Czech Republic',
  email: 'john@example.com',
  phone: '+420 123 456 789',
  about:
    'Frontend developer with 5+ years of experience building performant, accessible interfaces for SaaS products and startups.',
  experience: [
    {
      company: 'Nova Labs',
      position: 'Frontend Developer',
      start: '2022',
      end: 'Present',
      description:
        'Built reusable UI systems, improved performance, and collaborated with product teams to ship new features.',
    },
    {
      company: 'Studio Pixel',
      position: 'UI Engineer',
      start: '2019',
      end: '2022',
      description:
        'Designed and implemented responsive web apps and marketing landing pages with strong conversion focus.',
    },
  ],
  education: [
    {
      school: 'University of Technology Prague',
      degree: 'BSc in Computer Science',
      period: '2015 — 2019',
    },
  ],
  skills: ['React', 'TypeScript', 'Next.js', 'CSS', 'UX', 'Accessibility'],
  languages: ['English — Native', 'Czech — B2'],
  links: {
    linkedin: 'https://linkedin.com/in/johnsmith',
    github: 'https://github.com/johnsmith',
    website: 'https://johnsmith.dev',
  },
};

export default function Home() {
  return (
    <main style={{
      maxWidth: 1100,
      margin: '0 auto',
      padding: '48px 20px 80px',
      fontFamily: 'Arial, sans-serif',
      color: '#111827',
      background: '#f8fafc',
      minHeight: '100vh',
    }}>
      <section style={{
        background: 'white',
        borderRadius: 22,
        padding: 32,
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <p style={{ textTransform: 'uppercase', letterSpacing: 2, color: '#6b7280', fontSize: 12, margin: 0 }}>
              MVP placeholder
            </p>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', margin: '12px 0 8px' }}>{sampleCv.name}</h1>
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#2563eb' }}>{sampleCv.headline}</h2>
            <p style={{ marginTop: 12, color: '#374151' }}>{sampleCv.location}</p>
          </div>

          <div style={{ minWidth: 220 }}>
            <p><strong>Email:</strong> {sampleCv.email}</p>
            <p><strong>Phone:</strong> {sampleCv.phone}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={sampleCv.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={sampleCv.links.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={sampleCv.links.website} target="_blank" rel="noreferrer">Website</a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 32 }}>
          <h3 style={{ marginBottom: 12 }}>About</h3>
          <p style={{ lineHeight: 1.7, color: '#374151' }}>{sampleCv.about}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 32, marginTop: 32 }}>
          <div>
            <h3>Experience</h3>
            {sampleCv.experience.map((item) => (
              <div key={item.company} style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <strong>{item.position}</strong>
                  <span style={{ color: '#6b7280' }}>{item.start} — {item.end}</span>
                </div>
                <div style={{ color: '#4b5563', marginTop: 4 }}>{item.company}</div>
                <p style={{ color: '#374151', lineHeight: 1.7 }}>{item.description}</p>
              </div>
            ))}

            <h3>Education</h3>
            {sampleCv.education.map((item) => (
              <div key={item.school} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <strong>{item.school}</strong>
                  <span style={{ color: '#6b7280' }}>{item.period}</span>
                </div>
                <div style={{ color: '#4b5563' }}>{item.degree}</div>
              </div>
            ))}
          </div>

          <aside>
            <h3>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {sampleCv.skills.map((skill) => (
                <span key={skill} style={{
                  background: '#dbeafe',
                  color: '#1d4ed8',
                  borderRadius: 999,
                  padding: '6px 10px',
                  fontSize: 13,
                  fontWeight: 600,
                }}>
                  {skill}
                </span>
              ))}
            </div>

            <h3 style={{ marginTop: 28 }}>Languages</h3>
            <ul style={{ paddingLeft: 18, color: '#374151', lineHeight: 1.8 }}>
              {sampleCv.languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}

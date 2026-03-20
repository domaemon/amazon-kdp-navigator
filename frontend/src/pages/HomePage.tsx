function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <header style={{
        background: '#fff',
        borderBottom: '2px solid #e0e0e0',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8,
            background: '#1a73e8', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '1.2rem',
          }}>K</div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#213547' }}>
            KDP Navigator
          </span>
        </div>
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="/login" style={{
            fontSize: '1.1rem', color: '#1a73e8', textDecoration: 'none', fontWeight: 500,
          }}>ログイン</a>
          <a href="/agent/login" style={{
            fontSize: '0.9rem', color: '#888', textDecoration: 'none',
          }}>エージェント</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '3rem 2rem', textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '2.8rem', fontWeight: 800, color: '#213547',
          marginBottom: '1rem', lineHeight: 1.3,
        }}>
          あなたの本を、<br />世界へ届けましょう
        </h1>
        <p style={{
          fontSize: '1.3rem', color: '#555', maxWidth: 600,
          marginBottom: '2.5rem', lineHeight: 1.8,
        }}>
          Amazon KDP Navigator は、ペーパーバックの出版を<br />
          かんたんにサポートするサービスです。<br />
          原稿を書くだけで、出版までお任せください。
        </p>
        <a href="/login" style={{
          display: 'inline-block',
          background: '#1a73e8', color: '#fff',
          fontSize: '1.4rem', fontWeight: 700,
          padding: '1rem 3rem', borderRadius: 12,
          textDecoration: 'none', boxShadow: '0 4px 14px rgba(26,115,232,0.3)',
        }}>
          はじめる
        </a>

        {/* Features */}
        <div style={{
          display: 'flex', gap: '2rem', marginTop: '4rem',
          flexWrap: 'wrap', justifyContent: 'center',
        }}>
          {[
            { icon: '✍️', title: '原稿を書く', desc: 'Google Docs でかんたん執筆' },
            { icon: '📖', title: '出版おまかせ', desc: '表紙・メタデータを自動作成' },
            { icon: '🌍', title: 'Amazonで販売', desc: '世界中の読者に届きます' },
          ].map((f) => (
            <div key={f.title} style={{
              background: '#fff', borderRadius: 16, padding: '2rem',
              width: 220, boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ fontSize: '1rem', color: '#666' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center', padding: '1.5rem', color: '#999', fontSize: '0.9rem',
        borderTop: '1px solid #e0e0e0',
      }}>
        © 2026 Amazon KDP Navigator
      </footer>
    </div>
  )
}

export default HomePage

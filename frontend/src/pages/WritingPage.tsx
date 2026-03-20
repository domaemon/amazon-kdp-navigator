import StatusStepper from '../components/StatusStepper'

function WritingPage() {
  const manuscriptTitle = '私の人生の物語'
  const googleDocUrl = 'https://docs.google.com/document/d/example'

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
    }}>
      {/* Header */}
      <header style={{
        background: '#fff', borderBottom: '2px solid #e0e0e0',
        padding: '1rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/status" style={{ fontSize: '1rem', color: '#1a73e8', textDecoration: 'none' }}>
            進捗を見る
          </a>
          <span style={{ fontSize: '0.9rem', color: '#888' }}>tanaka@example.com</span>
        </div>
      </header>

      <div style={{
        maxWidth: 700, margin: '0 auto', padding: '2rem',
      }}>
        {/* Title */}
        <h1 style={{
          fontSize: '2rem', fontWeight: 800, color: '#213547',
          marginBottom: '0.5rem', textAlign: 'center',
        }}>
          執筆ページ
        </h1>
        <p style={{
          fontSize: '1.1rem', color: '#666', textAlign: 'center',
          marginBottom: '2rem',
        }}>
          「{manuscriptTitle}」
        </p>

        {/* Status */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '1.5rem 2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '1.5rem',
        }}>
          <StatusStepper currentStep={0} />
        </div>

        {/* Google Doc Link */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '1.5rem',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📄</div>
          <h2 style={{
            fontSize: '1.3rem', fontWeight: 700, color: '#213547',
            marginBottom: '0.5rem',
          }}>
            原稿を書く
          </h2>
          <p style={{
            fontSize: '1.05rem', color: '#666', marginBottom: '1.5rem',
            lineHeight: 1.6,
          }}>
            下のボタンを押すと、Google Docs が新しいタブで開きます。<br />
            そこで原稿を書いてください。
          </p>
          <a
            href={googleDocUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#fff', color: '#1a73e8',
              fontSize: '1.2rem', fontWeight: 700,
              padding: '0.85rem 2.5rem', borderRadius: 12,
              textDecoration: 'none',
              border: '2px solid #1a73e8',
            }}
          >
            Google Docs を開く ↗
          </a>
        </div>

        {/* Completion */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: '1.3rem', fontWeight: 700, color: '#213547',
            marginBottom: '0.5rem',
          }}>
            原稿は書き終わりましたか？
          </h2>
          <p style={{
            fontSize: '1rem', color: '#888', marginBottom: '1.5rem',
          }}>
            書き終わったら、下のボタンを押してください。担当者が確認します。
          </p>
          <button style={{
            background: '#16a34a', color: '#fff',
            fontSize: '1.4rem', fontWeight: 700,
            padding: '1rem 3rem', borderRadius: 12,
            border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(22,163,74,0.3)',
          }}>
            完成しました
          </button>
        </div>
      </div>
    </div>
  )
}

export default WritingPage

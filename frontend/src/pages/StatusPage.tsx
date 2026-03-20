import StatusStepper from '../components/StatusStepper'

function StatusPage() {
  const manuscriptTitle = '私の人生の物語'
  const currentStep = 3
  const revisionRequested = false

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
          <a href="/write" style={{ fontSize: '1rem', color: '#1a73e8', textDecoration: 'none' }}>
            執筆ページへ
          </a>
          <span style={{ fontSize: '0.9rem', color: '#888' }}>tanaka@example.com</span>
        </div>
      </header>

      <div style={{
        maxWidth: 800, margin: '0 auto', padding: '2rem',
      }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2rem', fontWeight: 800, color: '#213547',
            marginBottom: '0.5rem',
          }}>
            出版の進捗
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>
            「{manuscriptTitle}」
          </p>
        </div>

        {/* Main stepper */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '2rem 2.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '2rem',
        }}>
          <StatusStepper currentStep={currentStep} revisionRequested={revisionRequested} />
        </div>

        {/* Status detail card */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '1.5rem',
        }}>
          <h2 style={{
            fontSize: '1.3rem', fontWeight: 700, color: '#213547',
            marginBottom: '1rem',
          }}>
            現在のステータス
          </h2>

          <div style={{
            background: '#e8f0fe', borderRadius: 12, padding: '1.25rem',
            display: 'flex', alignItems: 'center', gap: '1rem',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: '#1a73e8', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem', fontWeight: 700,
            }}>4</div>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a73e8' }}>
                出版準備中
              </div>
              <div style={{ fontSize: '1rem', color: '#555' }}>
                出版の準備を進めています。表紙やメタデータを作成中です。
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
          <h2 style={{
            fontSize: '1.3rem', fontWeight: 700, color: '#213547',
            marginBottom: '1rem',
          }}>
            これまでの経過
          </h2>

          {[
            { date: '2026年3月18日', event: '原稿が承認されました', icon: '✅' },
            { date: '2026年3月16日', event: '担当者が確認を完了しました', icon: '👀' },
            { date: '2026年3月14日', event: '原稿を提出しました', icon: '📤' },
            { date: '2026年3月5日', event: '執筆を開始しました', icon: '✍️' },
            { date: '2026年3月4日', event: 'アカウントを登録しました', icon: '🎉' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: '1rem', padding: '0.75rem 0',
              borderBottom: i < 4 ? '1px solid #f0f0f0' : 'none',
            }}>
              <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#333' }}>
                  {item.event}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#999' }}>
                  {item.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatusPage

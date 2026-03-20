function CoverPreviewPage() {
  const coverData = {
    title: '私の人生の物語',
    subtitle: '〜昭和から令和へ〜',
    author: '田中 太郎',
    pageCount: 142,
    paperType: 'white' as const,
    spineWidth: 8.12,
    totalWidth: 307.72,
    totalHeight: 216,
    spineTextOmitted: false,
    backSummary: '「私の人生の物語」は、昭和二十年代に生まれた田中太郎が、戦後の日本とともに歩んだ八十年間を振り返る珠玉のエッセイ集です。',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      {/* Top bar */}
      <header style={{
        background: '#1e293b', color: '#fff', padding: '0.75rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 6,
            background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '0.9rem', color: '#fff',
          }}>K</div>
          <span style={{ fontWeight: 600, fontSize: '1.05rem' }}>KDP Navigator</span>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem', marginLeft: '0.5rem' }}>Cover Preview</span>
        </div>
        <a href="/agent" style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'none' }}>
          ← Back to Dashboard
        </a>
      </header>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '1.5rem 2rem' }}>
        {/* Manuscript info */}
        <div style={{
          background: '#fff', borderRadius: 12, padding: '1.25rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginBottom: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.2rem' }}>
              {coverData.title}
            </h1>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
              by {coverData.author} — {coverData.pageCount} pages, {coverData.paperType} paper
            </div>
          </div>
          <span style={{
            padding: '0.25rem 0.75rem', borderRadius: 20,
            fontSize: '0.8rem', fontWeight: 600,
            color: '#0891b2', background: '#cffafe',
          }}>Cover Generated</span>
        </div>

        {/* Cover preview */}
        <div style={{
          background: '#fff', borderRadius: 12, padding: '2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginBottom: '1.5rem',
        }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '1.5rem' }}>
            Three-Panel Cover Preview
          </h2>

          {/* Cover mock */}
          <div style={{
            display: 'flex', justifyContent: 'center', marginBottom: '1.5rem',
          }}>
            <div style={{
              display: 'flex', border: '2px solid #e2e8f0', borderRadius: 4,
              overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}>
              {/* Back cover */}
              <div style={{
                width: 200, height: 280, background: '#1e3a5f',
                padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column',
                justifyContent: 'center', color: '#fff',
              }}>
                <div style={{ fontSize: '0.75rem', color: '#94b8db', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  About this book
                </div>
                <div style={{ fontSize: '0.8rem', lineHeight: 1.7, color: '#d1e3f5' }}>
                  {coverData.backSummary}
                </div>
              </div>

              {/* Spine */}
              <div style={{
                width: 32, height: 280, background: '#15304d',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                writingMode: 'vertical-rl',
                color: '#fff', fontSize: '0.65rem', fontWeight: 600,
                letterSpacing: '0.05em',
              }}>
                {!coverData.spineTextOmitted && (
                  <span>{coverData.title}　{coverData.author}</span>
                )}
              </div>

              {/* Front cover */}
              <div style={{
                width: 200, height: 280, background: '#1e3a5f',
                padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center',
                color: '#fff', textAlign: 'center',
              }}>
                <div style={{
                  fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.4,
                  marginBottom: '0.75rem',
                }}>
                  {coverData.title}
                </div>
                <div style={{
                  fontSize: '0.85rem', color: '#94b8db', marginBottom: '1.5rem',
                }}>
                  {coverData.subtitle}
                </div>
                <div style={{
                  fontSize: '0.9rem', fontWeight: 600, color: '#d1e3f5',
                  borderTop: '1px solid #2d5a87', paddingTop: '0.75rem',
                }}>
                  {coverData.author}
                </div>
              </div>
            </div>
          </div>

          {/* Labels */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '0.5rem',
            fontSize: '0.75rem', color: '#94a3b8',
          }}>
            <span style={{ width: 200, textAlign: 'center' }}>Back Cover</span>
            <span style={{ width: 32, textAlign: 'center' }}>Spine</span>
            <span style={{ width: 200, textAlign: 'center' }}>Front Cover</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {/* Dimensions */}
          <div style={{
            flex: '1 1 50%', background: '#fff', borderRadius: 12, padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '1rem' }}>
              Cover Dimensions
            </h2>
            <table style={{ width: '100%', fontSize: '0.85rem' }}>
              <tbody>
                {[
                  ['Page count', `${coverData.pageCount} pages`],
                  ['Paper type', coverData.paperType],
                  ['Spine width', `${coverData.spineWidth}mm`],
                  ['Total width', `${coverData.totalWidth}mm`],
                  ['Total height', `${coverData.totalHeight}mm`],
                  ['Bleed', '3mm all edges'],
                  ['Spine text', coverData.spineTextOmitted ? 'Omitted (< 6.35mm)' : 'Included'],
                ].map(([label, value]) => (
                  <tr key={label} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.5rem 0', color: '#64748b', fontWeight: 500 }}>{label}</td>
                    <td style={{ padding: '0.5rem 0', color: '#1e293b', fontWeight: 600, textAlign: 'right' }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Actions */}
          <div style={{
            flex: '1 1 50%', background: '#fff', borderRadius: 12, padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            display: 'flex', flexDirection: 'column', gap: '1rem',
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>
              Actions
            </h2>
            <button style={{
              width: '100%', padding: '0.75rem',
              background: '#16a34a', color: '#fff',
              fontSize: '0.95rem', fontWeight: 600,
              border: 'none', borderRadius: 8, cursor: 'pointer',
            }}>
              Approve Cover
            </button>
            <button style={{
              width: '100%', padding: '0.75rem',
              background: '#fff', color: '#7c3aed',
              fontSize: '0.95rem', fontWeight: 600,
              border: '2px solid #7c3aed', borderRadius: 8, cursor: 'pointer',
            }}>
              Regenerate Cover
            </button>
            <button style={{
              width: '100%', padding: '0.75rem',
              background: '#f1f5f9', color: '#475569',
              fontSize: '0.95rem', fontWeight: 600,
              border: '1px solid #e2e8f0', borderRadius: 8, cursor: 'pointer',
            }}>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoverPreviewPage

import { useState } from 'react'

const checklistItems = [
  { id: 'structure', label: 'Document structure is sound (chapters, sections)' },
  { id: 'completeness', label: 'Manuscript appears complete (no placeholder text)' },
  { id: 'formatting', label: 'No major formatting issues (fonts, spacing, images)' },
  { id: 'language', label: 'Language is appropriate and consistent' },
  { id: 'sensitive', label: 'No sensitive or inappropriate content' },
  { id: 'length', label: 'Manuscript length is suitable for paperback' },
]

function ManuscriptReviewPage() {
  const [checklist, setChecklist] = useState<Record<string, boolean>>(
    Object.fromEntries(checklistItems.map((item) => [item.id, false]))
  )
  const [feedback, setFeedback] = useState('')

  const toggleCheck = (id: string) =>
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }))

  const allChecked = Object.values(checklist).every(Boolean)
  const checkedCount = Object.values(checklist).filter(Boolean).length

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
          <span style={{ color: '#94a3b8', fontSize: '0.85rem', marginLeft: '0.5rem' }}>Manuscript Review</span>
        </div>
        <a href="/agent" style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'none' }}>
          ← Back to Dashboard
        </a>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '1.5rem 2rem' }}>
        {/* Manuscript info */}
        <div style={{
          background: '#fff', borderRadius: 12, padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginBottom: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.25rem' }}>
              私の人生の物語
            </h1>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
              by 田中 太郎 (tanaka@example.com)
            </div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>
              Submitted: 2026-03-14 — One-line: 昭和から令和まで、一人の男の歩んだ道
            </div>
          </div>
          <span style={{
            display: 'inline-block', padding: '0.25rem 0.75rem',
            borderRadius: 20, fontSize: '0.8rem', fontWeight: 600,
            color: '#7c3aed', background: '#ede9fe',
          }}>
            Reviewing
          </span>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {/* Left: Checklist */}
          <div style={{ flex: '1 1 55%' }}>
            <div style={{
              background: '#fff', borderRadius: 12, padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginBottom: '1.5rem',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '1rem',
              }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>
                  QA Checklist
                </h2>
                <span style={{
                  fontSize: '0.85rem', fontWeight: 600,
                  color: allChecked ? '#16a34a' : '#d97706',
                }}>
                  {checkedCount}/{checklistItems.length} complete
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {checklistItems.map((item) => (
                  <label
                    key={item.id}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.6rem 0.75rem', borderRadius: 8,
                      background: checklist[item.id] ? '#f0fdf4' : '#fafafa',
                      border: `1px solid ${checklist[item.id] ? '#bbf7d0' : '#e2e8f0'}`,
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checklist[item.id]}
                      onChange={() => toggleCheck(item.id)}
                      style={{ width: 18, height: 18 }}
                    />
                    <span style={{
                      fontSize: '0.9rem',
                      color: checklist[item.id] ? '#16a34a' : '#475569',
                      textDecoration: checklist[item.id] ? 'line-through' : 'none',
                    }}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Feedback */}
            <div style={{
              background: '#fff', borderRadius: 12, padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}>
              <h2 style={{
                fontSize: '1.1rem', fontWeight: 700, color: '#1e293b',
                marginBottom: '0.75rem',
              }}>
                Feedback Note
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                If requesting revision, provide clear feedback in plain Japanese for the senior.
              </p>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="例: 第3章の内容をもう少し詳しく書いていただけますか？"
                rows={4}
                style={{
                  width: '100%', padding: '0.75rem',
                  fontSize: '0.9rem', border: '1px solid #e2e8f0',
                  borderRadius: 8, outline: 'none', resize: 'vertical',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Right: Document & Actions */}
          <div style={{ flex: '1 1 45%' }}>
            {/* Document link */}
            <div style={{
              background: '#fff', borderRadius: 12, padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginBottom: '1.5rem',
              textAlign: 'center',
            }}>
              <h2 style={{
                fontSize: '1.1rem', fontWeight: 700, color: '#1e293b',
                marginBottom: '0.75rem',
              }}>
                Manuscript Document
              </h2>
              <a
                href="#"
                style={{
                  display: 'inline-block', padding: '0.6rem 1.5rem',
                  background: '#f1f5f9', border: '1px solid #e2e8f0',
                  borderRadius: 8, fontSize: '0.9rem', color: '#1e293b',
                  textDecoration: 'none', fontWeight: 500,
                }}
              >
                Open Google Doc ↗
              </a>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                Opens in a new tab
              </div>
            </div>

            {/* Decision */}
            <div style={{
              background: '#fff', borderRadius: 12, padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}>
              <h2 style={{
                fontSize: '1.1rem', fontWeight: 700, color: '#1e293b',
                marginBottom: '1rem',
              }}>
                Decision
              </h2>

              <button style={{
                width: '100%', padding: '0.75rem',
                background: allChecked ? '#16a34a' : '#e2e8f0',
                color: allChecked ? '#fff' : '#94a3b8',
                fontSize: '1rem', fontWeight: 600,
                border: 'none', borderRadius: 8, cursor: allChecked ? 'pointer' : 'not-allowed',
                marginBottom: '0.75rem',
              }}>
                Approve Manuscript
              </button>

              <button style={{
                width: '100%', padding: '0.75rem',
                background: '#fff', color: '#dc2626',
                fontSize: '1rem', fontWeight: 600,
                border: '2px solid #dc2626', borderRadius: 8, cursor: 'pointer',
              }}>
                Request Revision
              </button>

              {!allChecked && (
                <p style={{
                  fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.75rem',
                  textAlign: 'center',
                }}>
                  Complete all checklist items to enable approval
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManuscriptReviewPage

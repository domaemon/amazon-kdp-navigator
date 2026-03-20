function PipelinePage() {
  const manuscript = {
    title: '私の人生の物語',
    author: '田中 太郎',
    pageCount: 142,
    contentPdfReady: true,
    coverApproved: true,
    metadataComplete: true,
  }

  const allReady = manuscript.contentPdfReady && manuscript.coverApproved && manuscript.metadataComplete

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
          <span style={{ color: '#94a3b8', fontSize: '0.85rem', marginLeft: '0.5rem' }}>Final Review & Submit</span>
        </div>
        <a href="/agent" style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'none' }}>
          ← Back to Dashboard
        </a>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '1.5rem 2rem' }}>
        {/* Manuscript info */}
        <div style={{
          background: '#fff', borderRadius: 12, padding: '1.25rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginBottom: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.2rem' }}>
              {manuscript.title}
            </h1>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
              by {manuscript.author} — {manuscript.pageCount} pages
            </div>
          </div>
          <span style={{
            padding: '0.25rem 0.75rem', borderRadius: 20,
            fontSize: '0.8rem', fontWeight: 600,
            color: '#ea580c', background: '#ffedd5',
          }}>Final Review</span>
        </div>

        {/* Pre-submission checklist */}
        <div style={{
          background: '#fff', borderRadius: 12, padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginBottom: '1.5rem',
        }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '1rem' }}>
            Pre-Submission Checklist
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'Content PDF generated (A5 format)', ready: manuscript.contentPdfReady, link: 'View PDF' },
              { label: 'Cover PDF approved', ready: manuscript.coverApproved, link: 'View Cover' },
              { label: 'KDP metadata complete', ready: manuscript.metadataComplete, link: 'View Metadata' },
            ].map((item) => (
              <div key={item.label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.75rem 1rem', borderRadius: 8,
                background: item.ready ? '#f0fdf4' : '#fef2f2',
                border: `1px solid ${item.ready ? '#bbf7d0' : '#fecaca'}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: item.ready ? '#16a34a' : '#dc2626',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 700,
                  }}>
                    {item.ready ? '✓' : '✗'}
                  </span>
                  <span style={{
                    fontSize: '0.9rem', fontWeight: 500,
                    color: item.ready ? '#166534' : '#991b1b',
                  }}>
                    {item.label}
                  </span>
                </div>
                <a href="#" style={{
                  fontSize: '0.8rem', color: '#3b82f6', textDecoration: 'none',
                }}>
                  {item.link} →
                </a>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {/* Content PDF preview */}
          <div style={{
            flex: '1 1 50%', background: '#fff', borderRadius: 12, padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '1rem' }}>
              Content PDF
            </h2>
            <div style={{
              background: '#f8fafc', border: '2px dashed #e2e8f0', borderRadius: 8,
              height: 260, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              color: '#94a3b8',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📄</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>content_pdf_142pages.pdf</div>
              <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>A5 format — 148mm × 210mm</div>
              <button style={{
                marginTop: '1rem', padding: '0.4rem 1rem',
                background: '#f1f5f9', border: '1px solid #e2e8f0',
                borderRadius: 6, fontSize: '0.8rem', color: '#475569', cursor: 'pointer',
              }}>
                Preview PDF
              </button>
            </div>
          </div>

          {/* Cover PDF preview */}
          <div style={{
            flex: '1 1 50%', background: '#fff', borderRadius: 12, padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '1rem' }}>
              Cover PDF
            </h2>
            <div style={{
              background: '#1e3a5f', borderRadius: 8,
              height: 260, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: '#fff', position: 'relative',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {manuscript.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94b8db' }}>
                  {manuscript.author}
                </div>
              </div>
              <div style={{
                position: 'absolute', bottom: '0.75rem', right: '0.75rem',
                fontSize: '0.7rem', color: '#4a7aa8',
              }}>
                307.72mm × 216mm
              </div>
            </div>
            <button style={{
              marginTop: '0.75rem', padding: '0.4rem 1rem',
              background: '#f1f5f9', border: '1px solid #e2e8f0',
              borderRadius: 6, fontSize: '0.8rem', color: '#475569', cursor: 'pointer',
              width: '100%',
            }}>
              Preview Full Cover PDF
            </button>
          </div>
        </div>

        {/* Submit button */}
        <div style={{
          background: '#fff', borderRadius: 12, padding: '2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginTop: '1.5rem',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>
            Ready to Submit to Amazon KDP
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
            This will transition the manuscript to "kdp_submitted" status and notify the senior writer.
          </p>
          <button style={{
            padding: '1rem 3rem',
            background: allReady ? '#ea580c' : '#e2e8f0',
            color: allReady ? '#fff' : '#94a3b8',
            fontSize: '1.1rem', fontWeight: 700,
            border: 'none', borderRadius: 10, cursor: allReady ? 'pointer' : 'not-allowed',
            boxShadow: allReady ? '0 4px 14px rgba(234,88,12,0.3)' : 'none',
          }}>
            Submit to KDP
          </button>
          {!allReady && (
            <p style={{ fontSize: '0.8rem', color: '#dc2626', marginTop: '0.75rem' }}>
              Complete all checklist items before submitting.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PipelinePage

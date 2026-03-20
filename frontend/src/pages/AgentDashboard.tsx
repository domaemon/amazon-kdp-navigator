import { useState } from 'react'

const mockData = [
  { id: 1, name: '田中 太郎', penName: '田中太郎', title: '私の人生の物語', status: 'writing', email: 'tanaka@example.com', updatedAt: '2026-03-18' },
  { id: 2, name: '佐藤 花子', penName: '花子', title: '季節の料理帖', status: 'submitted', email: 'sato@example.com', updatedAt: '2026-03-17' },
  { id: 3, name: '鈴木 一郎', penName: '', title: '昭和の記憶', status: 'reviewing', email: 'suzuki@example.com', updatedAt: '2026-03-16' },
  { id: 4, name: '高橋 美咲', penName: 'M. Takahashi', title: 'Garden of Silence', status: 'approved', email: 'takahashi@example.com', updatedAt: '2026-03-15' },
  { id: 5, name: '伊藤 健二', penName: '', title: '技術者の半世紀', status: 'content_pdf_ready', email: 'ito@example.com', updatedAt: '2026-03-14' },
  { id: 6, name: '渡辺 美智子', penName: '渡辺みちこ', title: '俳句三百六十五日', status: 'published', email: 'watanabe@example.com', updatedAt: '2026-03-10' },
  { id: 7, name: '山本 修', penName: '', title: '父から息子へ', status: 'revision_requested', email: 'yamamoto@example.com', updatedAt: '2026-03-13' },
  { id: 8, name: '中村 道子', penName: 'M. Nakamura', title: '手紙のある暮らし', status: 'kdp_submitted', email: 'nakamura@example.com', updatedAt: '2026-03-12' },
]

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  writing:            { label: 'Writing',          color: '#2563eb', bg: '#dbeafe' },
  submitted:          { label: 'Submitted',        color: '#d97706', bg: '#fef3c7' },
  reviewing:          { label: 'Reviewing',        color: '#7c3aed', bg: '#ede9fe' },
  revision_requested: { label: 'Revision Req.',    color: '#dc2626', bg: '#fee2e2' },
  approved:           { label: 'Approved',         color: '#059669', bg: '#d1fae5' },
  content_pdf_ready:  { label: 'PDF Ready',        color: '#0891b2', bg: '#cffafe' },
  cover_generated:    { label: 'Cover Ready',      color: '#0891b2', bg: '#cffafe' },
  agent_final_review: { label: 'Final Review',     color: '#ea580c', bg: '#ffedd5' },
  kdp_submitted:      { label: 'KDP Submitted',    color: '#4f46e5', bg: '#e0e7ff' },
  published:          { label: 'Published',        color: '#16a34a', bg: '#bbf7d0' },
}

function AgentDashboard() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = mockData.filter((m) => {
    const matchesSearch = m.name.includes(search) || m.title.includes(search) || m.email.includes(search)
    const matchesFilter = filter === 'all' || m.status === filter
    return matchesSearch && matchesFilter
  })

  const counts = mockData.reduce((acc, m) => {
    acc[m.status] = (acc[m.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

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
            fontWeight: 700, fontSize: '0.9rem',
          }}>K</div>
          <span style={{ fontWeight: 600, fontSize: '1.05rem' }}>KDP Navigator</span>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem', marginLeft: '0.5rem' }}>Agent Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>agent@kdp-navigator.jp</span>
          <button style={{
            padding: '0.4rem 0.8rem', background: '#334155', color: '#fff',
            border: 'none', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer',
          }}>Sign Out</button>
        </div>
      </header>

      <div style={{ padding: '1.5rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
        {/* Stats */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Total', value: mockData.length, color: '#475569' },
            { label: 'Active', value: mockData.filter(m => !['published'].includes(m.status)).length, color: '#2563eb' },
            { label: 'Needs Action', value: mockData.filter(m => ['submitted', 'reviewing'].includes(m.status)).length, color: '#d97706' },
            { label: 'Published', value: counts['published'] || 0, color: '#16a34a' },
          ].map((s) => (
            <div key={s.label} style={{
              background: '#fff', borderRadius: 10, padding: '1rem 1.5rem',
              flex: '1 1 150px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500, textTransform: 'uppercase' }}>{s.label}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div style={{
          display: 'flex', gap: '1rem', marginBottom: '1rem',
          alignItems: 'center', flexWrap: 'wrap',
        }}>
          <input
            type="text" value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, title, or email..."
            style={{
              flex: '1 1 300px', padding: '0.6rem 1rem',
              fontSize: '0.9rem', border: '1px solid #e2e8f0',
              borderRadius: 8, outline: 'none', background: '#fff',
            }}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '0.6rem 1rem', fontSize: '0.9rem',
              border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff',
            }}
          >
            <option value="all">All Statuses</option>
            {Object.entries(statusConfig).map(([key, cfg]) => (
              <option key={key} value={key}>{cfg.label}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div style={{
          background: '#fff', borderRadius: 12, overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                {['Author', 'Book Title', 'Status', 'Updated', 'Actions'].map((h) => (
                  <th key={h} style={{
                    padding: '0.75rem 1rem', textAlign: 'left',
                    fontSize: '0.8rem', fontWeight: 600, color: '#64748b',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => {
                const st = statusConfig[m.status] || { label: m.status, color: '#666', bg: '#f0f0f0' }
                return (
                  <tr key={m.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1e293b' }}>{m.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        {m.penName ? `Pen: ${m.penName}` : m.email}
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.95rem', color: '#334155' }}>
                      {m.title}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{
                        display: 'inline-block', padding: '0.25rem 0.75rem',
                        borderRadius: 20, fontSize: '0.8rem', fontWeight: 600,
                        color: st.color, background: st.bg,
                      }}>
                        {st.label}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                      {m.updatedAt}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <button style={{
                        padding: '0.35rem 0.75rem', background: '#f1f5f9',
                        border: '1px solid #e2e8f0', borderRadius: 6,
                        fontSize: '0.8rem', color: '#475569', cursor: 'pointer',
                      }}>
                        Review
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AgentDashboard

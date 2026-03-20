import { useState } from 'react'

function OnboardingFormPage() {
  const [form, setForm] = useState({
    fullName: '',
    penName: '',
    bookTitle: '',
    subtitle: '',
    description: '',
    consent: false,
  })

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const inputStyle = {
    width: '100%', padding: '0.9rem',
    fontSize: '1.1rem', border: '2px solid #ddd',
    borderRadius: 10, outline: 'none',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    display: 'block' as const, fontSize: '1.05rem', fontWeight: 600 as const,
    color: '#333', marginBottom: '0.4rem',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        background: '#fff', borderRadius: 20, padding: '2.5rem',
        width: '100%', maxWidth: 560,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        marginTop: '2rem',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 48, height: 48, borderRadius: 10,
            background: '#1a73e8', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '1.3rem',
            margin: '0 auto 1rem',
          }}>K</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#213547', marginBottom: '0.3rem' }}>
            出版情報の登録
          </h1>
          <p style={{ fontSize: '1rem', color: '#666' }}>
            出版に必要な情報をご入力ください
          </p>
        </div>

        {/* Confirmed email */}
        <div style={{
          background: '#e8f0fe', borderRadius: 10, padding: '0.8rem 1rem',
          marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          <span style={{ fontSize: '1.1rem' }}>📧</span>
          <span style={{ fontSize: '0.95rem', color: '#333' }}>
            ログイン中: <strong>tanaka@example.com</strong>
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {/* Full name */}
          <div>
            <label style={labelStyle}>お名前 <span style={{ color: '#e53935' }}>*</span></label>
            <input
              type="text" value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              placeholder="田中 太郎"
              style={inputStyle}
            />
          </div>

          {/* Pen name */}
          <div>
            <label style={labelStyle}>ペンネーム（任意）</label>
            <input
              type="text" value={form.penName}
              onChange={(e) => update('penName', e.target.value)}
              placeholder="著者として表示する名前"
              style={inputStyle}
            />
          </div>

          {/* Book title */}
          <div>
            <label style={labelStyle}>本のタイトル <span style={{ color: '#e53935' }}>*</span></label>
            <input
              type="text" value={form.bookTitle}
              onChange={(e) => update('bookTitle', e.target.value)}
              placeholder="私の人生の物語"
              style={inputStyle}
            />
          </div>

          {/* Subtitle */}
          <div>
            <label style={labelStyle}>サブタイトル（任意）</label>
            <input
              type="text" value={form.subtitle}
              onChange={(e) => update('subtitle', e.target.value)}
              placeholder="〜思い出とともに〜"
              style={inputStyle}
            />
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>本の説明（一行） <span style={{ color: '#e53935' }}>*</span></label>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="この本について一言で教えてください"
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' as const }}
            />
          </div>

          {/* Consent */}
          <label style={{
            display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
            fontSize: '1rem', color: '#444', cursor: 'pointer',
            padding: '0.75rem', background: '#fafafa', borderRadius: 10,
          }}>
            <input
              type="checkbox" checked={form.consent}
              onChange={(e) => update('consent', e.target.checked)}
              style={{ width: 20, height: 20, marginTop: 2 }}
            />
            <span>
              利用規約に同意し、代理出版を依頼します。
              出版後の著作権は著者に帰属します。
            </span>
          </label>

          {/* Submit */}
          <button style={{
            width: '100%', padding: '1rem',
            background: '#1a73e8', color: '#fff',
            fontSize: '1.2rem', fontWeight: 700,
            border: 'none', borderRadius: 12, cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(26,115,232,0.3)',
            marginTop: '0.5rem',
          }}>
            登録して執筆を始める
          </button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingFormPage

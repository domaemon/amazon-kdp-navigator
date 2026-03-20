import { useState } from 'react'

function EmailLoginPage() {
  const [email, setEmail] = useState('')

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        background: '#fff', borderRadius: 20, padding: '3rem',
        width: '100%', maxWidth: 480,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        textAlign: 'center',
      }}>
        {/* Logo */}
        <div style={{
          width: 56, height: 56, borderRadius: 12,
          background: '#1a73e8', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: '1.5rem',
          margin: '0 auto 1.5rem',
        }}>K</div>

        <h1 style={{
          fontSize: '2rem', fontWeight: 800, color: '#213547',
          marginBottom: '0.5rem',
        }}>
          ログイン
        </h1>
        <p style={{
          fontSize: '1.1rem', color: '#666', marginBottom: '2rem', lineHeight: 1.6,
        }}>
          メールアドレスを入力してください。<br />
          確認コードをお送りします。
        </p>

        <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block', fontSize: '1.1rem', fontWeight: 600,
            color: '#333', marginBottom: '0.5rem',
          }}>
            メールアドレス
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            style={{
              width: '100%', padding: '1rem',
              fontSize: '1.2rem', border: '2px solid #ddd',
              borderRadius: 12, outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
          />
        </div>

        <button style={{
          width: '100%', padding: '1rem',
          background: '#1a73e8', color: '#fff',
          fontSize: '1.3rem', fontWeight: 700,
          border: 'none', borderRadius: 12, cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(26,115,232,0.3)',
        }}>
          確認コードを送信
        </button>

        <p style={{
          marginTop: '1.5rem', fontSize: '0.95rem', color: '#999',
        }}>
          初めての方は自動的にアカウントが作成されます
        </p>

        <a href="/" style={{
          display: 'inline-block', marginTop: '1rem',
          fontSize: '1rem', color: '#1a73e8',
        }}>
          ← トップに戻る
        </a>
      </div>
    </div>
  )
}

export default EmailLoginPage

import { useState } from 'react'

function OTPVerificationPage() {
  const [otp, setOtp] = useState(['', '', '', ''])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
  }

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
          確認コード入力
        </h1>
        <p style={{
          fontSize: '1.1rem', color: '#666', marginBottom: '0.5rem', lineHeight: 1.6,
        }}>
          以下のアドレスに確認コードを送信しました
        </p>
        <p style={{
          fontSize: '1.15rem', fontWeight: 600, color: '#1a73e8',
          marginBottom: '2rem',
        }}>
          tanaka@example.com
        </p>

        {/* OTP Input */}
        <div style={{
          display: 'flex', gap: '1rem', justifyContent: 'center',
          marginBottom: '1.5rem',
        }}>
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              style={{
                width: 64, height: 72,
                fontSize: '2rem', fontWeight: 700,
                textAlign: 'center',
                border: '2px solid #ddd', borderRadius: 12,
                outline: 'none',
              }}
            />
          ))}
        </div>

        {/* Timer */}
        <p style={{
          fontSize: '1rem', color: '#e67e22', fontWeight: 600,
          marginBottom: '1.5rem',
        }}>
          有効期限: 9:42
        </p>

        <button style={{
          width: '100%', padding: '1rem',
          background: '#1a73e8', color: '#fff',
          fontSize: '1.3rem', fontWeight: 700,
          border: 'none', borderRadius: 12, cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(26,115,232,0.3)',
        }}>
          確認する
        </button>

        <button style={{
          display: 'block', width: '100%',
          marginTop: '1rem', padding: '0.75rem',
          background: 'transparent', color: '#1a73e8',
          fontSize: '1.05rem', fontWeight: 500,
          border: '2px solid #1a73e8', borderRadius: 12,
          cursor: 'pointer',
        }}>
          コードを再送信
        </button>

        <a href="/login" style={{
          display: 'inline-block', marginTop: '1.5rem',
          fontSize: '1rem', color: '#888',
        }}>
          ← メールアドレスを変更する
        </a>
      </div>
    </div>
  )
}

export default OTPVerificationPage

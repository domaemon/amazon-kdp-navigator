import { useState } from 'react'

function AgentLoginPage() {
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')

  void setStep
  void setEmail
  void setPassword
  void setCode

  const inputStyle = {
    width: '100%', padding: '0.85rem',
    fontSize: '1rem', border: '2px solid #ddd',
    borderRadius: 8, outline: 'none',
    boxSizing: 'border-box' as const,
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1e293b',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        background: '#fff', borderRadius: 16, padding: '2.5rem',
        width: '100%', maxWidth: 420,
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 48, height: 48, borderRadius: 10,
            background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '1.2rem',
            margin: '0 auto 1rem',
          }}>K</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.25rem' }}>
            Agent Portal
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            KDP Navigator — Agent Login
          </p>
        </div>

        {step === 'credentials' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
                Email
              </label>
              <input
                type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agent@kdp-navigator.jp"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
                Password
              </label>
              <input
                type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
              />
            </div>

            <button
              onClick={() => setStep('2fa')}
              style={{
                width: '100%', padding: '0.85rem',
                background: '#1e293b', color: '#fff',
                fontSize: '1rem', fontWeight: 600,
                border: 'none', borderRadius: 8, cursor: 'pointer',
                marginTop: '0.5rem',
              }}
            >
              Sign In
            </button>

            <div style={{ textAlign: 'center' }}>
              <a href="#" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Forgot password?
              </a>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              background: '#f0f9ff', borderRadius: 8, padding: '0.75rem 1rem',
              fontSize: '0.9rem', color: '#0369a1',
            }}>
              A 2FA code has been sent to your authenticator app.
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
                2FA Code
              </label>
              <input
                type="text" value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                maxLength={6}
                style={{ ...inputStyle, textAlign: 'center', letterSpacing: '0.3em', fontSize: '1.2rem' }}
              />
            </div>

            <button style={{
              width: '100%', padding: '0.85rem',
              background: '#1e293b', color: '#fff',
              fontSize: '1rem', fontWeight: 600,
              border: 'none', borderRadius: 8, cursor: 'pointer',
            }}>
              Verify
            </button>

            <button
              onClick={() => setStep('credentials')}
              style={{
                width: '100%', padding: '0.6rem',
                background: 'transparent', color: '#64748b',
                fontSize: '0.9rem', fontWeight: 500,
                border: '1px solid #e2e8f0', borderRadius: 8, cursor: 'pointer',
              }}
            >
              Back to login
            </button>
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0',
          textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8',
        }}>
          Protected by 2-factor authentication
        </div>
      </div>
    </div>
  )
}

export default AgentLoginPage

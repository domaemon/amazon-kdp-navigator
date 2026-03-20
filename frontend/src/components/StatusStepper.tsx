const steps = [
  { label: '執筆中', desc: '原稿を執筆中です' },
  { label: '提出済み', desc: '原稿が提出されました' },
  { label: '確認中', desc: '担当者が確認しています' },
  { label: '出版準備中', desc: '出版の準備を進めています' },
  { label: 'Amazon審査中', desc: 'Amazonで審査中です' },
  { label: '出版完了', desc: 'おめでとうございます！' },
]

interface StatusStepperProps {
  currentStep: number
  revisionRequested?: boolean
}

function StatusStepper({ currentStep, revisionRequested }: StatusStepperProps) {
  return (
    <div style={{ width: '100%' }}>
      {/* Progress bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'relative', marginBottom: '1rem',
      }}>
        {/* Background line */}
        <div style={{
          position: 'absolute', top: '50%', left: '5%', right: '5%',
          height: 4, background: '#e0e0e0', transform: 'translateY(-50%)',
          borderRadius: 2, zIndex: 0,
        }} />
        {/* Active line */}
        <div style={{
          position: 'absolute', top: '50%', left: '5%',
          width: `${Math.min((currentStep / (steps.length - 1)) * 90, 90)}%`,
          height: 4, background: '#1a73e8', transform: 'translateY(-50%)',
          borderRadius: 2, zIndex: 1, transition: 'width 0.3s',
        }} />

        {steps.map((step, i) => (
          <div key={step.label} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            zIndex: 2, flex: '1 1 0',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '1rem',
              background: i <= currentStep ? '#1a73e8' : '#e0e0e0',
              color: i <= currentStep ? '#fff' : '#999',
              border: i === currentStep ? '3px solid #a4c8f0' : 'none',
              transition: 'all 0.3s',
            }}>
              {i < currentStep ? '✓' : i + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {steps.map((step, i) => (
          <div key={step.label} style={{
            flex: '1 1 0', textAlign: 'center',
          }}>
            <div style={{
              fontSize: '0.95rem', fontWeight: i === currentStep ? 700 : 500,
              color: i <= currentStep ? '#1a73e8' : '#999',
            }}>
              {step.label}
            </div>
            {i === currentStep && (
              <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                {step.desc}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Revision banner */}
      {revisionRequested && (
        <div style={{
          marginTop: '1.5rem', padding: '1rem 1.25rem',
          background: '#fff3cd', border: '2px solid #ffc107',
          borderRadius: 12, display: 'flex', alignItems: 'center', gap: '0.75rem',
        }}>
          <span style={{ fontSize: '1.5rem' }}>📝</span>
          <div>
            <div style={{ fontWeight: 700, color: '#856404', fontSize: '1.05rem' }}>
              修正依頼があります
            </div>
            <div style={{ color: '#856404', fontSize: '0.95rem' }}>
              担当者からのメッセージをご確認ください
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StatusStepper

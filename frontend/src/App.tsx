import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EmailLoginPage from './pages/EmailLoginPage'
import OTPVerificationPage from './pages/OTPVerificationPage'
import OnboardingFormPage from './pages/OnboardingFormPage'
import AgentLoginPage from './pages/AgentLoginPage'
import AgentDashboard from './pages/AgentDashboard'
import WritingPage from './pages/WritingPage'
import StatusPage from './pages/StatusPage'
import ManuscriptReviewPage from './pages/ManuscriptReviewPage'
import MetadataReviewPage from './pages/MetadataReviewPage'
import CoverPreviewPage from './pages/CoverPreviewPage'
import PipelinePage from './pages/PipelinePage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<EmailLoginPage />} />
      <Route path="/verify" element={<OTPVerificationPage />} />
      <Route path="/onboarding" element={<OnboardingFormPage />} />
      <Route path="/write" element={<WritingPage />} />
      <Route path="/status" element={<StatusPage />} />
      <Route path="/agent/login" element={<AgentLoginPage />} />
      <Route path="/agent" element={<AgentDashboard />} />
      <Route path="/agent/review/:id" element={<ManuscriptReviewPage />} />
      <Route path="/agent/metadata/:id" element={<MetadataReviewPage />} />
      <Route path="/agent/cover/:id" element={<CoverPreviewPage />} />
      <Route path="/agent/pipeline/:id" element={<PipelinePage />} />
    </Routes>
  )
}

export default App

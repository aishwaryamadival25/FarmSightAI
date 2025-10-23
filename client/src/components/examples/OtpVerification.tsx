import OtpVerification from '../OtpVerification'

export default function OtpVerificationExample() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <OtpVerification 
        phoneNumber="+1 (555) 123-4567"
        onVerified={(token) => console.log('Verified with token:', token)}
        onBack={() => console.log('Back clicked')}
      />
    </div>
  )
}

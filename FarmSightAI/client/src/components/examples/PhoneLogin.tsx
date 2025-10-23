import PhoneLogin from '../PhoneLogin'

export default function PhoneLoginExample() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <PhoneLogin onOtpSent={(phone) => console.log('OTP sent to:', phone)} />
    </div>
  )
}

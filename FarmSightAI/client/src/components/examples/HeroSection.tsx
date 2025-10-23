import HeroSection from '../HeroSection'

export default function HeroSectionExample() {
  return (
    <HeroSection onStartAnalysis={() => console.log('Start analysis clicked')} />
  )
}

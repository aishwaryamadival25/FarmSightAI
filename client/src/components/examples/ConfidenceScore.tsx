import ConfidenceScore from '../ConfidenceScore'

export default function ConfidenceScoreExample() {
  return (
    <div className="space-y-4 max-w-md">
      <ConfidenceScore score={92} label="High Confidence" />
      <ConfidenceScore score={68} label="Medium Confidence" />
      <ConfidenceScore score={45} label="Low Confidence" />
    </div>
  )
}

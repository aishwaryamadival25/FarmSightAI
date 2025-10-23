import AnalysisHistory from '../AnalysisHistory'

export default function AnalysisHistoryExample() {
  const mockRecords = [
    {
      id: "1",
      cropType: "Wheat",
      diseaseName: "Leaf Rust",
      severity: "medium" as const,
      date: "2 hours ago",
      thumbnail: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=80&h=80&fit=crop"
    },
    {
      id: "2",
      cropType: "Tomato",
      diseaseName: "Early Blight",
      severity: "high" as const,
      date: "1 day ago",
      thumbnail: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=80&h=80&fit=crop"
    }
  ]

  return (
    <AnalysisHistory 
      records={mockRecords}
      onViewDetails={(id) => console.log('View details:', id)}
    />
  )
}

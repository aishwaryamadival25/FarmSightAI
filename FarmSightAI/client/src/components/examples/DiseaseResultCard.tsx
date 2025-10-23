import DiseaseResultCard from '../DiseaseResultCard'

export default function DiseaseResultCardExample() {
  const mockResult = {
    diseaseName: "Leaf Rust",
    severity: "medium" as const,
    confidence: 87,
    symptoms: [
      "Orange-brown pustules on leaf surface",
      "Yellowing of surrounding tissue",
      "Premature leaf drop"
    ],
    causes: [
      "Fungal infection (Puccinia triticina)",
      "High humidity conditions",
      "Moderate temperatures (15-22°C)"
    ],
    treatment: [
      "Apply fungicide containing triazole compounds",
      "Remove infected plant debris",
      "Ensure proper plant spacing for air circulation",
      "Use resistant crop varieties"
    ],
    environmentalImpact: "High humidity (85%) and moderate temperature (18°C) create ideal conditions for leaf rust development"
  }

  return (
    <DiseaseResultCard 
      result={mockResult}
      imageUrl="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop"
    />
  )
}

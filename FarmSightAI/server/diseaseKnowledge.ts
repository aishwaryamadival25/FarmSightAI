// Disease knowledge base for 5 crop types
export const diseaseKnowledge = {
  wheat: [
    {
      name: "Leaf Rust",
      keywords: ["rust", "orange", "pustule", "lesion"],
      symptoms: [
        "Orange-brown pustules on leaf surface",
        "Yellowing of surrounding tissue",
        "Premature leaf drop",
        "Reduced grain yield"
      ],
      causes: [
        "Fungal infection (Puccinia triticina)",
        "High humidity conditions (>70%)",
        "Moderate temperatures (15-22°C)",
        "Dense plant spacing"
      ],
      treatment: [
        "Apply fungicide containing triazole compounds",
        "Remove infected plant debris",
        "Ensure proper plant spacing for air circulation",
        "Use resistant wheat varieties"
      ]
    },
    {
      name: "Powdery Mildew",
      keywords: ["white", "powder", "mildew", "coating"],
      symptoms: [
        "White powdery coating on leaves",
        "Yellowing and wilting of leaves",
        "Stunted plant growth",
        "Reduced photosynthesis"
      ],
      causes: [
        "Fungal pathogen (Blumeria graminis)",
        "Humid conditions with poor air circulation",
        "Moderate temperatures (18-25°C)",
        "Excessive nitrogen fertilization"
      ],
      treatment: [
        "Apply sulfur-based fungicides",
        "Improve air circulation around plants",
        "Reduce nitrogen fertilizer application",
        "Remove severely infected plants"
      ]
    }
  ],
  rice: [
    {
      name: "Rice Blast",
      keywords: ["blast", "lesion", "spot", "diamond"],
      symptoms: [
        "Diamond-shaped lesions with gray centers",
        "Brown borders on leaf spots",
        "Neck rot in severe cases",
        "Grain discoloration"
      ],
      causes: [
        "Fungal infection (Magnaporthe oryzae)",
        "High humidity and wet conditions",
        "Excessive nitrogen fertilization",
        "Temperature range 25-28°C"
      ],
      treatment: [
        "Apply tricyclazole or azoxystrobin fungicides",
        "Manage water levels properly",
        "Use resistant rice varieties",
        "Balance nitrogen fertilization"
      ]
    },
    {
      name: "Bacterial Leaf Blight",
      keywords: ["blight", "bacterial", "water", "yellow"],
      symptoms: [
        "Water-soaked lesions on leaf tips",
        "Yellow to white lesions along leaf margins",
        "Wilting of entire leaves",
        "Bacterial ooze in morning dew"
      ],
      causes: [
        "Bacterial infection (Xanthomonas oryzae)",
        "High humidity and temperature (25-34°C)",
        "Wounds from insects or wind damage",
        "Contaminated irrigation water"
      ],
      treatment: [
        "Use copper-based bactericides",
        "Plant resistant varieties",
        "Avoid excessive nitrogen fertilizer",
        "Ensure clean irrigation water"
      ]
    }
  ],
  corn: [
    {
      name: "Northern Corn Leaf Blight",
      keywords: ["blight", "gray", "cigar", "lesion"],
      symptoms: [
        "Long cigar-shaped gray-green lesions",
        "Lesions turn tan to brown as they age",
        "Reduced photosynthetic area",
        "Lower ear formation"
      ],
      causes: [
        "Fungal pathogen (Exserohilum turcicum)",
        "Cool temperatures (18-27°C)",
        "High humidity and leaf wetness",
        "Infected crop residue"
      ],
      treatment: [
        "Apply fungicides at early symptoms",
        "Rotate crops to reduce inoculum",
        "Plant resistant hybrids",
        "Remove infected crop debris"
      ]
    },
    {
      name: "Common Rust",
      keywords: ["rust", "brown", "pustule", "powder"],
      symptoms: [
        "Circular to elongate brown pustules",
        "Powdery orange-brown spores",
        "Pustules on both leaf surfaces",
        "Premature leaf death"
      ],
      causes: [
        "Fungal infection (Puccinia sorghi)",
        "Moderate temperatures (16-23°C)",
        "High humidity and dew",
        "Wind-dispersed spores"
      ],
      treatment: [
        "Apply triazole fungicides",
        "Use resistant corn hybrids",
        "Monitor weather conditions",
        "Early planting to avoid peak infection"
      ]
    }
  ],
  tomato: [
    {
      name: "Early Blight",
      keywords: ["blight", "target", "spot", "brown"],
      symptoms: [
        "Dark brown spots with concentric rings (target pattern)",
        "Yellowing around lesions",
        "Leaf drop from bottom up",
        "Stem lesions with dark cankers"
      ],
      causes: [
        "Fungal infection (Alternaria solani)",
        "Warm temperatures (24-29°C)",
        "High humidity conditions",
        "Plant stress or poor nutrition"
      ],
      treatment: [
        "Apply chlorothalonil or mancozeb fungicides",
        "Remove infected lower leaves",
        "Ensure proper plant spacing",
        "Mulch to prevent soil splash"
      ]
    },
    {
      name: "Late Blight",
      keywords: ["blight", "water", "white", "mold"],
      symptoms: [
        "Water-soaked spots on leaves",
        "White fuzzy growth on leaf undersides",
        "Brown to black lesions on stems",
        "Firm brown rot on fruits"
      ],
      causes: [
        "Oomycete pathogen (Phytophthora infestans)",
        "Cool moist conditions (10-25°C)",
        "High humidity (>90%)",
        "Infected seed or transplants"
      ],
      treatment: [
        "Apply copper-based or systemic fungicides",
        "Remove and destroy infected plants",
        "Improve air circulation",
        "Use disease-free transplants"
      ]
    }
  ],
  potato: [
    {
      name: "Late Blight",
      keywords: ["blight", "dark", "water", "rot"],
      symptoms: [
        "Dark water-soaked lesions on leaves",
        "White mold on leaf undersides",
        "Brown rot on tubers",
        "Rapid plant death in humid conditions"
      ],
      causes: [
        "Phytophthora infestans pathogen",
        "Cool wet weather (15-20°C)",
        "Overhead irrigation",
        "Infected seed potatoes"
      ],
      treatment: [
        "Apply preventive fungicides (chlorothalonil)",
        "Use certified disease-free seed",
        "Hill soil to protect tubers",
        "Destroy volunteer potatoes"
      ]
    },
    {
      name: "Early Blight",
      keywords: ["blight", "spot", "target", "concentric"],
      symptoms: [
        "Brown spots with concentric rings on older leaves",
        "Yellowing and defoliation",
        "Lesions on stems and tubers",
        "Reduced tuber size and quality"
      ],
      causes: [
        "Alternaria solani fungus",
        "Warm dry weather alternating with wet periods",
        "Plant stress or nutrient deficiency",
        "Poor air circulation"
      ],
      treatment: [
        "Apply mancozeb or azoxystrobin fungicides",
        "Ensure adequate plant nutrition",
        "Remove infected plant material",
        "Practice crop rotation"
      ]
    }
  ]
};

export function findBestMatchingDisease(cropType: string, aiDescription: string): any {
  const diseases = diseaseKnowledge[cropType as keyof typeof diseaseKnowledge] || [];
  const description = aiDescription.toLowerCase();
  
  let bestMatch = diseases[0];
  let highestScore = 0;

  for (const disease of diseases) {
    let score = 0;
    for (const keyword of disease.keywords) {
      if (description.includes(keyword.toLowerCase())) {
        score += 1;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = disease;
    }
  }

  return bestMatch || diseases[0];
}

import CropCategoryCard from '../CropCategoryCard'
import { Wheat } from 'lucide-react'

export default function CropCategoryCardExample() {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-md">
      <CropCategoryCard 
        name="Wheat" 
        icon={Wheat} 
        diseaseCount={12} 
        isActive={false}
        onClick={() => console.log('Wheat selected')}
      />
      <CropCategoryCard 
        name="Corn" 
        icon={Wheat} 
        diseaseCount={8} 
        isActive={true}
        onClick={() => console.log('Corn selected')}
      />
    </div>
  )
}

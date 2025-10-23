import ImageUploadZone from '../ImageUploadZone'

export default function ImageUploadZoneExample() {
  return (
    <ImageUploadZone 
      onImageSelect={(file) => console.log('Image selected:', file.name)}
    />
  )
}

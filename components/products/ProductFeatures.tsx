import type React from "react"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

interface ProductFeaturesProps {
  features: Feature[]
}

export function ProductFeatures({ features }: ProductFeaturesProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {features.map((feature, index) => (
        <div key={index} className="text-center p-4 rounded-lg dark:bg-muted bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex justify-center mb-2 text-primary">{feature.icon}</div>
          <h4 className="font-medium text-sm mb-1">{feature.title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

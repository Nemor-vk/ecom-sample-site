"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"
import { toast } from "sonner"

export function HomepageEditor() {
  const [sections, setSections] = useState({
    hero: {
      enabled: true,
      title: "Welcome to Our Store",
      subtitle: "Discover amazing products at great prices",
      ctaText: "Shop Now",
      ctaLink: "/products",
    },
    features: {
      enabled: true,
      title: "Why Choose Us",
      items: [
        { title: "Fast Shipping", description: "Free shipping on orders over $50" },
        { title: "Quality Products", description: "Only the best products for our customers" },
        { title: "24/7 Support", description: "We're here to help whenever you need us" },
      ],
    },
    testimonials: {
      enabled: false,
      title: "What Our Customers Say",
    },
    newsletter: {
      enabled: true,
      title: "Stay Updated",
      description: "Subscribe to our newsletter for the latest updates and offers",
    },
  })

  const handleSave = () => {
    toast("Homepage updated", {
      description: "Your homepage sections have been updated successfully.",
    })
  }

  const toggleSection = (sectionKey: string) => {
    setSections((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey as keyof typeof prev],
        enabled: !prev[sectionKey as keyof typeof prev].enabled,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Configure your homepage hero section</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="hero-enabled">Enable Hero Section</Label>
            <Switch id="hero-enabled" checked={sections.hero.enabled} onCheckedChange={() => toggleSection("hero")} />
          </div>
          {sections.hero.enabled && (
            <div className="space-y-4 pl-4 border-l-2 border-muted">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Title</Label>
                <Input
                  id="hero-title"
                  value={sections.hero.title}
                  onChange={(e) =>
                    setSections({
                      ...sections,
                      hero: { ...sections.hero, title: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Subtitle</Label>
                <Textarea
                  id="hero-subtitle"
                  value={sections.hero.subtitle}
                  onChange={(e) =>
                    setSections({
                      ...sections,
                      hero: { ...sections.hero, subtitle: e.target.value },
                    })
                  }
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-cta-text">CTA Text</Label>
                  <Input
                    id="hero-cta-text"
                    value={sections.hero.ctaText}
                    onChange={(e) =>
                      setSections({
                        ...sections,
                        hero: { ...sections.hero, ctaText: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-cta-link">CTA Link</Label>
                  <Input
                    id="hero-cta-link"
                    value={sections.hero.ctaLink}
                    onChange={(e) =>
                      setSections({
                        ...sections,
                        hero: { ...sections.hero, ctaLink: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features Section</CardTitle>
          <CardDescription>Highlight your key features and benefits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="features-enabled">Enable Features Section</Label>
            <Switch
              id="features-enabled"
              checked={sections.features.enabled}
              onCheckedChange={() => toggleSection("features")}
            />
          </div>
          {sections.features.enabled && (
            <div className="space-y-4 pl-4 border-l-2 border-muted">
              <div className="space-y-2">
                <Label htmlFor="features-title">Section Title</Label>
                <Input
                  id="features-title"
                  value={sections.features.title}
                  onChange={(e) =>
                    setSections({
                      ...sections,
                      features: { ...sections.features, title: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-4">
                <Label>Feature Items</Label>
                {sections.features.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => {
                          const newItems = [...sections.features.items]
                          newItems[index] = { ...item, title: e.target.value }
                          setSections({
                            ...sections,
                            features: { ...sections.features, items: newItems },
                          })
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        value={item.description}
                        onChange={(e) => {
                          const newItems = [...sections.features.items]
                          newItems[index] = { ...item, description: e.target.value }
                          setSections({
                            ...sections,
                            features: { ...sections.features, items: newItems },
                          })
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Newsletter Section</CardTitle>
          <CardDescription>Configure your newsletter signup section</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="newsletter-enabled">Enable Newsletter Section</Label>
            <Switch
              id="newsletter-enabled"
              checked={sections.newsletter.enabled}
              onCheckedChange={() => toggleSection("newsletter")}
            />
          </div>
          {sections.newsletter.enabled && (
            <div className="space-y-4 pl-4 border-l-2 border-muted">
              <div className="space-y-2">
                <Label htmlFor="newsletter-title">Title</Label>
                <Input
                  id="newsletter-title"
                  value={sections.newsletter.title}
                  onChange={(e) =>
                    setSections({
                      ...sections,
                      newsletter: { ...sections.newsletter, title: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newsletter-description">Description</Label>
                <Textarea
                  id="newsletter-description"
                  value={sections.newsletter.description}
                  onChange={(e) =>
                    setSections({
                      ...sections,
                      newsletter: { ...sections.newsletter, description: e.target.value },
                    })
                  }
                  rows={2}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} size={'lg'}>
          <Save className="h-4 w-4" />
          Save Homepage
        </Button>
      </div>
    </div>
  )
}

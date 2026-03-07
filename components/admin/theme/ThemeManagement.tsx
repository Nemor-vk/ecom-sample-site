"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Palette, Save, Download, Upload, Eye, Paintbrush } from "lucide-react"
import { toast } from "sonner"

const colorPresets = [
  {
    name: "Default",
    colors: {
      primary: "#0f172a",
      secondary: "#f1f5f9",
      accent: "#3b82f6",
      background: "#ffffff",
      foreground: "#0f172a",
    },
  },
  {
    name: "Ocean Blue",
    colors: {
      primary: "#0369a1",
      secondary: "#e0f2fe",
      accent: "#0284c7",
      background: "#ffffff",
      foreground: "#0c4a6e",
    },
  },
  {
    name: "Forest Green",
    colors: {
      primary: "#166534",
      secondary: "#dcfce7",
      accent: "#16a34a",
      background: "#ffffff",
      foreground: "#14532d",
    },
  },
  {
    name: "Purple Haze",
    colors: {
      primary: "#7c3aed",
      secondary: "#f3e8ff",
      accent: "#8b5cf6",
      background: "#ffffff",
      foreground: "#581c87",
    },
  },
  {
    name: "Sunset Orange",
    colors: {
      primary: "#ea580c",
      secondary: "#fed7aa",
      accent: "#f97316",
      background: "#ffffff",
      foreground: "#9a3412",
    },
  },
]

export function ThemeManagement() {

  const [activePreset, setActivePreset] = useState("Default")
  const [customColors, setCustomColors] = useState({
    primary: "#0f172a",
    secondary: "#f1f5f9",
    accent: "#3b82f6",
    background: "#ffffff",
    foreground: "#0f172a",
  })
  const [settings, setSettings] = useState({
    darkModeEnabled: true,
    autoTheme: true,
    customBranding: false,
    companyLogo: "",
    companyName: "Admin Dashboard",
    favicon: "",
  })

  const handleSaveTheme = () => {
    toast("Theme saved", {
      description: "Your theme settings have been applied successfully.",
    })
  }

  const handleExportTheme = () => {
    const themeData = {
      preset: activePreset,
      colors: customColors,
      settings: settings,
    }
    const dataStr = JSON.stringify(themeData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = "theme-config.json"
    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()

    toast("Theme exported", {
      description: "Theme configuration has been downloaded.",
    })
  }

  const applyPreset = (preset: (typeof colorPresets)[0]) => {
    setActivePreset(preset.name)
    setCustomColors(preset.colors)
    toast("Preset applied", {
      description: `${preset.name} theme has been applied.`,
    })
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Theme & UI</h2>
        <div className="flex items-center space-x-2">
          {/* <ThemeToggle /> */}
          <Button onClick={handleExportTheme} variant="outline" size={'lg'}>
            <Download className="h-4 w-4" />
            Export Theme
          </Button>
          <Button onClick={handleSaveTheme}  size={'lg'}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="colors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="colors">Colors & Themes</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Color Presets
              </CardTitle>
              <CardDescription>Choose from pre-designed color schemes or create your own</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {colorPresets.map((preset) => (
                  <Card
                    key={preset.name}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      activePreset === preset.name ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => applyPreset(preset)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{preset.name}</CardTitle>
                        {activePreset === preset.name && <Badge variant="default">Active</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2">
                        {Object.entries(preset.colors).map(([key, color]) => (
                          <div
                            key={key}
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                            title={key}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Colors</CardTitle>
              <CardDescription>Fine-tune your color palette</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(customColors).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key} className="capitalize">
                      {key}
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id={key}
                        type="color"
                        value={value}
                        onChange={(e) =>
                          setCustomColors({
                            ...customColors,
                            [key]: e.target.value,
                          })
                        }
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={value}
                        onChange={(e) =>
                          setCustomColors({
                            ...customColors,
                            [key]: e.target.value,
                          })
                        }
                        className="flex-1"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme Preview</CardTitle>
              <CardDescription>See how your theme looks in action</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border rounded-lg p-4 space-y-4"
                style={{
                  backgroundColor: customColors.background,
                  color: customColors.foreground,
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Sample Dashboard</h3>
                  <Button size="sm" style={{ backgroundColor: customColors.primary, color: customColors.background }}>
                    Primary Button
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded border" style={{ backgroundColor: customColors.secondary }}>
                    <div className="text-sm font-medium">Card 1</div>
                    <div className="text-2xl font-bold">$12,345</div>
                  </div>
                  <div className="p-3 rounded border" style={{ backgroundColor: customColors.secondary }}>
                    <div className="text-sm font-medium">Card 2</div>
                    <div className="text-2xl font-bold">1,234</div>
                  </div>
                  <div
                    className="p-3 rounded border"
                    style={{ backgroundColor: customColors.accent, color: customColors.background }}
                  >
                    <div className="text-sm font-medium">Accent Card</div>
                    <div className="text-2xl font-bold">567</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paintbrush className="h-5 w-5" />
                Brand Identity
              </CardTitle>
              <CardDescription>Customize your brand appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="custom-branding">Enable Custom Branding</Label>
                  <div className="text-sm text-muted-foreground">Use your own logo and company name</div>
                </div>
                <Switch
                  id="custom-branding"
                  checked={settings.customBranding}
                  onCheckedChange={(checked) => setSettings({ ...settings, customBranding: checked })}
                />
              </div>

              {settings.customBranding && (
                <div className="space-y-4 pl-4 border-l-2 border-muted">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      value={settings.companyName}
                      onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                      placeholder="Your Company Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Company Logo</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-2">
                        <Button variant="outline" size="sm">
                          Upload Logo
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">PNG, SVG up to 2MB</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Favicon</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <div className="mt-2">
                        <Button variant="outline" size="sm">
                          Upload Favicon
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">ICO, PNG 32x32px</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Layout Settings</CardTitle>
              <CardDescription>Configure the overall layout and appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode Support</Label>
                  <div className="text-sm text-muted-foreground">Enable dark mode toggle for users</div>
                </div>
                <Switch
                  id="dark-mode"
                  checked={settings.darkModeEnabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, darkModeEnabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-theme">Auto Theme Detection</Label>
                  <div className="text-sm text-muted-foreground">
                    Automatically detect user&apos;s system theme preference
                  </div>
                </div>
                <Switch
                  id="auto-theme"
                  checked={settings.autoTheme}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoTheme: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Theme Options</CardTitle>
              <CardDescription>Advanced customization and import/export options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Import Theme Configuration</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      Import Theme JSON
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Upload a previously exported theme configuration</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>CSS Variables</Label>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <div>--primary: {customColors.primary};</div>
                  <div>--secondary: {customColors.secondary};</div>
                  <div>--accent: {customColors.accent};</div>
                  <div>--background: {customColors.background};</div>
                  <div>--foreground: {customColors.foreground};</div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleExportTheme}  size={'lg'}>
                  <Download className="h-4 w-4" />
                  Export Configuration
                </Button>
                <Button variant="outline"  size={'lg'}>
                  <Eye className="h-4 w-4" />
                  Preview Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

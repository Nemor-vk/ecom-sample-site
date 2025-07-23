"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PromotionalTags } from "./PromotionalTags"
import { HomepageEditor } from "./HomePageEditor"
import { SiteSettings } from "./SiteSettings"

export function SiteContentEditor() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Site Content Editor</h2>
      </div>
      <Tabs defaultValue="site-settings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="site-settings">Site Settings</TabsTrigger>
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="promotional">Promotional Tags</TabsTrigger>
        </TabsList>
        <TabsContent value="site-settings" className="space-y-4">
          <SiteSettings />
        </TabsContent>
        <TabsContent value="homepage" className="space-y-4">
          <HomepageEditor />
        </TabsContent>
        <TabsContent value="promotional" className="space-y-4">
          <PromotionalTags />
        </TabsContent>
      </Tabs>
    </div>
  )
}

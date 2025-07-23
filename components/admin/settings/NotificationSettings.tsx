"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Bell, Save } from "lucide-react"
import { toast } from "sonner"

export function NotificationSettings() {

  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    lowStockAlerts: true,
    securityAlerts: true,
    marketingEmails: false,
    weeklyReports: true,
    monthlyReports: true,
  })

  const handleSave = () => {
    toast("Notification settings saved", {
      description: "Your notification preferences have been updated successfully.",
    })
  }

  const toggle = (key: keyof typeof settings) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="space-y-6">
      {/* Master switch */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>Enable or disable all email notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2">
            <Label htmlFor="emailNotifications">Enable Email Notifications</Label>
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={() => toggle("emailNotifications")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Individual toggles */}
      <Card>
        <CardHeader>
          <CardTitle>Business Notifications</CardTitle>
          <CardDescription>Select which notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { id: "orderNotifications", label: "Order Notifications" },
            { id: "lowStockAlerts", label: "Low Stock Alerts" },
            { id: "securityAlerts", label: "Security Alerts" },
            { id: "marketingEmails", label: "Marketing Emails" },
            { id: "weeklyReports", label: "Weekly Reports" },
            { id: "monthlyReports", label: "Monthly Reports" },
          ].map(({ id, label }) => (
            <div key={id} className="flex items-center justify-between">
              <Label htmlFor={id}>{label}</Label>
              <Switch
                id={id}
                checked={settings[id as keyof typeof settings]}
                onCheckedChange={() => toggle(id as keyof typeof settings)}
                disabled={!settings.emailNotifications}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} size={'lg'}>
          <Save className="h-4 w-4" />
          Save Preferences
        </Button>
      </div>
    </div>
  )
}

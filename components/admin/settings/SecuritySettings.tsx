"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, Shield } from "lucide-react"
import { toast } from "sonner"

export function SecuritySettings() {

  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireSpecialChars: true,
    loginAttempts: 5,
    ipWhitelist: "",
  })

  const handleSave = () => {
    toast("Security settings saved", {
      description: "Your security settings have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Authentication Settings
          </CardTitle>
          <CardDescription>Configure authentication and access control settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <div className="text-sm text-muted-foreground">Require 2FA for all admin accounts</div>
            </div>
            <Switch
              id="two-factor"
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
            <Input
              id="session-timeout"
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => setSettings({ ...settings, sessionTimeout: Number.parseInt(e.target.value) })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password Policy</CardTitle>
          <CardDescription>Configure password requirements and security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password-length">Minimum Password Length</Label>
            <Input
              id="password-length"
              type="number"
              value={settings.passwordMinLength}
              onChange={(e) => setSettings({ ...settings, passwordMinLength: Number.parseInt(e.target.value) })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="special-chars">Require Special Characters</Label>
              <div className="text-sm text-muted-foreground">Passwords must contain special characters</div>
            </div>
            <Switch
              id="special-chars"
              checked={settings.requireSpecialChars}
              onCheckedChange={(checked) => setSettings({ ...settings, requireSpecialChars: checked })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-attempts">Max Login Attempts</Label>
            <Input
              id="login-attempts"
              type="number"
              value={settings.loginAttempts}
              onChange={(e) => setSettings({ ...settings, loginAttempts: Number.parseInt(e.target.value) })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Access Control</CardTitle>
          <CardDescription>Configure IP restrictions and access controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ip-whitelist">IP Whitelist</Label>
            <Input
              id="ip-whitelist"
              placeholder="192.168.1.1, 10.0.0.1"
              value={settings.ipWhitelist}
              onChange={(e) => setSettings({ ...settings, ipWhitelist: e.target.value })}
            />
            <div className="text-sm text-muted-foreground">
              Comma-separated list of allowed IP addresses (leave empty to allow all)
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} size={'lg'}>
          <Save className="h-4 w-4" />
          Save Security Settings
        </Button>
      </div>
    </div>
  )
}

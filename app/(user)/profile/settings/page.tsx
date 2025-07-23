import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const page = () => {
  return (
    <div className="space-y-6">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm p-5">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Account Settings</CardTitle>
            <p className="text-gray-600">Manage your account preferences</p>
          </CardHeader>
          <CardContent className="space-y-6 mt-7">
            <div className="space-y-5">
              <h3 className="text-lg font-medium text-gray-800">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input id="firstName" defaultValue="Emma" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input id="lastName" defaultValue="Johnson" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input id="email" type="email" defaultValue="emma.johnson@email.com" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label>Age</Label>
                  <Input id="age" type="number" defaultValue="28" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select defaultValue="female">
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-800">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive updates about your orders</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                    Enabled
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-800">Marketing Emails</p>
                    <p className="text-sm text-gray-600">Receive promotional offers and news</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                    Disabled
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500">
                Save Changes
              </Button>
              <Button variant="outline" className="rounded-full bg-transparent">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}

export default page
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { UsersTable } from "./UserTable"
import { RolesManagement } from "./RolesManagement"
import { UserDialog } from "./AdminDialogs"


export function UsersManagement() {
  const [showUserDialog, setShowUserDialog] = useState(false)

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Users & Permissions</h2>
        {/* <Button size={'lg'} className="px-4" onClick={() => setShowUserDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button> */}
      </div>
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users and their role assignments</CardDescription>
              <Button size={'lg'} className="px-4 right-12 absolute" onClick={() => setShowUserDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </CardHeader>
            <CardContent>
              <UsersTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="roles" className="space-y-4">
          <RolesManagement />
        </TabsContent>
      </Tabs>
      <UserDialog open={showUserDialog} onOpenChange={setShowUserDialog} />
    </div>
  )
}

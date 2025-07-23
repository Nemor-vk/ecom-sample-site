"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Shield, Trash2, Edit } from "lucide-react"
import { EditRoleDialog, RoleDialog } from "./AdminDialogs"

const defaultRoles = [
  {
    id: "1",
    name: "Admin (Owner)",
    description: "Full system access with ownership privileges",
    isDefault: true,
    userCount: 1,
    permissions: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    id: "2",
    name: "Admin (Non-owner)",
    description: "Full system access without ownership privileges",
    isDefault: true,
    userCount: 2,
    permissions: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    id: "3",
    name: "Manager",
    description: "Limited administrative access",
    isDefault: true,
    userCount: 5,
    permissions: {
      create: true,
      read: true,
      update: true,
      delete: false,
    },
  },
  {
    id: "4",
    name: "User",
    description: "Basic user access",
    isDefault: true,
    userCount: 25,
    permissions: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
  },
]

const customRoles = [
  {
    id: "5",
    name: "Content Editor",
    description: "Can edit site content and manage products",
    isDefault: false,
    userCount: 3,
    permissions: {
      create: true,
      read: true,
      update: true,
      delete: false,
    },
  },
]

export function RolesManagement() {
  const [showRoleDialog, setShowRoleDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingRole, setEditingRole] = useState(null)

  const handleEditRole = (role) => {
    setEditingRole(role)
    setShowEditDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Roles & Permissions</h3>
          <p className="text-sm text-muted-foreground">Manage user roles and their permissions</p>
        </div>
        <Button onClick={() => setShowRoleDialog(true)} size={'lg'}>
          <Plus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-3">Default Roles</h4>
          <div className="grid gap-4 md:grid-cols-2">
            {defaultRoles.map((role) => (
              <Card key={role.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <CardTitle className="text-base">{role.name}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{role.userCount} users</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditRole(role)}
                        disabled={role.name.includes("Owner")}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Create</span>
                      <Switch checked={role.permissions.create} disabled />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Read</span>
                      <Switch checked={role.permissions.read} disabled />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Update</span>
                      <Switch checked={role.permissions.update} disabled />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Delete</span>
                      <Switch checked={role.permissions.delete} disabled />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Custom Roles</h4>
          <div className="grid gap-4 md:grid-cols-2">
            {customRoles.map((role) => (
              <Card key={role.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <CardTitle className="text-base">{role.name}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{role.userCount} users</Badge>
                      <Button variant="ghost" size="sm" onClick={() => handleEditRole(role)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Create</span>
                      <Switch checked={role.permissions.create} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Read</span>
                      <Switch checked={role.permissions.read} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Update</span>
                      <Switch checked={role.permissions.update} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Delete</span>
                      <Switch checked={role.permissions.delete} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <RoleDialog open={showRoleDialog} onOpenChange={setShowRoleDialog} />
      <EditRoleDialog open={showEditDialog} onOpenChange={setShowEditDialog} role={editingRole} />
    </div>
  )
}

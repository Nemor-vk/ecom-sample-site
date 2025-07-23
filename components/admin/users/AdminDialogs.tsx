"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface UserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserDialog({ open, onOpenChange }: UserDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle user creation
    console.log("Creating user:", formData)
    onOpenChange(false)
    setFormData({ name: "", email: "", role: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Create a new user account and assign a role.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin-non-owner">Admin (Non-owner)</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="content-editor">Content Editor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


// ------------------------------- ROLE DIALOG -------------------------------------- //

interface RoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RoleDialog({ open, onOpenChange }: RoleDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle role creation
    console.log("Creating role:", formData)
    onOpenChange(false)
    setFormData({
      name: "",
      description: "",
      permissions: { create: false, read: true, update: false, delete: false },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Role</DialogTitle>
          <DialogDescription>Define a new role with specific permissions.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role-name" className="text-right">
                Name
              </Label>
              <Input
                id="role-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="role-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium">Permissions</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Create</span>
                  <Switch
                    checked={formData.permissions.create}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        permissions: { ...formData.permissions, create: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Read</span>
                  <Switch
                    checked={formData.permissions.read}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        permissions: { ...formData.permissions, read: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Update</span>
                  <Switch
                    checked={formData.permissions.update}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        permissions: { ...formData.permissions, update: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Delete</span>
                  <Switch
                    checked={formData.permissions.delete}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        permissions: { ...formData.permissions, delete: checked },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Role</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


// ---------------------------------- EDIT ROLE DIALOG -------------------------------- ///

interface Role {
  id: string
  name: string
  description: string
  permissions: {
    create: boolean
    read: boolean
    update: boolean
    delete: boolean
  }
}

interface EditRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  role: Role | null
}

export function EditRoleDialog({ open, onOpenChange, role }: EditRoleDialogProps) {

  const [formData, setFormData] = useState({
    name: role?.name || "",
    description: role?.description || "",
    permissions: role?.permissions || {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle role update
    console.log("Updating role:", { ...role, ...formData })
    toast("Role updated", {
      description: `Role "${formData.name}" has been updated successfully.`,
    })
    onOpenChange(false)
  }

  const updatePermission = (permission: keyof typeof formData.permissions, value: boolean) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [permission]: value,
      },
    })
  }

  if (!role) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Role</DialogTitle>
          <DialogDescription>Update the role details and permissions.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name</Label>
              <Input
                id="role-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-description">Description</Label>
              <Textarea
                id="role-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium">Permissions</Label>
              <div className="space-y-3 rounded-lg border p-4">
                {Object.entries(formData.permissions).map(([permission, enabled]) => (
                  <div key={permission} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium capitalize">{permission}</Label>
                      <div className="text-xs text-muted-foreground">
                        {permission === "create" && "Allow creating new resources"}
                        {permission === "read" && "Allow viewing resources"}
                        {permission === "update" && "Allow editing existing resources"}
                        {permission === "delete" && "Allow deleting resources"}
                      </div>
                    </div>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(value) =>
                        updatePermission(permission as keyof typeof formData.permissions, value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Role</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )}

// ----------------------------------- TRANSFER OWNERSHIP DIALOG ------------------------------------------- //

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface TransferOwnershipDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentOwner: User | null
  eligibleUsers: User[]
}

export function TransferOwnershipDialog({
  open,
  onOpenChange,
  currentOwner,
  eligibleUsers,
}: TransferOwnershipDialogProps) {
  const [selectedUserId, setSelectedUserId] = useState("")
  const [confirmationStep, setConfirmationStep] = useState(false)

  const handleTransfer = () => {
    if (!selectedUserId) return

    const selectedUser = eligibleUsers.find((user) => user.id === selectedUserId)
    if (!selectedUser) return

    // Handle ownership transfer
    console.log("Transferring ownership to:", selectedUser)
    toast("Ownership transferred", {
      description: `Ownership has been transferred to ${selectedUser.name}.`,
    })
    onOpenChange(false)
    setConfirmationStep(false)
    setSelectedUserId("")
  }

  const handleNext = () => {
    if (selectedUserId) {
      setConfirmationStep(true)
    }
  }

  const handleBack = () => {
    setConfirmationStep(false)
  }

  const selectedUser = eligibleUsers.find((user) => user.id === selectedUserId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Transfer Ownership
          </DialogTitle>
          <DialogDescription>
            {!confirmationStep
              ? "Select a user to transfer ownership to. This action cannot be undone."
              : "Please confirm the ownership transfer."}
          </DialogDescription>
        </DialogHeader>

        {!confirmationStep ? (
          <div className="space-y-4 py-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Transferring ownership will remove your admin privileges and grant full control to the selected user.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="new-owner">Select New Owner</Label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a user to transfer ownership to" />
                </SelectTrigger>
                <SelectContent>
                  {eligibleUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {currentOwner && (
              <div className="rounded-lg border p-3">
                <Label className="text-sm font-medium">Current Owner</Label>
                <div className="mt-1">
                  <div className="font-medium">{currentOwner.name}</div>
                  <div className="text-sm text-muted-foreground">{currentOwner.email}</div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <Alert className="border-destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Warning:</strong> This action is irreversible. You will lose all administrative privileges.
              </AlertDescription>
            </Alert>

            {selectedUser && (
              <div className="space-y-3">
                <div className="rounded-lg border p-3">
                  <Label className="text-sm font-medium">Transfer ownership to:</Label>
                  <div className="mt-1">
                    <div className="font-medium">{selectedUser.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedUser.email}</div>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <Label className="text-sm font-medium">Your new role will be:</Label>
                  <div className="mt-1 font-medium">Admin (Non-owner)</div>
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          {!confirmationStep ? (
            <>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleNext} disabled={!selectedUserId}>
                Next
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button type="button" variant="destructive" onClick={handleTransfer}>
                Transfer Ownership
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


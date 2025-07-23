"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Crown } from "lucide-react"
import { DataTable, SortableHeader, ActionDropdown } from "@/components/table/data-table"
import { TransferOwnershipDialog } from "./AdminDialogs"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  lastLogin: string
  avatar: string
  dateOfBirth: string
  department: string
  joinDate: string
}

const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin (Owner)",
    status: "active",
    lastLogin: "2024-01-15",
    avatar: "/placeholder.svg?height=32&width=32",
    dateOfBirth: "1985-06-15",
    department: "Management",
    joinDate: "2020-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin (Non-owner)",
    status: "active",
    lastLogin: "2024-01-14",
    avatar: "/placeholder.svg?height=32&width=32",
    dateOfBirth: "1990-03-22",
    department: "IT",
    joinDate: "2021-03-10",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Manager",
    status: "active",
    lastLogin: "2024-01-13",
    avatar: "/placeholder.svg?height=32&width=32",
    dateOfBirth: "1988-11-08",
    department: "Sales",
    joinDate: "2022-06-01",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "User",
    status: "inactive",
    lastLogin: "2024-01-10",
    avatar: "/placeholder.svg?height=32&width=32",
    dateOfBirth: "1992-09-14",
    department: "Marketing",
    joinDate: "2023-02-20",
  },
]

export function UsersTable() {
  const [showTransferDialog, setShowTransferDialog] = useState(false)
  const [userData, setUserData] = useState<User[]>(users)

  const currentOwner = userData.find((user) => user.role === "Admin (Owner)")
  const eligibleUsers = userData.filter((user) => user.role === "Admin (Non-owner)" || user.role === "Manager")

  const getRoleBadgeVariant = (role: string) => {
    if (role.includes("Owner")) return "default"
    if (role.includes("Admin")) return "secondary"
    if (role === "Manager") return "outline"
    return "secondary"
  }

  const handleExport = () => {
    console.log("Exporting users data...")
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => <SortableHeader column={column}>User</SortableHeader>,
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "role",
      header: ({ column }) => <SortableHeader column={column}>Role</SortableHeader>,
      cell: ({ row }) => {
        const role = row.getValue("role") as string
        return <Badge variant={getRoleBadgeVariant(role)}>{role}</Badge>
      },
    },
    {
      accessorKey: "department",
      header: ({ column }) => <SortableHeader column={column}>Department</SortableHeader>,
      cell: ({ row }) => <Badge variant="outline">{row.getValue("department")}</Badge>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return <Badge variant={status === "active" ? "default" : "secondary"}>{status}</Badge>
      },
    },
    {
      accessorKey: "joinDate",
      header: ({ column }) => <SortableHeader column={column}>Join Date</SortableHeader>,
      cell: ({ row }) => {
        const date = new Date(row.getValue("joinDate"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      accessorKey: "lastLogin",
      header: ({ column }) => <SortableHeader column={column}>Last Login</SortableHeader>,
      cell: ({ row }) => {
        const date = new Date(row.getValue("lastLogin"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original
        const isOwner = user.role.includes("Owner")

        return (
          <ActionDropdown
            onEdit={() => console.log("Edit", user.id)}
            onDelete={!isOwner ? () => console.log("Delete", user.id) : undefined}
            additionalActions={[
              {
                label: "Change role",
                onClick: () => console.log("Change role", user.id),
              },
              ...(isOwner
                ? [
                    {
                      label: "Transfer ownership",
                      onClick: () => setShowTransferDialog(true),
                      icon: <Crown className="h-4 w-4" />,
                    },
                  ]
                : []),
            ]}
          />
        )
      },
    },
  ]

  const filterableColumns = [
    {
      id: "role",
      title: "Role",
      options: [
        { label: "Admin (Owner)", value: "Admin (Owner)" },
        { label: "Admin (Non-owner)", value: "Admin (Non-owner)" },
        { label: "Manager", value: "Manager" },
        { label: "User", value: "User" },
      ],
    },
    {
      id: "status",
      title: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
    {
      id: "department",
      title: "Department",
      options: [
        { label: "Management", value: "Management" },
        { label: "IT", value: "IT" },
        { label: "Sales", value: "Sales" },
        { label: "Marketing", value: "Marketing" },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={userData}
        searchPlaceholder="Search users..."
        filterableColumns={filterableColumns}
        onExport={handleExport}
      />

      <TransferOwnershipDialog
        open={showTransferDialog}
        onOpenChange={setShowTransferDialog}
        currentOwner={currentOwner || null}
        eligibleUsers={eligibleUsers}
      />
    </div>
  )
}

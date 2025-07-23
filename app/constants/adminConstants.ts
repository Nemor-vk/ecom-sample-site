import { Boxes, ChartNoAxesCombined, CirclePercent, Layers, LayoutDashboard, Palette, ScanBarcode, Search, Settings, Settings2, UsersRound } from "lucide-react";

  // Admin Menu items.
  export const ADMIN_ITEMS = [
    {
      label: "DashBoard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Analytics",
      url: "/admin/analytics",
      icon: ChartNoAxesCombined,
    },
    {
      label: "Orders",
      url: "/admin/orders",
      icon: Boxes,
    },
    {
      label: "Products",
      url: "/admin/products",
      icon: ScanBarcode,
    },
    {
      label: "Categories",
      url: "/admin/categories",
      icon: Layers,
    },
    {
      label: "Discounts & Offers",
      url: "/admin/discounts",
      icon: CirclePercent,
    },
    {
      label: "Users & Roles",
      url: "/admin/user-roles",
      icon: UsersRound,
    },
    {
      label: "Site Content Editor",
      url: "/admin/site-editor",
      icon: Settings2,
    },
    {
      label: "Themes & UI",
      url: "/admin/site-theme",
      icon: Palette,
    },
    {
      label: "Search",
      url: "/admin/search",
      icon: Search,
    },
    {
      label: "Settings",
      url: "/admin/settings",
      icon: Settings,
    },
  ]
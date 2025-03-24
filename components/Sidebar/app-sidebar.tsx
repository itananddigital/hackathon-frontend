import {
  BookOpen,
  Bot,
  Folder,
  LayoutDashboard
} from "lucide-react"
import * as React from "react"

import { NavHeader } from "@/components/Sidebar/nav-header"
import { NavMain } from "@/components/Sidebar/nav-main"
import { NavUser } from "@/components/Sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Teams",
      url: "/teams",
      icon: Bot
    },
    {
      title: "Themes",
      url: "/themes",
      icon: BookOpen
    },
    {
      title: "Submission",
      url: "/submission",
      icon: Folder
    },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

"use client"

import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { getCookie, removeCookie, setCookie } from "@/utils/cookies"
import { redirect } from "next/navigation"
import Link from "next/link"
import { CONSTANTS } from "@/lib/api/app-config"

export function NavUser() {

  const { isMobile } = useSidebar()
  const fullname = getCookie('full_name')
  const name = decodeURIComponent(fullname) ?? ''
  const email = getCookie('email')
  const avatar = getCookie('avatar')
  const avatarURL = `${CONSTANTS.API_BASE_URL}${avatar}`

  const logout = () => {
    removeCookie('sid');
    removeCookie('token');
    removeCookie('api_key');
    removeCookie('avatar');
    setCookie('full_name', 'Guest');
    redirect('/');
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatarURL} alt={name} />
                <AvatarFallback className="rounded-lg">{name.toLocaleUpperCase().charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <p className="truncate font-medium">{name || ''}</p>
                <p className="truncate text-xs">{email || ''}</p>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatarURL} alt={name} />
                  <AvatarFallback className="rounded-lg">{name.toLocaleUpperCase().charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <BadgeCheck />
              <Link href="/profile">
                Account
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

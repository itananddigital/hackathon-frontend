"use client"

import { AppSidebar } from "@/components/Sidebar/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { publicRoutes } from "@/middleware"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { useState, useEffect } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Link from "next/link"

export const SideProvider = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const isPublicRoute = publicRoutes.includes(path)

  if (!isClient) return null

  return isPublicRoute ? (
    <>
      <PublicNav path={path} />
      {children}
    </>
  ) : (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between px-4 w-full">
            <SidebarTrigger className="ml-1" />
            <ThemeToggle />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

const ThemeToggle = () => {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {["light", "dark", "system"].map((theme) => (
          <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const PublicNav = ({ path }: { path: string }) => (
  <div>
    <nav className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
      <Link href="/" className="flex items-center">
        <span className="font-bold text-xl">Hackathon</span>
      </Link>
      <div className="flex items-center gap-4">
        {(path === "/" || path === "/register") && (
          <Link href="/login">
            <Button variant={path === "/" ? "ghost" : "default"} size="sm">
              Login
            </Button>
          </Link>
        )}
        {(path === "/" || path === "/login") && (
          <Link href="/register">
            <Button variant={path === "/login" ? "default" : path === '/' ? "default" : "ghost"} size="sm">
              Register
            </Button>
          </Link>
        )}
      </div>
    </nav>
  </div>
)
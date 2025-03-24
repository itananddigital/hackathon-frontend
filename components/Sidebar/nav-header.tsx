"use client"


import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
import Image from "next/image"
import favIcon from '../../public/icons/8848_Favicon_32x32-White.png'
import { Label } from "../ui/label"

export function NavHeader() {
    const { state } = useSidebar()
  
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Image src={favIcon} alt="Team 1" width={16} height={16} />
          {state !== 'collapsed' && <Label className="text-sm">Hackathon</Label>}
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

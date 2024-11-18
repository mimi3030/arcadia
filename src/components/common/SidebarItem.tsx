"use client"

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminSidebarItemProps {
	href: string
	text: string
}

export const AdminSidebarItem = (props: AdminSidebarItemProps) => {
	const pathname = usePathname()
	return (
		<SidebarMenuItem>
			<Link href={props.href}>
				<SidebarMenuButton isActive={pathname === props.href}>
					{props.text}
				</SidebarMenuButton>
			</Link>
		</SidebarMenuItem>
	)
}

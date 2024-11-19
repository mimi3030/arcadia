import { AdminSidebarItem } from "@/components/common/SidebarItem"
import { SignOutButton } from "@/components/common/SignOutButton"
import { ModeToggle } from "@/components/ui/mode-toggle"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
} from "@/components/ui/sidebar"

export const EmployeeSidebar = () => {
	return (
		<Sidebar>
			<SidebarHeader className="text-center font-bold text-xl">
				Arcadia pour Employé
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<AdminSidebarItem href="/employee/avis" text="Avis" />
							<AdminSidebarItem href="/employee/services" text="Services" />
							<AdminSidebarItem href="/employee/nourriture" text="Nourriture" />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<div className="flex w-full flex-row items-center justify-center gap-x-4">
					<SignOutButton />
					<ModeToggle />
				</div>
			</SidebarFooter>
		</Sidebar>
	)
}

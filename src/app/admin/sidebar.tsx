import { AdminSidebarItem } from "@/components/common/SidebarItem"
import { SignOutButton } from "@/components/common/SignOutButton"
import { ModeToggle } from "@/components/ui/mode-toggle"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
} from "@/components/ui/sidebar"

export const AdminSidebar = () => {
	return (
		<Sidebar>
			<SidebarHeader className="text-center font-bold text-xl">
				Arcadia pour Admin
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Dashboard</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<AdminSidebarItem href="/admin/visites" text="Visites" />
							<AdminSidebarItem href="/admin/rapports" text="Rapports" />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Utilisateurs</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<AdminSidebarItem href="/admin/roles" text="Rôles" />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Base de données</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<AdminSidebarItem href="/admin/services" text="Services" />
							<AdminSidebarItem href="/admin/habitats" text="Habitats" />
							<AdminSidebarItem href="/admin/animaux" text="Animaux" />
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

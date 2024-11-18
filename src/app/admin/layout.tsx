import { isAdmin } from "@/app/sign-in/actions"
import { AdminSidebar } from "@/app/admin/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"

interface AdminLayoutProps {
	children: ReactNode
}

export default async function AdminLayout(props: AdminLayoutProps) {
	if (!(await isAdmin())) {
		return redirect("/sign-in")
	}
	return (
		<SidebarProvider>
			<div className="flex h-screen w-full">
				<AdminSidebar />
				<main className="flex flex-1 flex-col">
					<SidebarTrigger />
					<ScrollArea className="mx-auto w-full max-w-screen-xl flex-1 px-8 ">
						{props.children}
					</ScrollArea>
				</main>
			</div>
		</SidebarProvider>
	)
}

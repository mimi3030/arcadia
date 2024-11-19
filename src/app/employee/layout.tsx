import { EmployeeSidebar } from "@/app/employee/sidebar"
import { getRoleForCurrentUser } from "@/app/sign-in/actions"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"

interface EmployeeLayoutProps {
	children: ReactNode
}

export default async function EmployeeLayout(props: EmployeeLayoutProps) {
	const role = await getRoleForCurrentUser()
	if (role !== "Employee") {
		return redirect("/sign-in")
	}
	return (
		<SidebarProvider>
			<div className="flex h-screen w-full">
				<EmployeeSidebar />
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

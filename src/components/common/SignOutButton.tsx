"use client"

import { Button } from "@/components/ui/button"
import { useClerk } from "@clerk/nextjs"
import { LogOut } from "lucide-react"

export const SignOutButton = () => {
	const { signOut } = useClerk()
	return (
		<Button
			onClick={() =>
				signOut({
					redirectUrl: "/",
				})
			}
			size="sm"
		>
			<LogOut size={12} />
			Deconnexion
		</Button>
	)
}

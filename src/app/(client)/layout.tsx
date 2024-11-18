import { Navigation } from "@/app/(client)/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ReactNode } from "react"

interface ClientLayoutProps {
	children: ReactNode
}

export default function ClientLayout(props: ClientLayoutProps) {
	return (
		<div className="flex h-screen w-screen flex-col">
			<header>
				<Navigation />
			</header>
			<ScrollArea className="flex-1" type="auto">
				{props.children}
			</ScrollArea>
		</div>
	)
}

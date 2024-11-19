"use client"

import { acceptAvis, revokeAvis } from "@/app/employee/avis/actions"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import type { Prisma } from "@prisma/client"
import { capitalCase } from "change-case"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface EmployeeAvisCardProps {
	avis: Prisma.AvisGetPayload<Record<string, never>>
}

export const EmployeeAvisCard = (props: EmployeeAvisCardProps) => {
	const router = useRouter()
	return (
		<Card key={props.avis.id}>
			<CardHeader>
				<CardTitle>{capitalCase(props.avis.pseudo)}</CardTitle>
				<CardDescription>{props.avis.commentaire}</CardDescription>
			</CardHeader>
			<CardFooter className="flex gap-x-2">
				<Button
					size="sm"
					onClick={async () => {
						await acceptAvis(props.avis.id)
						toast.success("Avis accepté")
						router.refresh()
					}}
				>
					Valider
				</Button>
				<Button
					size="sm"
					variant="destructive"
					onClick={() => {
						revokeAvis(props.avis.id)
						toast.error("Avis refusé")
						router.refresh()
					}}
				>
					Refuser
				</Button>
			</CardFooter>
		</Card>
	)
}

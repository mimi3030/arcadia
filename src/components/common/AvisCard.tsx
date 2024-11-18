import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import type { Prisma } from "@prisma/client"
import { capitalCase } from "change-case"

interface AvisCardProps {
	avis: Prisma.AvisGetPayload<Record<string, never>>
}

export const AvisCard = (props: AvisCardProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{capitalCase(props.avis.pseudo)}</CardTitle>
				<CardDescription>{props.avis.commentaire}</CardDescription>
			</CardHeader>
		</Card>
	)
}

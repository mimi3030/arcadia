import { Card } from "@/components/ui/card"
import type { Prisma } from "@prisma/client"
import Image from "next/image"

interface AdminAnimalVisiteStatProps {
	animal: Prisma.AnimalGetPayload<Record<string, never>>
	nbVisites: number
}

export const AdminAnimalVisiteStat = (props: AdminAnimalVisiteStatProps) => {
	const image = (() => {
		if (props.animal.images.length === 0) {
			return "https://placehold.co/100x100"
		}
		return props.animal.images[0]
	})()
	return (
		<Card className="flex gap-x-4 overflow-hidden">
			<div className="relative aspect-video w-[100px]">
				<Image
					src={image}
					alt={props.animal.prenom}
					fill={true}
					className="object-cover"
				/>
			</div>
			<div className="flex flex-1 flex-col items-center justify-center p-2">
				<p className="font-medium text-sm">{props.animal.prenom}</p>
				<p className="font-bold">{props.nbVisites} view(s)</p>
			</div>
		</Card>
	)
}

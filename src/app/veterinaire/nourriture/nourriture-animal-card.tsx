import { AnimalCard } from "@/components/common/AnimalCard"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import type { Prisma } from "@prisma/client"
import dayjs from "dayjs"

interface NourritureAnimalCardProps {
	animal: Prisma.AnimalGetPayload<{
		include: {
			race: true
			rapports: true
			nourritures: true
		}
	}>
}

export const NourritureAnimalCard = (props: NourritureAnimalCardProps) => {
	return (
		<Dialog>
			<DialogTrigger className="w-full text-left">
				<AnimalCard key={props.animal.id} animal={props.animal} />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Nourriture pour "{props.animal.prenom}"</DialogTitle>
					<DialogDescription />
				</DialogHeader>
				<div className="flex flex-col divide-y">
					{props.animal.nourritures.map((nourriture) => (
						<div key={nourriture.id} className="flex items-center gap-x-4 py-2">
							<span className="font-semibold">{nourriture.label}</span>
							<span className="font-light text-xs opacity-75">
								{dayjs(nourriture.date).format("DD/MM/YYYY HH:mm")}
							</span>
							<p className="ml-auto">{nourriture.grammage}g</p>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	)
}

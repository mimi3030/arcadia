import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import type { Prisma } from "@prisma/client"
import { sentenceCase } from "change-case"
import daysjs from "dayjs"

interface RapportCardProps {
	rapport: Prisma.RapportGetPayload<{
		include: {
			veterinaire: true
		}
	}>
}

export const RapportCard = (props: RapportCardProps) => {
	return (
		<Card>
			<CardHeader>
				<CardContent className="flex flex-col gap-y-2 p-0 text-sm">
					<p className="flex items-center gap-x-1">
						<span className="font-medium">Véterinaire: </span>
						<span className="opacity-75">
							{props.rapport.veterinaire.prenom} {props.rapport.veterinaire.nom}
						</span>
					</p>
					<p>
						<span className="font-medium">Date: </span>
						<span className="opacity-75">
							{daysjs(props.rapport.date).format("DD/MM/YYYY - HH:mm")}
						</span>
					</p>

					<p className="flex items-center gap-x-2">
						<span className="font-medium">Etat: </span>
						<span className="opacity-75">
							{sentenceCase(props.rapport.etat)}
						</span>
					</p>
					{props.rapport.detail && (
						<div>
							<Dialog>
								<DialogTrigger>Voir les détails</DialogTrigger>
								<DialogContent>
									<DialogTitle>
										Détails du rapport du{" "}
										{daysjs(props.rapport.date).format("DD/MM/YYYY à HH:mm")}{" "}
										par {props.rapport.veterinaire.prenom}{" "}
										{props.rapport.veterinaire.nom}
									</DialogTitle>
									<p>{props.rapport.detail}</p>
								</DialogContent>
							</Dialog>
						</div>
					)}
				</CardContent>
			</CardHeader>
		</Card>
	)
}

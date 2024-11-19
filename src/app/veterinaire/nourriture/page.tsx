import { NourritureAnimalCard } from "@/app/veterinaire/nourriture/nourriture-animal-card"
import { prismaClient } from "@/utils"

export default async function VeterinaireNourriturePage() {
	const animaux = await prismaClient.animal.findMany({
		include: {
			race: true,
			rapports: true,
			nourritures: {
				orderBy: {
					date: "desc",
				},
			},
		},
	})
	return (
		<div className="flex flex-col gap-y-8">
			<p className="font-bold text-xl">Animaux</p>
			<div className="grid w-full grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				{animaux.map((animal) => (
					<NourritureAnimalCard key={animal.id} animal={animal} />
				))}
			</div>
		</div>
	)
}

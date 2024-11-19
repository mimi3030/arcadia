import { RapportAnimalCard } from "@/app/veterinaire/rapports/rapport-animal-card"
import { prismaClient } from "@/utils"

export default async function VeterinaireRapportsPage() {
	const animaux = await prismaClient.animal.findMany({
		include: {
			habitat: true,
			race: true,
			rapports: true,
		},
	})
	return (
		<div className="flex flex-col gap-y-8">
			<p className="font-bold text-xl">Animaux</p>
			<div className="grid w-full grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				{animaux.map((animal) => (
					<RapportAnimalCard key={animal.id} animal={animal} />
				))}
			</div>
		</div>
	)
}

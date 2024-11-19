import { NourritureAnimalCard } from "@/app/employee/nourriture/nourriture-animal-card"
import { prismaClient } from "@/utils"

export default async function EmployeeNourriturePage() {
	const animaux = await prismaClient.animal.findMany({
		include: {
			race: true,
			rapports: true,
		},
	})

	return (
		<div className="flex flex-col gap-y-8">
			<h1 className="font-bold text-xl">Nourrir les animaux</h1>
			<div className="flex flex-col gap-y-4">
				<div className="grid w-full grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
					{animaux.map((animal) => (
						<NourritureAnimalCard key={animal.id} animal={animal} />
					))}
				</div>
			</div>
		</div>
	)
}

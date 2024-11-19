import { VeterinaireAvisHabitatCard } from "@/app/veterinaire/avis/avis-habitat-card"
import { prismaClient } from "@/utils"

export default async function VeterinaireAvisPage() {
	const habitats = await prismaClient.habitat.findMany()
	return (
		<div className="flex flex-col gap-y-8">
			<p className="font-bold text-xl">Animaux</p>
			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 2xl:grid-cols-3">
				{habitats.map((habitat) => (
					<VeterinaireAvisHabitatCard key={habitat.id} habitat={habitat} />
				))}
			</div>
		</div>
	)
}

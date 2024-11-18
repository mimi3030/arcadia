import { db } from "@/app/firebase/config"
import { AnimalPageCarousel } from "@/app/(client)/animal/carousel"
import { RapportCard } from "@/components/common/RapportCard"
import { Separator } from "@/components/ui/separator"
import { prismaClient } from "@/utils"
import { get, ref, set } from "firebase/database"
import { redirect } from "next/navigation"

interface AnimalPageProps {
	params: Promise<{ id: string }>
}

export default async function AnimalPage(props: AnimalPageProps) {
	const id = Number((await props.params).id)

	const visiteRef = ref(db, `visites/${id}`)
	const currentVisites = await get(visiteRef)

	if (!currentVisites.exists()) {
		await set(visiteRef, 1)
	} else {
		await set(visiteRef, currentVisites.val() + 1)
	}

	const animal = await prismaClient.animal.findFirst({
		where: {
			id,
		},
		include: {
			race: true,
			rapports: {
				include: {
					veterinaire: true,
				},
			},
		},
	})
	if (!animal) {
		return redirect("/404")
	}
	const rapportsSortedByDate = animal.rapports.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime()
	})
	const lastRapport = rapportsSortedByDate[0]
	const otherRapports = rapportsSortedByDate.slice(1)
	return (
		<div className="container mx-auto flex flex-col gap-y-16 py-8">
			<div className="flex flex-col gap-y-8 py-8 lg:flex-row lg:items-center lg:gap-x-16">
				<div className="w-full flex-[2]">
					<AnimalPageCarousel animal={animal} />
				</div>
				<div className="flex flex-1 flex-col gap-y-4">
					<div className="text-center">
						<p className="font-semibold text-2xl">{animal.prenom}</p>
						<p className="font-light text-sm">{animal.race.label}</p>
					</div>
					<RapportCard rapport={lastRapport} />
				</div>
			</div>
			<Separator />
			<div className="flex flex-col gap-y-4">
				<p className="font-semibold text-xl">Autres rapports</p>
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
					{otherRapports.map((rapport) => (
						<RapportCard key={rapport.id} rapport={rapport} />
					))}
				</div>
			</div>
		</div>
	)
}

import { AnimalCard } from "@/components/common/AnimalCard"
import type { Prisma } from "@prisma/client"
import Link from "next/link"

interface HabitatPageAnimauxProps {
	animaux: Prisma.AnimalGetPayload<{
		include: {
			images: true
			rapports: true
			race: true
		}
	}>[]
}

export const HabitatPageAnimaux = (props: HabitatPageAnimauxProps) => {
	return (
		<div className="flex flex-col gap-y-8">
			<p className="text-center font-semibold text-xl">Animaux</p>
			<div className="grid w-full grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
				{props.animaux.map((animal) => (
					<Link href={`/animal/${animal.id}`} key={animal.id}>
						<AnimalCard animal={animal} />
					</Link>
				))}
			</div>
		</div>
	)
}

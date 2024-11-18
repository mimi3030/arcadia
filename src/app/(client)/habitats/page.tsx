import { HabitatCard } from "@/components/common/HabitatCard"
import { prismaClient } from "@/utils"
import Link from "next/link"

export default async function HabitatPage() {
	const habitats = await prismaClient.habitat.findMany({})
	return (
		<div className="container mx-auto flex flex-col gap-y-8 py-8">
			<p className="text-center font-bold text-xl">Habitats</p>
			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 2xl:grid-cols-3">
				{habitats.map((habitat) => (
					<Link
						href={`/habitats/${habitat.id}`}
						key={habitat.id}
						className="cursor-pointer"
					>
						<HabitatCard habitat={habitat} />
					</Link>
				))}
			</div>
		</div>
	)
}

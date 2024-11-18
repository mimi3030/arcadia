import { HabitatCard } from "@/components/common/HabitatCard"
import { Button } from "@/components/ui/button"
import { prismaClient } from "@/utils"
import Link from "next/link"

export const Habitats = async () => {
	const habitats = await prismaClient.habitat.findMany({
		take: 3,
	})
	return (
		<div className="py-8">
			<div className="container mx-auto flex flex-col items-center gap-y-4">
				<p className="font-semibold text-xl">Habitats</p>
				<div className="flex w-full flex-col gap-x-4 gap-y-4 lg:flex-row">
					{habitats.map((habitat) => (
						<Link
							key={habitat.id}
							href={`/habitats/${habitat.id}`}
							className="w-full cursor-pointer"
						>
							<HabitatCard habitat={habitat} />
						</Link>
					))}
				</div>
				<Button variant="outline">
					<Link href="/habitats">Voir tous les habitats</Link>
				</Button>
			</div>
		</div>
	)
}

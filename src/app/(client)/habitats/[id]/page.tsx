import { HabitatPageAvisInput } from "@/app/(client)/habitats/[id]/avis-input"
import { HabitatAvisList } from "@/app/(client)/habitats/[id]/avis-list"
import { HabitatPageAnimaux } from "@/app/(client)/habitats/animaux"
import { HabitatPageCarousel } from "@/app/(client)/habitats/carousel"
import { Separator } from "@/components/ui/separator"
import { prismaClient } from "@/utils"
import { redirect } from "next/navigation"

interface HabitagePageProps {
	params: Promise<{ id: string }>
}

export default async function HabitatPage(props: HabitagePageProps) {
	const id = Number((await props.params).id)
	const habitat = await prismaClient.habitat.findFirst({
		where: {
			id,
		},
		include: {
			animaux: {
				include: {
					race: true,
					rapports: {
						take: 1,
						orderBy: {
							date: "desc",
						},
					},
				},
			},
		},
	})
	if (!habitat) {
		return redirect("/404")
	}
	return (
		<div className="container mx-auto flex flex-col gap-y-16 py-8">
			<div className="flex flex-col gap-y-8 py-8 lg:flex-row lg:gap-x-16">
				<div className="flex-1">
					<HabitatPageCarousel habitat={habitat} />
				</div>
				<div className="flex flex-1 flex-col justify-center gap-y-4 text-center lg:text-left">
					<p className="font-semibold text-xl">{habitat.nom}</p>
					<p className="font-light italic leading-8 opacity-75">
						{habitat.description}
					</p>
				</div>
			</div>
			<Separator />
			<div>
				<HabitatPageAnimaux animaux={habitat.animaux} />
			</div>
			<div>
				<HabitatPageAvisInput habitatId={habitat.id} />
			</div>
			<div>
				<HabitatAvisList habitatId={habitat.id} />
			</div>
		</div>
	)
}

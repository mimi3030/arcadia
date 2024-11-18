import { AvisCard } from "@/components/common/AvisCard"
import { prismaClient } from "@/utils"

interface HabitatAvisListProps {
	habitatId: number
}

export const HabitatAvisList = async (props: HabitatAvisListProps) => {
	const aviss = await prismaClient.avis.findMany({
		where: {
			isVisible: true,
			habitatId: props.habitatId,
		},
		orderBy: {
			id: "desc",
		},
	})
	return (
		<div className="grid w-full grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-3">
			{aviss.map((avis) => (
				<AvisCard key={avis.id} avis={avis} />
			))}
		</div>
	)
}

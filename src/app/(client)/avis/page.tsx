import { AvisCard } from "@/components/common/AvisCard"
import { prismaClient } from "@/utils"

export default async function AvisPage() {
	const aviss = await prismaClient.avis.findMany({
		where: {
			isVisible: true,
		},
		orderBy: {
			id: "desc",
		},
	})
	return (
		<div className="container mx-auto py-8">
			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 2xl:grid-cols-3">
				{aviss.map((avis) => (
					<AvisCard key={avis.id} avis={avis} />
				))}
			</div>
		</div>
	)
}

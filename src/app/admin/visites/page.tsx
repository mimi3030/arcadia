import { AdminVisiteAnimauxStats } from "@/app/admin/visites/stats"
import { prismaClient } from "@/utils"

export default async function AdminVisitePage() {
	const animaux = await prismaClient.animal.findMany()
	return (
		<div className="flex flex-col gap-y-8">
			<h1 className="font-bold text-xl">Statistiques des visites par animal</h1>
			<AdminVisiteAnimauxStats animaux={animaux} />
		</div>
	)
}

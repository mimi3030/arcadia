import { EmployeeAvisCard } from "@/app/employee/avis/avis-card"
import { prismaClient } from "@/utils"

export default async function EmployeeAvisPage() {
	const aviss = await prismaClient.avis.findMany({
		where: {
			isVisible: false,
		},
	})
	return (
		<div className="flex flex-col gap-y-8">
			<h1 className="font-bold text-xl">Avis à valider</h1>
			{aviss.length === 0 && <p>Aucun avis à valider</p>}
			<div className="flex flex-col gap-y-4">
				{aviss.map((avis) => (
					<EmployeeAvisCard key={avis.id} avis={avis} />
				))}
			</div>
		</div>
	)
}

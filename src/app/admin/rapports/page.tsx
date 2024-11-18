import { rapportColums } from "@/app/admin/rapports/columns"
import { DataTable } from "@/app/admin/rapports/data-table"
import { prismaClient } from "@/utils"

export default async function AdminRapportPage() {
	const rapports = await prismaClient.rapport.findMany({
		include: {
			animal: true,
			veterinaire: true,
		},
	})
	return (
		<div className="flex flex-col gap-y-8">
			<h1 className="font-bold text-xl">Rapports</h1>
			<DataTable columns={rapportColums} data={rapports} />
		</div>
	)
}

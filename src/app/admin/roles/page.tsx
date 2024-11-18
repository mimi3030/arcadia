import { Add } from "@/app/admin/roles/add"
import { utilisateurColumns } from "@/app/admin/roles/columns"
import { DataTable } from "@/app/admin/roles/data-table"
import { prismaClient } from "@/utils"

export default async function AdminRolePage() {
	const utilisateurs = await prismaClient.utilisateur.findMany()
	return (
		<div className="flex flex-col gap-y-8">
			<div className="flex items-center">
				<h1 className="font-bold text-xl">Roles</h1>
				<div className="ml-auto">
					<Add />
				</div>
			</div>
			<DataTable columns={utilisateurColumns} data={utilisateurs} />
		</div>
	)
}

import { Add } from "@/app/admin/services/add"
import { prismaClient } from "@/utils"
import { serviceColums } from "@/app/admin/services/columns"
import { DataTable } from "@/app/admin/services/data-table"

export default async function AdminServicePage() {
	const services = await prismaClient.service.findMany()
	return (
		<div className="flex flex-col gap-y-8">
			<div className="flex items-center">
				<h1 className="font-bold text-xl">Services</h1>
				<div className="ml-auto">
					<Add />
				</div>
			</div>
			<DataTable columns={serviceColums} data={services} />
		</div>
	)
}

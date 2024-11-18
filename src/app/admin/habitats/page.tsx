import { AddUpdateDialogContent } from "@/app/admin/habitats/add-update-dialog-content"
import { habitatColums } from "@/app/admin/habitats/columns"
import { DataTable } from "@/app/admin/habitats/data-table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { prismaClient } from "@/utils"
import { Plus } from "lucide-react"

export default async function AdminHabitatPage() {
	const habitats = await prismaClient.habitat.findMany()
	return (
		<div className="flex flex-col gap-y-8">
			<div className="flex items-center">
				<h1 className="font-bold text-xl">Habitat</h1>
				<div className="ml-auto">
					<Dialog>
						<DialogTrigger asChild={true}>
							<Button size="sm">
								<Plus />
								Ajouter un habitat
							</Button>
						</DialogTrigger>
						<AddUpdateDialogContent type="create" />
					</Dialog>
				</div>
			</div>
			<DataTable columns={habitatColums} data={habitats} />
		</div>
	)
}

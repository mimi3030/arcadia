import { AddUpdateDialogContent } from "@/app/admin/animaux/add-update-dialog-content"
import { DataTableConfig } from "@/app/admin/animaux/data-table-config"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { prismaClient } from "@/utils"
import { Plus } from "lucide-react"

export default async function AdminAnimauxPage() {
	const animaux = await prismaClient.animal.findMany({
		include: {
			habitat: true,
			race: true,
		},
	})
	const habitats = await prismaClient.habitat.findMany()
	const races = await prismaClient.race.findMany()
	return (
		<div className="flex flex-col gap-y-8">
			<div className="flex items-center">
				<h1 className="font-bold text-xl">Animaux</h1>
				<div className="ml-auto">
					<Dialog>
						<DialogTrigger asChild={true}>
							<Button size="sm">
								<Plus />
								Ajouter un animal
							</Button>
						</DialogTrigger>
						<AddUpdateDialogContent
							type="create"
							habitats={habitats}
							races={races}
						/>
					</Dialog>
				</div>
			</div>
			<DataTableConfig animaux={animaux} habitats={habitats} races={races} />
		</div>
	)
}

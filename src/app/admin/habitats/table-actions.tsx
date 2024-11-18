import { deleteHabitat } from "@/app/admin/habitats/actions"
import { AddUpdateDialogContent } from "@/app/admin/habitats/add-update-dialog-content"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import type { Prisma } from "@prisma/client"
import { Edit, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface TableActionsProps {
	habitat: Prisma.HabitatGetPayload<Record<string, never>>
}

export const TableActions = (props: TableActionsProps) => {
	const router = useRouter()
	return (
		<div className="flex items-center gap-x-2">
			<Dialog>
				<DialogTrigger asChild={true}>
					<Button size="icon" variant="ghost">
						<Edit />
					</Button>
				</DialogTrigger>
				<AddUpdateDialogContent type="update" habitat={props.habitat} />
			</Dialog>
			<AlertDialog>
				<AlertDialogTrigger asChild={true}>
					<Button size="icon" variant="ghost">
						<Trash />
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Supprimer l'habitat "{props.habitat.nom}" ?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Cette action est irréversible.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Annuler</AlertDialogCancel>
						<AlertDialogAction
							onClick={async () => {
								await deleteHabitat(props.habitat.id)
								toast.success("Habitat supprimé")
								router.refresh()
							}}
						>
							Supprimer
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}

"use client"

import { deleteAnimal } from "@/app/admin/animaux/actions"
import { AddUpdateDialogContent } from "@/app/admin/animaux/add-update-dialog-content"
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
	animal: Prisma.AnimalGetPayload<Record<string, never>>
	races: Prisma.RaceGetPayload<Record<string, never>>[]
	habitats: Prisma.HabitatGetPayload<Record<string, never>>[]
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
				<AddUpdateDialogContent
					type="update"
					animal={props.animal}
					habitats={props.habitats}
					races={props.races}
				/>
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
							Supprimer l'animal "{props.animal.prenom}" ?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Cette action est irréversible.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Annuler</AlertDialogCancel>
						<AlertDialogAction
							onClick={async () => {
								await deleteAnimal(props.animal.id)
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

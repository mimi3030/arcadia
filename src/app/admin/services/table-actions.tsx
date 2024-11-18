import { deleteService, updateService } from "@/app/admin/services/actions"
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
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Prisma } from "@prisma/client"
import { Edit, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export const formServiceSchema = z.object({
	nom: z
		.string()
		.min(3, {
			message: "Le nom doit contenir au moins 3 caractères",
		})
		.max(255, {
			message: "Le nom doit contenir au maximum 255 caractères",
		}),
	description: z
		.string()
		.min(3, {
			message: "La description doit contenir au moins 3 caractères",
		})
		.max(255, {
			message: "La description doit contenir au maximum 255 caractères",
		}),
})

interface AdminServiceActionsProps {
	service: Prisma.ServiceGetPayload<Record<string, never>>
}

export const TableActions = (props: AdminServiceActionsProps) => {
	const router = useRouter()
	const form = useForm<z.infer<typeof formServiceSchema>>({
		resolver: zodResolver(formServiceSchema),
		defaultValues: {
			nom: props.service.nom,
			description: props.service.description,
		},
	})
	const [openDialog, setOpenDialog] = useState(false)
	return (
		<div>
			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogTrigger asChild={true}>
					<Button size="icon" variant="ghost">
						<Edit />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Modifier le service "{props.service.nom}"</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(async (values) => {
								await updateService(
									props.service.id,
									values.nom,
									values.description,
								)
								toast.success("Service mis à jour")
								router.refresh()
								setOpenDialog(false)
							})}
							className="flex flex-col gap-4"
						>
							<FormField
								control={form.control}
								name="nom"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nom</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea {...field} rows={10} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button type="submit" className="ml-auto">
									Modifier
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
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
							Supprimer le service "{props.service.nom}" ?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Cette action est irréversible.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Annuler</AlertDialogCancel>
						<AlertDialogAction
							onClick={async () => {
								await deleteService(props.service.id)
								toast.success("Service supprimé")
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

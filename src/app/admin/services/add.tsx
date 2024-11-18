"use client"

import { addService } from "@/app/admin/services/actions"
import { formServiceSchema } from "@/app/admin/services/table-actions"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
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
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

export const Add = () => {
	const router = useRouter()
	const form = useForm<z.infer<typeof formServiceSchema>>({
		resolver: zodResolver(formServiceSchema),
		defaultValues: {
			nom: "",
			description: "",
		},
	})
	return (
		<Dialog>
			<DialogTrigger asChild={true}>
				<Button size="sm">
					<Plus />
					Créer un service
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Ajouter un service</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(async (values) => {
							await addService(values.nom, values.description)
							toast.success("Service ajouté")
							router.refresh()
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
							<DialogClose asChild={true}>
								<Button type="submit" className="ml-auto">
									Créer
								</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

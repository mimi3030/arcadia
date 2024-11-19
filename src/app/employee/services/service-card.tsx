"use client"

import { updateService } from "@/app/admin/services/actions"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
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
import type { Prisma } from "@prisma/client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

interface ServiceCardProps {
	service: Prisma.ServiceGetPayload<Record<string, never>>
}

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

export const EmployeeServiceCard = (props: ServiceCardProps) => {
	const form = useForm<z.infer<typeof formServiceSchema>>({
		resolver: zodResolver(formServiceSchema),
		defaultValues: {
			nom: props.service.nom,
			description: props.service.description,
		},
	})
	const router = useRouter()
	return (
		<Card>
			<CardHeader>
				<CardTitle>{props.service.nom}</CardTitle>
				<CardDescription>{props.service.description}</CardDescription>
			</CardHeader>
			<CardFooter>
				<Dialog>
					<DialogTrigger asChild={true}>
						<Button size="sm">Modifier</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								Modifier le service "{props.service.nom}"
							</DialogTitle>
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
											Modifier
										</Button>
									</DialogClose>
								</DialogFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</CardFooter>
		</Card>
	)
}

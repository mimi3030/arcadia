"use client"

import { createAvis } from "@/app/veterinaire/avis/actions"
import { HabitatCard } from "@/components/common/HabitatCard"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
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
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Prisma } from "@prisma/client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface AvisHabitatCardProps {
	habitat: Prisma.HabitatGetPayload<Record<string, never>>
}

const formAvisSchema = z.object({
	commentaire: z
		.string()
		.min(2, {
			message: "Le commentaire doit contenir au moins 2 caractères",
		})
		.max(5000, {
			message: "Le commentaire doit contenir au plus 500 caractères",
		}),
})

export const VeterinaireAvisHabitatCard = (props: AvisHabitatCardProps) => {
	const form = useForm<z.infer<typeof formAvisSchema>>({
		resolver: zodResolver(formAvisSchema),
		defaultValues: {
			commentaire: "",
		},
	})
	const [open, setOpen] = useState(false)
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<HabitatCard habitat={props.habitat} />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Avis pour "{props.habitat.nom}"</DialogTitle>
					<DialogDescription />
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(async (values) => {
							await createAvis({
								commentaire: values.commentaire,
								habitatId: props.habitat.id,
							})
						})}
					>
						<FormField
							name="commentaire"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Commentaire</FormLabel>
									<FormControl>
										<Textarea {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit">Envoyer</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

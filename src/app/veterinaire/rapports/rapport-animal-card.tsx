"use client"

import { addRapport } from "@/app/veterinaire/rapports/actions"
import { AnimalCard } from "@/components/common/AnimalCard"
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { EtatAnimal, type Prisma } from "@prisma/client"
import { EtatAnimalSchema } from "@prisma/generated/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

interface RapportAnimalCardProps {
	animal: Prisma.AnimalGetPayload<{
		include: {
			race: true
			rapports: true
		}
	}>
}

const formRapportSchema = z.object({
	etat: EtatAnimalSchema,
	detail: z
		.string()
		.min(5, "Le détail du rapport doit contenir au moins 5 caractères"),
})

export const RapportAnimalCard = (props: RapportAnimalCardProps) => {
	const form = useForm<z.infer<typeof formRapportSchema>>({
		resolver: zodResolver(formRapportSchema),
		defaultValues: {
			etat: "BonneSante",
		},
	})
	const router = useRouter()
	const [open, setOpen] = useState(false)
	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger className="w-full text-left">
					<AnimalCard key={props.animal.id} animal={props.animal} />
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Rapport pour "{props.animal.prenom}"</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(async (values) => {
								await addRapport({
									animalId: props.animal.id,
									etat: values.etat,
									detail: values.detail,
								})
								toast.success("Rapport ajouté")
								router.refresh()
								setOpen(false)
							})}
							className="flex flex-col gap-4"
						>
							<FormField
								control={form.control}
								name="etat"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Etat</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Sélectionner un état" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(EtatAnimal).map((etat) => (
													<SelectItem key={etat} value={etat}>
														{etat}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="detail"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Détail
											<span className="text-sm">(optionnel)</span>
										</FormLabel>
										<FormControl>
											<Textarea {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button type="submit" className="ml-auto">
									Ajouter
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	)
}

"use client"

import { addNourriture } from "@/app/employee/nourriture/actions"
import { AnimalCard } from "@/components/common/AnimalCard"
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
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Prisma } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

interface NourritureAnimalCardProps {
	animal: Prisma.AnimalGetPayload<{
		include: {
			race: true
			rapports: true
		}
	}>
}

const formNourritureSchema = z.object({
	label: z.string().min(3, {
		message: "Le label doit contenir au moins 3 caractères",
	}),
	grammage: z.string().min(1, {
		message: "La quantité doit être supérieure à 0",
	}),
})

export const NourritureAnimalCard = (props: NourritureAnimalCardProps) => {
	const form = useForm<z.infer<typeof formNourritureSchema>>({
		resolver: zodResolver(formNourritureSchema),
		defaultValues: {
			label: "",
			grammage: "0",
		},
	})
	const router = useRouter()
	const [open, setOpen] = useState(false)
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className="w-full text-left">
				<AnimalCard key={props.animal.id} animal={props.animal} />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Nourrir "{props.animal.prenom}"</DialogTitle>
					<DialogDescription />
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(async (values) => {
							await addNourriture({
								label: values.label,
								grammage: Number(values.grammage),
								animalId: props.animal.id,
							})
							toast.success("Animal nourri")
							router.refresh()
							setOpen(false)
						})}
						className="flex flex-col gap-4"
					>
						<FormField
							control={form.control}
							name="label"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="grammage"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Grammage</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit" className="ml-auto">
								Nourrir
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

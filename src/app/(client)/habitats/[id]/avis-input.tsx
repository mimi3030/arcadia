"use client"

import { createAvis } from "@/app/(client)/habitats/[id]/actions"
import { Button } from "@/components/ui/button"
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
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const formSchema = z.object({
	pseudo: z
		.string()
		.min(3, {
			message: "Le pseudo doit contenir au moins 3 caractères",
		})
		.max(20, {
			message: "Le pseudo doit contenir au plus 20 caractères",
		}),
	commentaire: z
		.string()
		.min(2, {
			message: "Le commentaire doit contenir au moins 2 caractères",
		})
		.max(500, {
			message: "Le commentaire doit contenir au plus 500 caractères",
		}),
})

interface HabitatPageAvisProps {
	habitatId: number
}

export const HabitatPageAvisInput = (props: HabitatPageAvisProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			pseudo: "",
			commentaire: "",
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		await createAvis({
			pseudo: values.pseudo,
			commentaire: values.commentaire,
			habitatId: props.habitatId,
		})
		form.reset()
		toast.success("Avis envoyé")
	}

	return (
		<div className="flex flex-col gap-y-4">
			<p className="text-center font-semibold text-xl">Laisser un avis</p>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-y-4"
				>
					<FormField
						control={form.control}
						name="pseudo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Pseudo</FormLabel>
								<FormControl>
									<Input placeholder="Pseudo" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="commentaire"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Commentaire</FormLabel>
								<FormControl>
									<Textarea placeholder="Commentaire" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Envoyer</Button>
					<p className="text-center font-light text-xs italic opacity-75">
						Les avis sont modérés avant d'être publiés.
					</p>
				</form>
			</Form>
		</div>
	)
}

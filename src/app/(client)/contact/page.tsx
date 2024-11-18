"use client"

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
import { z } from "zod"

const contactFormSchema = z.object({
	titre: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
	email: z.string().email(),
	message: z.string().min(3, "Le message doit contenir au moins 3 caractères"),
})

export default function ContactPage() {
	const form = useForm<z.infer<typeof contactFormSchema>>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			titre: "",
			email: "",
			message: "",
		},
	})
	return (
		<div className="container mx-auto flex flex-col gap-y-8 py-8">
			<p className="text-center font-bold text-xl">Contactez nous</p>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(() => {
						toast.success("Message envoyé")
					})}
					className="flex flex-col gap-y-4"
				>
					<FormField
						control={form.control}
						name="titre"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Pseudo</FormLabel>
								<FormControl>
									<Input placeholder="Titre" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Mail" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Message</FormLabel>
								<FormControl>
									<Textarea placeholder="Message" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Envoyer</Button>
				</form>
			</Form>
		</div>
	)
}

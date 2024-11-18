"use client"

import { addUtilisateur } from "@/app/admin/roles/actions"
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { isClerkAPIResponseError } from "@clerk/nextjs/errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { RoleEnum } from "@prisma/client"
import { RoleEnumSchema } from "@prisma/generated/zod"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formUtilisateurSchema = z.object({
	nom: z
		.string()
		.min(3, {
			message: "Le nom doit contenir au moins 3 caractères",
		})
		.max(255, {
			message: "Le nom doit contenir au maximum 255 caractères",
		}),
	prenom: z
		.string()
		.min(3, {
			message: "Le prénom doit contenir au moins 3 caractères",
		})
		.max(255, {
			message: "Le prénom doit contenir au maximum 255 caractères",
		}),
	role: RoleEnumSchema,
	email: z.string().email({
		message: "L'email doit être valide",
	}),
	password: z.string().min(6, {
		message: "Le mot de passe doit contenir au moins 6 caractères",
	}),
})

export const Add = () => {
	const router = useRouter()
	const form = useForm<z.infer<typeof formUtilisateurSchema>>({
		resolver: zodResolver(formUtilisateurSchema),
		defaultValues: {
			nom: "",
			prenom: "",
			email: "",
			password: "",
		},
	})
	const [openDialog, setOpenDialog] = useState(false)
	return (
		<Dialog open={openDialog} onOpenChange={setOpenDialog}>
			<DialogTrigger asChild={true}>
				<Button size="sm">
					<Plus />
					Créer un utilisateur
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Ajouter un utilisateur</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(async (values) => {
							const addUtilisateurRes = await addUtilisateur({
								nom: values.nom,
								prenom: values.prenom,
								email: values.email,
								password: values.password,
								role: values.role,
							})
							if (addUtilisateurRes.status === "error") {
								if (!isClerkAPIResponseError(addUtilisateurRes.error)) {
									toast.error(
										"Erreur lors de l'ajout de l'utilisateur, vérifiez les champs",
									)
									return
								}
								for (const error of addUtilisateurRes.error.errors) {
									if (error.code === "form_password_pwned") {
										toast.error("Le mot de passe est trop faible")
										return
									}
									if (error.code === "email_address_exists_code") {
										toast.error("L'email existe déjà")
										return
									}
								}
								toast.error("Erreur inconnue")
								return
							}
							toast.success("Utilisateur ajouté")
							form.reset()
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
							name="prenom"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Prénom</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Rôle</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger>
												<SelectValue placeholder="Sélectionner un rôle" />
											</SelectTrigger>
											<SelectContent>
												{Object.values(RoleEnum).map((role) => (
													<SelectItem key={role} value={role}>
														{role}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
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
										<Input {...field} type="email" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mot de passe</FormLabel>
									<FormControl>
										<Input {...field} type="password" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit" className="ml-auto">
								Créer
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

"use client"

import { uploadImages } from "@/app/actions"
import { addHabitat, updateHabitat } from "@/app/admin/habitats/actions"
import { InputImages } from "@/components/common/InputImages"
import { Button } from "@/components/ui/button"
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Prisma } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formHabitatSchema = z.object({
	nom: z
		.string()
		.min(3, {
			message: "Le nom doit contenir au moins 3 caractères",
		})
		.max(255, {
			message: "Le nom doit contenir au plus 255 caractères",
		}),
	description: z
		.string()
		.min(3, {
			message: "La description doit contenir au moins 3 caractères",
		})
		.max(5000, {
			message: "La description doit contenir au plus 255 caractères",
		}),
	images: z.instanceof(File).array(),
})

type AddUpdateDialogContentProps =
	| {
			type: "create"
	  }
	| {
			type: "update"
			habitat: Prisma.HabitatGetPayload<Record<string, never>>
	  }

export const AddUpdateDialogContent = (props: AddUpdateDialogContentProps) => {
	const defaultValues = (() => {
		switch (props.type) {
			case "create":
				return {
					nom: "",
					description: "",
				}
			case "update":
				return {
					nom: props.habitat.nom,
					description: props.habitat.description,
					images: [],
				}
		}
	})()

	const form = useForm<z.infer<typeof formHabitatSchema>>({
		resolver: zodResolver(formHabitatSchema),
		defaultValues,
	})

	const [urlImages, setUrlImages] = useState<string[]>(
		(() => {
			switch (props.type) {
				case "create":
					return []
				case "update":
					return props.habitat.images
			}
		})(),
	)

	const router = useRouter()

	return (
		<DialogContent className="p-0">
			<DialogHeader className="px-4 pt-4">
				<DialogTitle>
					{
						{
							create: "Ajouter un habitat",
							update: "Modifier un habitat",
						}[props.type]
					}
				</DialogTitle>
				<DialogDescription />
			</DialogHeader>
			<ScrollArea className="max-h-[60dvh]">
				<Form {...form}>
					<form
						className="flex flex-col gap-y-4 px-4 pb-4"
						onSubmit={form.handleSubmit(async (values) => {
							const imagesFormData = new FormData()
							for (const image of values.images) {
								imagesFormData.append("images", image)
							}
							const newUrlImages = await uploadImages(imagesFormData, "images")
							switch (props.type) {
								case "create": {
									await addHabitat(values.nom, values.description, newUrlImages)
									toast.success("Habitat ajouté")
									break
								}
								case "update": {
									const allUrlImages = [...urlImages, ...newUrlImages]
									await updateHabitat(
										props.habitat.id,
										values.nom,
										values.description,
										allUrlImages,
									)
									toast.success("Habitat mis à jour")
									break
								}
							}
							router.refresh()
						})}
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
						<FormField
							control={form.control}
							name="images"
							render={() => (
								<FormItem>
									<FormLabel>Images</FormLabel>
									<FormControl>
										<InputImages
											files={form.getValues("images")}
											setFiles={(files) => {
												form.setValue("images", files)
											}}
											urlImages={urlImages}
											setUrlImages={setUrlImages}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogClose asChild={true}>
							<Button
								type="submit"
								className="ml-auto"
								disabled={form.formState.isSubmitting}
							>
								{
									{
										create: "Ajouter",
										update: "Modifier",
									}[props.type]
								}
							</Button>
						</DialogClose>
					</form>
				</Form>
			</ScrollArea>
		</DialogContent>
	)
}

"use client"

import { uploadImages } from "@/app/actions"
import { addAnimal, updateAnimal } from "@/app/admin/animaux/actions"
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Prisma } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formAnimalSchema = z.object({
	prenom: z
		.string()
		.min(3, {
			message: "Le nom doit contenir au moins 3 caractères",
		})
		.max(255, {
			message: "Le nom doit contenir au plus 255 caractères",
		}),
	habitatId: z.string(),
	raceId: z.string(),
	images: z.instanceof(File).array(),
})

type AddUpdateDialogContentProps = {
	habitats: Prisma.HabitatGetPayload<Record<string, never>>[]
	races: Prisma.RaceGetPayload<Record<string, never>>[]
} & (
	| {
			type: "create"
	  }
	| {
			type: "update"
			animal: Prisma.AnimalGetPayload<Record<string, never>>
	  }
)

export const AddUpdateDialogContent = (props: AddUpdateDialogContentProps) => {
	const defaultValues = (() => {
		switch (props.type) {
			case "create":
				return {
					prenom: "",
					habitatId: "",
					raceId: "",
					images: [],
				}
			case "update":
				return {
					prenom: props.animal.prenom,
					habitatId: String(props.animal.habitatId),
					raceId: String(props.animal.raceId),
					images: [],
				}
		}
	})()

	const form = useForm<z.infer<typeof formAnimalSchema>>({
		resolver: zodResolver(formAnimalSchema),
		defaultValues,
	})

	const [urlImages, setUrlImages] = useState<string[]>(
		(() => {
			switch (props.type) {
				case "create":
					return []
				case "update":
					return props.animal.images
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
							create: "Ajouter un animal",
							update: "Modifier un animal",
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
									await addAnimal({
										prenom: values.prenom,
										habitatId: Number(values.habitatId),
										raceId: Number(values.raceId),
										images: newUrlImages,
									})
									toast.success("Animal ajouté")
									break
								}
								case "update": {
									const allUrlImages = [...urlImages, ...newUrlImages]
									await updateAnimal({
										id: props.animal.id,
										prenom: values.prenom,
										habitatId: Number(values.habitatId),
										raceId: Number(values.raceId),
										images: allUrlImages,
									})
									toast.success("Animal mis à jour")
									break
								}
							}
							router.refresh()
						})}
					>
						<FormField
							control={form.control}
							name="prenom"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Prenom</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="habitatId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Habitat</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Choisir un habitat" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{props.habitats.map((habitat) => (
												<SelectItem key={habitat.id} value={String(habitat.id)}>
													{habitat.nom}
												</SelectItem>
											))}
										</SelectContent>
										<FormMessage />
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="raceId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Race</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Choisir un habitat" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{props.races.map((race) => (
												<SelectItem key={race.id} value={String(race.id)}>
													{race.label}
												</SelectItem>
											))}
										</SelectContent>
										<FormMessage />
									</Select>
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

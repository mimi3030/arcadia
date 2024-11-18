"use server"

import { put } from "@vercel/blob"

export const uploadImages = async (formData: FormData, key: string) => {
	const images = formData.getAll(key) as File[]
	const urls = await Promise.all(
		images.map(async (image) => {
			const blob = await put(image.name, image, {
				access: "public",
			})
			return blob.url
		}),
	)
	return urls
}

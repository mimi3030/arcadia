import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImagePlus, X } from "lucide-react"
import Image from "next/image"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

interface ImagePreviewItemProps {
	url: string
	actionWhenX: () => void
}

const ImagePreviewItem = (props: ImagePreviewItemProps) => {
	return (
		<div className="relative">
			<Image
				src={props.url}
				alt="Uploaded"
				width={400}
				height={400}
				className="max-h-[400px] rounded-lg object-cover"
				quality={25}
			/>
			<Button
				size="icon"
				className="absolute top-2 right-2 scale-75"
				onClick={(e) => {
					e.stopPropagation()
					props.actionWhenX()
				}}
			>
				<X />
			</Button>
		</div>
	)
}

interface InputImagesProps {
	urlImages: string[]
	setUrlImages: (urlImages: string[]) => void
	files: File[]
	setFiles: (files: File[]) => void
}

export const InputImages = (props: InputImagesProps) => {
	const [previews, setPreviews] = useState<
		{
			url: string
			file: File
		}[]
	>([])
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			try {
				for (const file of acceptedFiles) {
					const reader = new FileReader()
					reader.onload = () => {
						setPreviews((prev) => {
							if (typeof reader.result === "string") {
								return [...prev, { url: reader.result, file }]
							}
							return prev
						})
						props.setFiles(acceptedFiles)
					}
					reader.readAsDataURL(file)
				}
			} catch {
				setPreviews([])
			}
		},
		[props.setFiles],
	)

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
	})
	return (
		<div className="flex flex-col gap-y-4">
			<div className="mx-auto flex w-full flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground/10 p-4">
				<p>Anciennes images</p>
				{props.urlImages.map((url, index) => (
					<ImagePreviewItem
						key={index}
						url={url}
						actionWhenX={() => {
							const urlImagesFiltered = props.urlImages.filter(
								(it) => it !== url,
							)
							props.setUrlImages(urlImagesFiltered)
						}}
					/>
				))}
			</div>
			<div
				{...getRootProps()}
				className="mx-auto flex w-full cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground/10 p-4"
			>
				<p>Nouvelles images</p>
				{previews.map((preview, index) => (
					<ImagePreviewItem
						key={index}
						url={preview.url}
						actionWhenX={() => {
							const previewFiltered = previews.filter(
								(it) => it.url !== preview.url,
							)
							setPreviews(previewFiltered)
							props.setFiles(previewFiltered.map((it) => it.file))
						}}
					/>
				))}
				<ImagePlus className={`size-40 ${previews ? "hidden" : "block"}`} />
				<Input {...getInputProps()} type="file" />
				{isDragActive ? (
					<p>Glisser déposer l'image ici</p>
				) : (
					<p>Cliquez ou glissez-déposez pour ajouter une image</p>
				)}
			</div>
		</div>
	)
}

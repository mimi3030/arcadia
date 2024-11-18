"use client"

import { CarouselIndicator } from "@/components/common/CarouselIndicator"
import {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel"
import type { Prisma } from "@prisma/client"
import { useState } from "react"
import Image from "next/image"

interface AnimalPageCarouselProps {
	animal: Prisma.AnimalGetPayload<Record<string, never>>
}

export const AnimalPageCarousel = (props: AnimalPageCarouselProps) => {
	const [api, setApi] = useState<CarouselApi>()
	return (
		<Carousel setApi={setApi}>
			<CarouselContent>
				{props.animal.images.map((image) => (
					<CarouselItem key={image}>
						<div className="relative aspect-video w-full">
							<Image
								src={image}
								alt={props.animal.prenom}
								className="rounded-[--radius] object-cover"
								fill={true}
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselIndicator api={api} />
		</Carousel>
	)
}

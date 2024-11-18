"use client"

import { CarouselIndicator } from "@/components/common/CarouselIndicator"
import {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel"
import { useState } from "react"
import Image from "next/image"
import type { Prisma } from "@prisma/client"

interface HabitatPageCarouselProps {
	habitat: Prisma.HabitatGetPayload<Record<string, never>>
}

export const HabitatPageCarousel = (props: HabitatPageCarouselProps) => {
	const [api, setApi] = useState<CarouselApi>()
	return (
		<Carousel setApi={setApi}>
			<CarouselContent>
				{props.habitat.images.map((image) => (
					<CarouselItem key={image}>
						<div className="relative aspect-video w-full">
							<Image
								src={image}
								alt={props.habitat.nom}
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

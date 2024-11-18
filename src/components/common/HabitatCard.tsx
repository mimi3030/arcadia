"use client"

import { CarouselIndicator } from "@/components/common/CarouselIndicator"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel"
import type { Prisma } from "@prisma/client"
import Image from "next/image"
import { useState } from "react"

interface HabitatCardProps {
	habitat: Prisma.HabitatGetPayload<Record<string, never>>
}

export const HabitatCard = (props: HabitatCardProps) => {
	const [api, setApi] = useState<CarouselApi>()
	return (
		<Card className="relative w-full overflow-hidden">
			<Carousel setApi={setApi}>
				<CarouselContent>
					{props.habitat.images.map((image, index) => (
						<CarouselItem key={index}>
							<div className="relative aspect-video w-full">
								<Image
									src={image}
									alt={props.habitat.nom}
									className="object-cover"
									fill={true}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselIndicator api={api} />
			</Carousel>
			<CardHeader>
				<CardTitle>{props.habitat.nom}</CardTitle>
			</CardHeader>
		</Card>
	)
}

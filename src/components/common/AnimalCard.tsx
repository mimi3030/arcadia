"use client"

import { CarouselIndicator } from "@/components/common/CarouselIndicator"
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel"
import type { Prisma } from "@prisma/client"
import { HeartPulse } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { sentenceCase } from "change-case"

interface AnimalCardProps {
	animal: Prisma.AnimalGetPayload<{
		include: {
			rapports: true
			race: true
		}
	}>
}

export const AnimalCard = (props: AnimalCardProps) => {
	const [api, setApi] = useState<CarouselApi>()
	const rapport = props.animal.rapports.at(-1)
	return (
		<Card className="w-full overflow-hidden">
			<Carousel setApi={setApi}>
				<CarouselContent>
					{props.animal.images.map((image) => (
						<CarouselItem key={image}>
							<div className="relative aspect-square w-full">
								<Image
									src={image}
									alt={props.animal.prenom}
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
				<CardTitle className="flex items-center">
					<span>{props.animal.prenom}</span>
					{rapport && (
						<span className="ml-auto flex items-center gap-x-2 text-sm">
							{sentenceCase(rapport.etat)}
							<HeartPulse size={16} />
						</span>
					)}
				</CardTitle>
				<CardDescription>{props.animal.race.label}</CardDescription>
			</CardHeader>
		</Card>
	)
}

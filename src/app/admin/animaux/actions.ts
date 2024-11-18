"use server"

import { prismaClient } from "@/utils"

export const updateAnimal = async (params: {
	id: number
	prenom: string
	habitatId: number
	raceId: number
	images: string[]
}) => {
	await prismaClient.animal.update({
		where: { id: params.id },
		data: {
			...params,
		},
	})
}

export const deleteAnimal = async (id: number) => {
	await prismaClient.animal.delete({ where: { id } })
}

export const addAnimal = async (params: {
	prenom: string
	habitatId: number
	raceId: number
	images: string[]
}) => {
	await prismaClient.animal.create({
		data: {
			...params,
		},
	})
}

"use server"

import { prismaClient } from "@/utils"

export const updateHabitat = async (
	id: number,
	nom: string,
	description: string,
	images: string[],
) => {
	await prismaClient.habitat.update({
		where: { id },
		data: {
			nom,
			description,
			images,
		},
	})
}

export const deleteHabitat = async (id: number) => {
	await prismaClient.habitat.delete({ where: { id } })
}

export const addHabitat = async (
	nom: string,
	description: string,
	images: string[],
) => {
	await prismaClient.habitat.create({
		data: {
			nom,
			description,
			images,
		},
	})
}

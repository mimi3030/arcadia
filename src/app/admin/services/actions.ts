"use server"

import { prismaClient } from "@/utils"

export const updateService = async (
	id: number,
	nom: string,
	description: string,
) => {
	await prismaClient.service.update({
		where: { id },
		data: {
			nom,
			description,
		},
	})
}

export const deleteService = async (id: number) => {
	await prismaClient.service.delete({ where: { id } })
}

export const addService = async (nom: string, description: string) => {
	await prismaClient.service.create({
		data: {
			nom,
			description,
		},
	})
}

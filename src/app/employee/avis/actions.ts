"use server"

import { prismaClient } from "@/utils"

export const acceptAvis = async (id: number) => {
	await prismaClient.avis.update({
		where: { id },
		data: {
			isVisible: true,
		},
	})
}

export const revokeAvis = async (id: number) => {
	await prismaClient.avis.delete({
		where: { id },
	})
}

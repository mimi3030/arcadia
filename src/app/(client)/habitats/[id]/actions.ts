"use server"

import { prismaClient } from "@/utils"

export const createAvis = async (params: {
	pseudo: string
	commentaire: string
	habitatId: number
}) => {
	await prismaClient.avis.create({
		data: {
			pseudo: params.pseudo,
			commentaire: params.commentaire,
			habitatId: params.habitatId,
			isVisible: false,
		},
	})
}

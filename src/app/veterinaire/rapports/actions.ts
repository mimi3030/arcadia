"use server"

import { getCurrentUtilisateur } from "@/app/sign-in/actions"
import { prismaClient } from "@/utils"
import type { EtatAnimal } from "@prisma/client"

export const addRapport = async (params: {
	etat: EtatAnimal
	detail: string
	animalId: number
}) => {
	const utilisateur = await getCurrentUtilisateur()
	if (!utilisateur) {
		throw new Error("Utilisateur non connecté")
	}
	await prismaClient.rapport.create({
		data: {
			etat: params.etat,
			detail: params.detail,
			date: new Date(),
			animalId: params.animalId,
			veterinaireId: utilisateur.id,
		},
	})
}

"use server"

import { getCurrentUtilisateur } from "@/app/sign-in/actions"
import { prismaClient } from "@/utils"

export const addNourriture = async (params: {
	label: string
	grammage: number
	animalId: number
}) => {
	const utilisateur = await getCurrentUtilisateur()
	if (!utilisateur) {
		throw new Error("Utilisateur introuvable")
	}
	console.log(utilisateur)
	await prismaClient.nourriture.create({
		data: {
			date: new Date(),
			grammage: params.grammage,
			label: params.label,
			animalId: params.animalId,
			employeId: utilisateur.id,
		},
	})
}

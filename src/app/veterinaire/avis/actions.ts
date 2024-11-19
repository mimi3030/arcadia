import { getCurrentUtilisateur } from "@/app/sign-in/actions"
import { prismaClient } from "@/utils"

export const createAvis = async (params: {
	habitatId: number
	commentaire: string
}) => {
	const utilisateur = await getCurrentUtilisateur()
	if (!utilisateur) {
		throw new Error("Utilisateur non connecté")
	}
	return await prismaClient.avis.create({
		data: {
			isVisible: false,
			habitatId: params.habitatId,
			commentaire: params.commentaire,
			pseudo: `${utilisateur.nom[0]}. ${utilisateur.prenom}`,
		},
	})
}

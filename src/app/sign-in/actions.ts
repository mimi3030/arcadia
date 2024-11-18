"use server"

import { prismaClient } from "@/utils"
import { auth } from "@clerk/nextjs/server"
import type { RoleEnum } from "@prisma/client"

export const isAdmin = async (): Promise<boolean> => {
	const authInfo = await auth()
	return authInfo.userId === process.env.ADMIN_UID
}

export const getRoleForCurrentUser = async (): Promise<
	RoleEnum | undefined
> => {
	const authInfo = await auth()
	if (!authInfo.userId) {
		return undefined
	}
	const currentUser = await prismaClient.utilisateur.findUnique({
		where: {
			uid: authInfo.userId,
		},
	})
	if (!currentUser) {
		return undefined
	}
	return currentUser.role
}

export const getCurrentUtilisateur = async () => {
	const authInfo = await auth()
	if (!authInfo.userId) {
		return undefined
	}
	return prismaClient.utilisateur.findUnique({
		where: {
			uid: authInfo.userId,
		},
	})
}

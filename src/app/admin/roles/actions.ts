"use server"

import { prismaClient } from "@/utils"
import { clerkClient } from "@clerk/nextjs/server"
import type { RoleEnum } from "@prisma/client"
import to from "await-to-js"

export const addUtilisateur = async (params: {
	nom: string
	prenom: string
	email: string
	password: string
	role: RoleEnum
}): Promise<
	| {
			status: "success"
	  }
	| {
			status: "error"
			error: Error
	  }
> => {
	const clerk = await clerkClient()
	const [err, user] = await to(
		clerk.users.createUser({
			emailAddress: [params.email],
			password: params.password,
			privateMetadata: {
				role: params,
			},
		}),
	)
	if (err) {
		return {
			status: "error",
			error: err,
		}
	}
	await prismaClient.utilisateur.create({
		data: {
			nom: params.nom,
			prenom: params.prenom,
			uid: user.id,
			role: params.role,
		},
	})
	return {
		status: "success",
	}
}

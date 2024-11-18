"use client"

import type { Prisma } from "@prisma/client"
import type { ColumnDef } from "@tanstack/react-table"

export type Utilisateur = Prisma.UtilisateurGetPayload<Record<string, never>>

export const utilisateurColumns: ColumnDef<Utilisateur>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "nom",
		header: "Nom",
	},
	{
		accessorKey: "prenom",
		header: "Prénom",
	},
	{
		accessorKey: "role",
		header: "Role",
	},
]

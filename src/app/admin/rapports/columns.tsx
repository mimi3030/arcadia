"use client"

import type { Prisma } from "@prisma/client"
import type { ColumnDef } from "@tanstack/react-table"
import { sentenceCase } from "change-case"
import dayjs from "dayjs"

export type Rapport = Prisma.RapportGetPayload<{
	include: {
		veterinaire: true
		animal: true
	}
}>

export const rapportColums: ColumnDef<Rapport>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorFn: (row) => `${row.veterinaire.nom} ${row.veterinaire.prenom}`,
		header: "Vétérinaire",
	},
	{
		id: "animal",
		accessorKey: "animal.prenom",
		header: "Animal",
	},
	{
		header: "Date",
		accessorFn(row) {
			return dayjs(row.date).format("DD MMM YYYY à HH:mm")
		},
	},
	{
		accessorFn: (row) => sentenceCase(row.etat),
		header: "État",
	},
	{
		accessorKey: "nourriture",
		header: "Nourriture",
	},
	{
		accessorKey: "grammage",
		header: "Grammage",
	},
]

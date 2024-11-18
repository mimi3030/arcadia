"use client"

import { TableActions } from "@/app/admin/animaux/table-actions"
import type { Prisma } from "@prisma/client"
import type { ColumnDef } from "@tanstack/react-table"

export type Animal = Prisma.AnimalGetPayload<{
	include: {
		habitat: true
		race: true
	}
}>

export const getAnimalColums = (
	habitats: Prisma.HabitatGetPayload<Record<string, never>>[],
	races: Prisma.RaceGetPayload<Record<string, never>>[],
): ColumnDef<Animal>[] => {
	return [
		{
			accessorKey: "id",
			header: "ID",
		},
		{
			accessorKey: "prenom",
			header: "Prenom",
		},
		{
			accessorKey: "habitat.nom",
			header: "Habitat",
		},
		{
			accessorKey: "race.label",
			header: "Race",
		},
		{
			id: "actions",
			header: "Actions",
			cell({ row }) {
				return (
					<TableActions
						animal={row.original}
						habitats={habitats}
						races={races}
					/>
				)
			},
		},
	]
}

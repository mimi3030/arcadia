"use client"

import { TableActions } from "@/app/admin/habitats/table-actions"
import type { Prisma } from "@prisma/client"
import type { ColumnDef } from "@tanstack/react-table"

export type Habitat = Prisma.HabitatGetPayload<Record<string, never>>

export const habitatColums: ColumnDef<Habitat>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "nom",
		header: "Nom",
	},
	{
		accessorFn: (habitat) =>
			habitat.description.length > 50
				? `${habitat.description.slice(0, 50)}...`
				: habitat.description,
		header: "Description",
	},
	{
		id: "actions",
		header: "Actions",
		cell({ row }) {
			return <TableActions habitat={row.original} />
		},
	},
]

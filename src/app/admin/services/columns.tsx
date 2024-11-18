"use client"

import { TableActions } from "@/app/admin/services/table-actions"
import type { Prisma } from "@prisma/client"
import type { ColumnDef } from "@tanstack/react-table"

export type Service = Prisma.ServiceGetPayload<Record<string, never>>

export const serviceColums: ColumnDef<Service>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "nom",
		header: "Nom",
	},
	{
		id: "actions",
		header: "Actions",
		cell({ row }) {
			return <TableActions service={row.original} />
		},
	},
]

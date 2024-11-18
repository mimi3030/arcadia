"use client"

import { getAnimalColums } from "@/app/admin/animaux/columns"
import { DataTable } from "@/app/admin/animaux/data-table"
import type { Prisma } from "@prisma/client"

interface DataTableConfigProps {
	animaux: Prisma.AnimalGetPayload<{
		include: {
			habitat: true
			race: true
		}
	}>[]
	habitats: Prisma.HabitatGetPayload<Record<string, never>>[]
	races: Prisma.RaceGetPayload<Record<string, never>>[]
}

export const DataTableConfig = (props: DataTableConfigProps) => {
	const colums = getAnimalColums(props.habitats, props.races)
	return <DataTable data={props.animaux} columns={colums} />
}

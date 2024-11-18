"use client"

import { db } from "@/app/firebase/config"
import { AdminAnimalVisiteStat } from "@/app/admin/visites/stat"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import type { Prisma } from "@prisma/client"
import { off, onValue, ref } from "firebase/database"
import { produce } from "immer"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

const selectValuesItems = [
	{
		value: "PLUS_VISITE",
		text: "Plus de visites",
	},
	{
		value: "MOINS_VISITE",
		text: "Moins de visites",
	},
	{
		value: "A_Z",
		text: "A-Z",
	},
	{
		value: "Z_A",
		text: "Z-A",
	},
] as const

interface AdminVisiteAnimauxStatsProps {
	animaux: Prisma.AnimalGetPayload<Record<string, never>>[]
}

export const AdminVisiteAnimauxStats = (
	props: AdminVisiteAnimauxStatsProps,
) => {
	const [valueByAnimalId, setValueByAnimalId] = useState<
		Record<string, number>
	>({})

	useEffect(() => {
		for (const animal of props.animaux) {
			const visiteRef = ref(db, `visites/${animal.id}`)
			onValue(visiteRef, (snapshot) => {
				if (!snapshot.exists()) {
					setValueByAnimalId((prev) =>
						produce(prev, (draft) => {
							draft[animal.id] = 0
						}),
					)
					return
				}
				const value = snapshot.val()
				const valueSafeParsed = z.number().safeParse(value)
				if (!valueSafeParsed.success) {
					toast.error("Erreur lors de la récupération des visites")
					return
				}
				setValueByAnimalId((prev) =>
					produce(prev, (draft) => {
						draft[animal.id] = valueSafeParsed.data
					}),
				)
			})
		}
		return () => {
			for (const animal of props.animaux) {
				const visiteRef = ref(db, `visites/${animal.id}`)
				off(visiteRef)
			}
		}
	}, [props.animaux])

	const [selectValue, setSelectValue] =
		useState<(typeof selectValuesItems)[number]["value"]>()

	const animauxSorted = (() => {
		switch (selectValue) {
			case "PLUS_VISITE":
				return props.animaux.sort(
					(a, b) => valueByAnimalId[b.id] - valueByAnimalId[a.id],
				)
			case "MOINS_VISITE":
				return props.animaux.sort(
					(a, b) => valueByAnimalId[a.id] - valueByAnimalId[b.id],
				)
			case "A_Z":
				return props.animaux.sort((a, b) => a.prenom.localeCompare(b.prenom))
			case "Z_A":
				return props.animaux.sort((a, b) => b.prenom.localeCompare(a.prenom))
			default:
				return props.animaux
		}
	})()

	return (
		<div className="flex flex-col gap-y-8">
			<Select
				value={selectValue}
				onValueChange={(value) => {
					setSelectValue(value as (typeof selectValuesItems)[number]["value"])
				}}
			>
				<SelectTrigger>
					<SelectValue placeholder="Trier par" />
				</SelectTrigger>
				<SelectContent>
					{selectValuesItems.map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.text}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				{animauxSorted.map((animal) => (
					<AdminAnimalVisiteStat
						key={animal.id}
						animal={animal}
						nbVisites={valueByAnimalId[animal.id]}
					/>
				))}
			</div>
		</div>
	)
}

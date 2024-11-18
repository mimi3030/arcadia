"use client"

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
	ArrowDown,
	ArrowUp,
	ChevronLeft,
	ChevronRight,
	ChevronsUpDown,
	X,
} from "lucide-react"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	})

	return (
		<div className="flex flex-col gap-y-8">
			<Input
				placeholder="Recherche par animal"
				value={(table.getColumn("animal")?.getFilterValue() as string) ?? ""}
				onChange={(event) =>
					table.getColumn("animal")?.setFilterValue(event.target.value)
				}
				className="max-w-sm"
			/>
			{table
				.getHeaderGroups()
				.some((headerGroup) =>
					headerGroup.headers.some((header) => header.column.getIsFiltered()),
				) && (
				<div className="flex gap-2">
					<p className="font-medium text-sm">Filter by:</p>
					{table.getHeaderGroups().map((headerGroup) =>
						headerGroup.headers.map(
							(header) =>
								header.column.getIsFiltered() && (
									<Badge
										variant="destructive"
										key={header.column.id}
										className="cursor-pointer"
										onClick={() => header.column.setFilterValue(undefined)}
									>
										<X size={12} />
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</Badge>
								),
						),
					)}
				</div>
			)}
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										<DropdownMenu>
											<DropdownMenuTrigger asChild={true}>
												<Button variant="ghost">
													{(() => {
														switch (header.column.getIsSorted()) {
															case "asc":
																return <ArrowDown />
															case "desc":
																return <ArrowUp />
															default:
																return <ChevronsUpDown />
														}
													})()}
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext(),
															)}
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuItem
													onSelect={() => {
														header.column.toggleSorting(false)
													}}
												>
													<ArrowUp />
													Croissant
												</DropdownMenuItem>
												<DropdownMenuItem
													onSelect={() => {
														header.column.toggleSorting(true)
													}}
												>
													<ArrowDown />
													Décroissant
												</DropdownMenuItem>
												<DropdownMenuItem
													onSelect={() => {
														header.column.toggleSorting(undefined)
													}}
												>
													<ChevronsUpDown />
													Non trié
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.length > 0 ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										<Button
											variant="ghost"
											onClick={() => {
												cell.column.setFilterValue(cell.getValue())
											}}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</Button>
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<div className="flex items-center justify-end gap-x-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<ChevronLeft />
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
					<ChevronRight />
				</Button>
			</div>
		</div>
	)
}

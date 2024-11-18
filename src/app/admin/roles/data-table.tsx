"use client"

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
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

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	ArrowDown,
	ArrowUp,
	ChevronLeft,
	ChevronRight,
	ChevronsUpDown,
} from "lucide-react"

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	return (
		<div className="flex flex-col gap-y-8">
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
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
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

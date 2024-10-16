import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { DataTablePagination } from "../DataTablePagination";
import React from "react";
import { Input } from "../ui/input";
import { DataTableViewOptions } from "../DataTableViewOptionsProps";
import { Button } from "../ui/button";
import { Cross2Icon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { DataTableFacetedFilter } from "../DataTableFacetedFilter";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    setTambahState: (state: boolean) => void;
    setUploadState: (state: boolean) => void;
}

export function CertificateDataTable<TData, TValue>({
    data,
    columns,
    setTambahState,
    setUploadState,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    const isFiltered = table.getState().columnFilters.length > 0;

    const kategoriColumn = table.getColumn("Nama Kategori");
    const kategoriFacetUniqueValues = kategoriColumn!.getFacetedUniqueValues();
    const kategoriOptions = Array.from(kategoriFacetUniqueValues.keys()).map(
        (k) => {
            return {
                value: k,
                label: k,
                icon: QuestionMarkCircledIcon,
            };
        }
    );

    return (
        <div>
            {table.getColumn("Nama Kategori") && (
                <DataTableFacetedFilter
                    column={table.getColumn("Nama Kategori")}
                    title="Nama Kategori"
                    options={kategoriOptions}
                />
            )}
            <div className="flex items-center justify-between py-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="Filter Nama Mahasiswa..."
                        value={
                            (table
                                .getColumn("nama_lengkap")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("nama_lengkap")
                                ?.setFilterValue(event.target.value)
                        }
                        className="h-8 w-[150px] lg:w-[250px]"
                    />
                    {isFiltered && (
                        <Button
                            variant="ghost"
                            onClick={() => table.resetColumnFilters()}
                            className="h-8 px-2 lg:px-3"
                        >
                            Reset
                            <Cross2Icon className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    <DataTableViewOptions table={table} />
                    <Button
                        onClick={() => {
                            window.location.href =
                                "/dashboard/downloadtemplatesertifikat";
                        }}
                    >
                        Download Template Excel
                    </Button>
                    <Button onClick={() => setUploadState(true)}>
                        Import Data Sertifikat
                    </Button>
                    <Button onClick={() => setTambahState(true)}>
                        Tambah Sertifikat
                    </Button>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="bg-cyan-950 text-white"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}

import { CategoryData } from "@/types";
import { router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import React from "react";
import { ClipLoader } from "react-spinners";

export const categoryColumns: ColumnDef<CategoryData>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "category_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Kategori" />
        ),
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
            return moment(row.getValue("created_at")).format("LLL");
        },
    },
    {
        accessorKey: "updated_at",
        header: "Updated At",
        cell: ({ row }) => {
            return moment(row.getValue("updated_at")).format("LLL");
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const [loading, setLoading] = React.useState<boolean>(false);
            const category = row.original;

            const deleteCategory = (id: string) => {
                setLoading(true);
                router.delete(`/dashboard/kategori/${id}`, {
                    onSuccess: () => {
                        setLoading(false);
                        alert("Category deleted successfully");
                    },
                    onError: (errors) => {
                        setLoading(false);
                        console.error(errors);
                    },
                });
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            {loading ? (
                                <ClipLoader loading={loading} size={15} />
                            ) : (
                                <MoreHorizontal className="h-4 w-4" />
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => {}}>
                            Edit Category
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                deleteCategory(category.id);
                            }}
                        >
                            Delete Category
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

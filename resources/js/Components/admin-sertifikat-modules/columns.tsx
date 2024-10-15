import { CertificateData } from "@/types";
import { router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import React from "react";
import { ClipLoader } from "react-spinners";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

export const certificateColumns: ColumnDef<CertificateData>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const program_studi = row.original.program_studi;
            const idCertificate: string = row.getValue("id");
            return (
                <div className="space-y-2">
                    {program_studi === "TI" ? (
                        <Badge className="bg-emerald-700">
                            Teknik Informatika
                        </Badge>
                    ) : (
                        <Badge className="bg-rose-700">Sistem Informasi</Badge>
                    )}
                    <p>{idCertificate}</p>
                </div>
            );
        },
    },
    {
        id: "categories",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Kategori" />
        ),
        cell: ({ row }) => {
            return row.original.categories?.category_name;
        },
    },
    {
        accessorKey: "nim",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="NIM" />
        ),
    },
    {
        accessorKey: "nama_lengkap",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Mahasiswa" />
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
            const [editCategoryState, setEditCategoryState] =
                React.useState<boolean>(false);
            let category = row.original;

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
                <>
                    {/* <EditCategory
                        state={editCategoryState}
                        setState={setEditCategoryState}
                        idata={row.original}
                    /> */}
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
                            <DropdownMenuItem
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        row.original.link
                                    );
                                    toast.success("Link telah Dicopy");
                                }}
                            >
                                Copy Link
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    setEditCategoryState(true);
                                }}
                            >
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
                </>
            );
        },
    },
];

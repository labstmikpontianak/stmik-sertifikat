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
import EditCertificate from "./EditCertificate";

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
        id: "Nama Kategori",
        accessorFn: (row) => row.categories?.category_name || "Unknown",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Kategori" />
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
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
            const [editCertificateState, setEditCertificateState] =
                React.useState<boolean>(false);
            let certificate = row.original;

            const deleteCertificate = (id: string) => {
                setLoading(true);
                router.delete(`/dashboard/sertifikat/${id}`, {
                    onSuccess: () => {
                        setLoading(false);
                        alert("Certificate deleted successfully");
                    },
                    onError: (errors) => {
                        setLoading(false);
                        console.error(errors);
                    },
                });
            };

            return (
                <>
                    <EditCertificate
                        state={editCertificateState}
                        setState={setEditCertificateState}
                        idata={row.original}
                    />
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
                                    setEditCertificateState(true);
                                }}
                            >
                                Edit Certificate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    deleteCertificate(certificate.id);
                                }}
                            >
                                Delete Certificate
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            );
        },
    },
];

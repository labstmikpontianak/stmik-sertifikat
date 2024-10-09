import { CategoryData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const categoryColumns: ColumnDef<CategoryData>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "category_name",
        header: "Nama Kategori",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
    },
    {
        accessorKey: "updated_at",
        header: "Updated At",
    },
];

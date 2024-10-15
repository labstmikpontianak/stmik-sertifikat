import AddCategory from "@/Components/admin-kategori-modules/AddCategory";
import { categoryColumns } from "@/Components/admin-kategori-modules/columns";
import { CategoryDataTable } from "@/Components/admin-kategori-modules/data-table";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { CategoryData } from "@/types";
import { Head } from "@inertiajs/react";
import React from "react";

interface Props {
    data: CategoryData[];
}

const AdminKategori: React.FC<Props> = ({ data }) => {
    const [addCategoryState, setAddCategoryState] =
        React.useState<boolean>(false);

    return (
        <DashboardLayout pageTitle="Kelola Kategori" pageBreadcrumb="Kategori">
            <Head title="Category" />

            <AddCategory
                state={addCategoryState}
                setState={setAddCategoryState}
            />
            <div>
                <CategoryDataTable
                    columns={categoryColumns}
                    data={data}
                    setState={setAddCategoryState}
                />
            </div>
        </DashboardLayout>
    );
};

export default AdminKategori;

import { categoryColumns } from "@/Components/admin-kategori-modules/columns";
import { CategoryDataTable } from "@/Components/admin-kategori-modules/data-table";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { CategoryData } from "@/types";
import { Head } from "@inertiajs/react";

interface Props {
    data: CategoryData[];
}

const AdminKategoriIndex: React.FC<Props> = ({ data }) => {
    return (
        <DashboardLayout pageTitle="Kelola Kategori" pageBreadcrumb="Kategori">
            <Head title="Dashboard" />

            <div>
                <CategoryDataTable columns={categoryColumns} data={data} />
            </div>
        </DashboardLayout>
    );
};

export default AdminKategoriIndex;

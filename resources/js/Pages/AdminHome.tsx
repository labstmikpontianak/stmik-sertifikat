import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

const AdminHome = () => {
    return (
        <DashboardLayout pageTitle="Halaman Beranda" pageBreadcrumb="Beranda">
            <Head title="Dashboard" />

            <h1>Halaman Beranda</h1>
        </DashboardLayout>
    );
};

export default AdminHome;

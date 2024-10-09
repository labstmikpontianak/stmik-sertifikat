import { Button } from "@/Components/ui/button";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";

const AdminHome = () => {
    return (
        <DashboardLayout>
            <Head title="Dashboard" />

            <h1>Hello World</h1>
            <Button asChild>
                <Link method="post" href={route("logout")} as="button">
                    Logout
                </Link>
            </Button>
        </DashboardLayout>
    );
};

export default AdminHome;

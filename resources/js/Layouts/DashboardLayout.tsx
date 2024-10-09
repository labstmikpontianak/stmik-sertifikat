import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import { Link, usePage } from "@inertiajs/react";

interface Props {
    children: React.ReactNode;
    pageTitle: string;
    pageBreadcrumb: string;
}

const DashboardLayout: React.FC<Props> = ({
    children,
    pageTitle,
    pageBreadcrumb,
}) => {
    const { url } = usePage();

    return (
        <main>
            <header className="px-4 py-4 flex justify-between items-center bg-cyan-950">
                {/* Logo and Title */}
                <div className="flex space-x-4 items-center">
                    <img
                        src="/assets/images/logo.png"
                        alt="Logo"
                        className="w-16 -mt-2"
                    />
                    <h1 className="font-bold text-2xl text-white">
                        STMIK Pontianak
                    </h1>
                </div>
                <div className="flex items-center">
                    <Button
                        variant={"link"}
                        className={
                            url === "/dashboard/home"
                                ? "text-white underline"
                                : "text-white"
                        }
                    >
                        <Link href="/dashboard/home">Beranda</Link>
                    </Button>
                    <Button
                        variant={"link"}
                        className={
                            url === "/dashboard/kategori"
                                ? "text-white underline"
                                : "text-white"
                        }
                    >
                        <Link href="/dashboard/kategori">Kelola Kategori</Link>
                    </Button>
                    <Button
                        variant={"link"}
                        className={
                            url === "/dashboard/sertifikat"
                                ? "text-white underline"
                                : "text-white"
                        }
                    >
                        <Link href="/dashboard/sertifikat">
                            Kelola Sertifikat
                        </Link>
                    </Button>
                    <Button variant={"link"} className="text-white" asChild>
                        <Link method="post" href={route("logout")} as="button">
                            Keluar
                        </Link>
                    </Button>
                </div>
            </header>
            <section className="px-12 py-16">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">{pageTitle}</h1>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Dashboard</BreadcrumbPage>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    {pageBreadcrumb}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="mt-16">{children}</div>
            </section>
        </main>
    );
};

export default DashboardLayout;

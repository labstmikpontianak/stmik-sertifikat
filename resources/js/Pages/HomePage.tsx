import CertificateDialog from "@/Components/home-modules/CertificateDialog";
import CertificateHome from "@/Components/home-modules/CertificateHome";
import DefaultHome from "@/Components/home-modules/DefaultHome";
import HomeFooter from "@/Components/home-modules/HomeFooter";
import HomeHeader from "@/Components/home-modules/HomeHeader";
import { Toaster } from "@/Components/ui/sonner";
import { CategoryData, CategoryParams, CertificateData } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    view: {
        dataCategories: CategoryData[];
        dataCertificates: CertificateData[];
    };
}

const HomePage: React.FC<Props> = ({ view }) => {
    const [categoryParam, setCategoryParam] = useState<CategoryParams>({
        id: "Beranda",
        name: "Beranda",
    });
    const [dialog, setDialog] = useState<boolean>(false);
    const [filteredData, setFilteredData] = useState<CertificateData[]>([
        {
            id: "",
            category_id: "",
            nama_lengkap: "",
            nim: "",
            link: "",
            program_studi: "TI",
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);

    const handleHeaderCategory = (param: CategoryParams) => {
        setCategoryParam(param);
    };

    const getCertificate = (value: string) => {
        const filteredData = view.dataCertificates.filter(
            (d) => d.category_id === categoryParam.id && d.nim === value
        );

        if (filteredData.length === 0) {
            toast.error("Sertifikat Tidak Ditemukan");
        } else {
            setFilteredData(filteredData);
            setDialog(true);
        }
    };

    return (
        <>
            <Toaster richColors position="top-right" />
            <Head title="HomePage" />
            <CertificateDialog
                open={dialog}
                onOpenChange={setDialog}
                data={filteredData}
                certificateName={categoryParam.name}
            />
            <main className="relative">
                <div className="relative">
                    <img
                        src="/assets/images/bg.jpg"
                        alt=""
                        className="w-full h-screen object-cover object-center"
                    />
                    <div className="absolute top-0 min-w-full h-full bg-blue-900 opacity-60"></div>
                </div>
                <section className="absolute top-0 left-0 right-0">
                    <HomeHeader
                        categoryData={view.dataCategories}
                        handleParamsChange={handleHeaderCategory}
                    />
                    {categoryParam.name === "Beranda" ? (
                        <DefaultHome />
                    ) : (
                        <CertificateHome
                            categoryParams={categoryParam}
                            submitHandle={getCertificate}
                        />
                    )}
                    <HomeFooter />
                </section>
            </main>
        </>
    );
};

export default HomePage;

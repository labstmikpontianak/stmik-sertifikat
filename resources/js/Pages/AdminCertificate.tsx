import AddCertificate from "@/Components/admin-sertifikat-modules/AddCertificate";
import { certificateColumns } from "@/Components/admin-sertifikat-modules/columns";
import { CertificateDataTable } from "@/Components/admin-sertifikat-modules/data-table";
import ImportCertificate from "@/Components/admin-sertifikat-modules/ImportCertificate";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { CategoryData, CertificateData } from "@/types";
import { Head } from "@inertiajs/react";
import React from "react";

interface Props {
    data: CertificateData[];
    cdata: CategoryData[];
}

const AdminCertificate: React.FC<Props> = ({ data, cdata }) => {
    const [addCertificateState, setAddCertificateState] =
        React.useState<boolean>(false);
    const [importCertificateState, setImportCertificateState] =
        React.useState<boolean>(false);
    return (
        <DashboardLayout
            pageTitle="Kelola Sertifikat"
            pageBreadcrumb="Sertifikat"
        >
            <Head title="Certificate" />

            <AddCertificate
                state={addCertificateState}
                setState={setAddCertificateState}
                idata={cdata}
            />
            <ImportCertificate
                state={importCertificateState}
                setState={setImportCertificateState}
                idata={cdata}
            />
            <div>
                <CertificateDataTable
                    columns={certificateColumns}
                    data={data || []}
                    setTambahState={setAddCertificateState}
                    setUploadState={setImportCertificateState}
                />
            </div>
        </DashboardLayout>
    );
};

export default AdminCertificate;

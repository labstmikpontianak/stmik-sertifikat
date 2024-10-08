import { CertificateData } from "@/types";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Link } from "@inertiajs/react";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: CertificateData[];
    certificateName: string;
}

const CertificateDialog: React.FC<Props> = ({
    open,
    onOpenChange,
    data,
    certificateName,
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Apa Anda Ingin Mendownload Sertifikat?
                    </DialogTitle>
                    <DialogDescription>
                        Donwload Sertifikat STMIK Pontianak
                    </DialogDescription>
                    <p>
                        <b>{certificateName}</b>
                    </p>
                    <p>
                        Sertifikat Atas Nama:{" "}
                        <b>
                            {data[0].nama_lengkap} ({data[0].nim})
                        </b>
                    </p>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex justify-start w-full">
                        <Button asChild>
                            <Link href={data[0].link}>Download</Link>
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CertificateDialog;

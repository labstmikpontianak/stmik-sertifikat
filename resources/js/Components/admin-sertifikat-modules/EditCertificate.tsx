import { useForm } from "@inertiajs/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "../ui/sheet";
import React, { FormEventHandler } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { CertificateData } from "@/types";

interface Props {
    state: boolean;
    setState: (state: boolean) => void;
    idata: CertificateData;
}

const EditCertificate: React.FC<Props> = ({ state, setState, idata }) => {
    const { data, setData, patch, processing, errors } = useForm({
        nim: idata.nim,
        nama_lengkap: idata.nama_lengkap,
        program_studi: idata.program_studi,
        link: idata.link,
    });

    React.useEffect(() => {
        if (idata) {
            setData("nim", idata.nim);
            setData("nama_lengkap", idata.nama_lengkap);
            setData("program_studi", idata.program_studi);
            setData("link", idata.link);
        }
    }, [idata]);

    const handleProgramStudiChange = (value: "TI" | "SI") => {
        setData("program_studi", value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(`/dashboard/sertifikat/${idata.id}`, {
            onFinish: () => {
                setState(false);
            },
        });
    };

    return (
        <Sheet open={state} onOpenChange={setState}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Ubah Sertifikat</SheetTitle>
                    <SheetDescription>
                        Ubah Data Sertifikat | Sertifikat STMIK Pontianak
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={submit}>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-1">
                            <Label className="text-slate-600">
                                Jenis Kategori
                            </Label>
                            <Input
                                value={idata.categories?.category_name}
                                disabled
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="nim" className="text-slate-600">
                                NIM
                            </Label>
                            <Input
                                id="nim"
                                placeholder="Masukkan NIM"
                                value={data.nim}
                                onChange={(e) => setData("nim", e.target.value)}
                            />
                            {errors.nim ? (
                                <span className="text-xs text-rose-900 font-bold">
                                    {errors.nim}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label
                                htmlFor="nama_lengkap"
                                className="text-slate-600"
                            >
                                Nama Lengkap
                            </Label>
                            <Input
                                id="nama_lengkap"
                                placeholder="Masukkan Nama Lengkap"
                                value={data.nama_lengkap}
                                onChange={(e) =>
                                    setData("nama_lengkap", e.target.value)
                                }
                            />
                            {errors.nama_lengkap ? (
                                <span className="text-xs text-rose-900 font-bold">
                                    {errors.nama_lengkap}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label
                                htmlFor="program_studi"
                                className="text-slate-600"
                            >
                                Program Studi
                            </Label>
                            <Select
                                value={data.program_studi}
                                onValueChange={handleProgramStudiChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Program Studi..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TI">
                                        Teknik Informatika
                                    </SelectItem>
                                    <SelectItem value="SI">
                                        Sistem Informasi
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.program_studi ? (
                                <span className="text-xs text-rose-900 font-bold">
                                    {errors.program_studi}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="link" className="text-slate-600">
                                Link Sertifikat
                            </Label>
                            <Input
                                id="link"
                                placeholder="Masukkan Link"
                                value={data.link}
                                onChange={(e) =>
                                    setData("link", e.target.value)
                                }
                            />
                            {errors.link ? (
                                <span className="text-xs text-rose-900 font-bold">
                                    {errors.link}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <SheetFooter>
                        <Button type="submit" disabled={processing}>
                            {processing ? "Loading" : "Simpan"}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default EditCertificate;

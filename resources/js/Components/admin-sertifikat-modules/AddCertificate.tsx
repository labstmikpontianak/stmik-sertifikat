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
import { FormEventHandler } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { CategoryData } from "@/types";

interface Props {
    state: boolean;
    setState: (state: boolean) => void;
    idata: CategoryData[];
}

const AddCertificate: React.FC<Props> = ({ state, setState, idata }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        category_id: "",
        nim: "",
        nama_lengkap: "",
        program_studi: "",
        link: "",
    });

    const handleCategoryChange = (value: string) => {
        setData("category_id", value);
    };

    const handleProgramStudiChange = (value: string) => {
        setData("program_studi", value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("sertifikat.storeOne"), {
            onFinish: () => {
                reset();
                setState(false);
            },
        });
    };

    return (
        <Sheet open={state} onOpenChange={setState}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Tambah Sertifikat</SheetTitle>
                    <SheetDescription>
                        Tambah Data Sertifikat | Sertifikat STMIK Pontianak
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={submit}>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-1">
                            <Label
                                htmlFor="category_id"
                                className="text-slate-600"
                            >
                                Jenis Kategori
                            </Label>
                            <Select
                                value={data.category_id}
                                onValueChange={handleCategoryChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Kategori..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {idata.map((d) => (
                                        <SelectItem key={d.id} value={d.id}>
                                            {d.category_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_id ? (
                                <span className="text-xs text-rose-900 font-bold">
                                    {errors.category_id}
                                </span>
                            ) : (
                                ""
                            )}
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

export default AddCertificate;

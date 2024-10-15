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
import { CategoryData } from "@/types";
import { toast } from "sonner";

interface Props {
    state: boolean;
    setState: (state: boolean) => void;
    idata: CategoryData[];
}

interface FormData {
    category_id: string;
    file: File | null;
}

const ImportCertificate: React.FC<Props> = ({ state, setState, idata }) => {
    const [fileError, setFileError] = React.useState<string | null>(null);
    const { data, setData, post, processing, errors, reset } =
        useForm<FormData>({
            category_id: "",
            file: null,
        });

    // Allowed file types
    const allowedFileTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "application/vnd.ms-excel", // .xls
        "text/csv", // .csv
    ];

    const handleCategoryChange = (value: string) => {
        setData("category_id", value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            if (!allowedFileTypes.includes(selectedFile.type)) {
                setFileError("Please upload a valid Excel or CSV file.");
                setData("file", null); // Clear the file data
            } else {
                setFileError(null); // Clear error if the file is valid
                setData("file", selectedFile); // Set file if valid
            }
        } else {
            setFileError(null); // Clear error if no file is selected
            setData("file", null);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!data.file) {
            toast.error("Please upload a valid file before submitting.");
            return;
        }

        post(route("sertifikat.store"), {
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
                    <SheetTitle>Import Sertifikat</SheetTitle>
                    <SheetDescription>
                        Import Data Sertifikat | Sertifikat STMIK Pontianak
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
                            <Label htmlFor="file" className="text-slate-600">
                                Upload File (Excel, CSV)
                            </Label>
                            <Input
                                id="file"
                                type="file"
                                onChange={handleFileChange}
                            />
                            {fileError ? (
                                <span className="text-xs text-rose-900 font-bold">
                                    {fileError}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <SheetFooter>
                        <Button
                            type="submit"
                            disabled={processing || fileError ? true : false}
                        >
                            {processing ? "Loading" : "Simpan"}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default ImportCertificate;

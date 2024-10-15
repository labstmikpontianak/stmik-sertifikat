import { useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "../ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CategoryData } from "@/types";

interface Props {
    state: boolean;
    setState: (state: boolean) => void;
    idata: CategoryData;
}

const EditCategory: React.FC<Props> = ({ state, setState, idata }) => {
    const { data, setData, patch, processing, errors } = useForm({
        category_name: idata.category_name,
    });

    React.useEffect(() => {
        if (idata) {
            setData("category_name", idata.category_name);
        }
    }, [idata]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(`/dashboard/kategori/${idata.id}`, {
            onFinish: () => {
                setState(false);
            },
        });
    };

    return (
        <Sheet open={state} onOpenChange={setState}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Ubah Kategori</SheetTitle>
                    <SheetDescription>
                        Ubah Data Kategori Sertifikat STMIK Pontianak
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={submit}>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-1">
                            <Label
                                htmlFor="category_name"
                                className="text-slate-600"
                            >
                                Nama Kategori
                            </Label>
                            <Input
                                id="category_name"
                                placeholder="Masukkan Nama Kategori"
                                value={data.category_name}
                                onChange={(e) =>
                                    setData("category_name", e.target.value)
                                }
                            />
                            {errors.category_name ? (
                                <span className="text-xs text-rose-900 font-bold">
                                    {errors.category_name}
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

export default EditCategory;

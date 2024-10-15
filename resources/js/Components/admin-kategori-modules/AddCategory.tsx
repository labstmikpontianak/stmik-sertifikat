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

interface Props {
    state: boolean;
    setState: (state: boolean) => void;
}

const AddCategory: React.FC<Props> = ({ state, setState }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        category_name: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log(e);

        post(route("kategori.store"), {
            onFinish: () => {
                reset("category_name");
                setState(false);
            },
        });
    };

    return (
        <Sheet open={state} onOpenChange={setState}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Tambah Kategori</SheetTitle>
                    <SheetDescription>
                        Tambah Data Kategori Sertifikat STMIK Pontianak
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

export default AddCategory;

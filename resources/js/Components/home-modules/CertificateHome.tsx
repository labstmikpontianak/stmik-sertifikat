import { CategoryParams } from "@/types";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";

interface Props {
    categoryParams: CategoryParams;
    submitHandle: (value: string) => void;
}

const CertificateHome: React.FC<Props> = ({ categoryParams, submitHandle }) => {
    const [value, setValue] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (value.length < 9 || value.length > 10) {
            console.log("Type Error");
            setError(true);
            setErrorMessage("Masukkan NIM dengan Benar!");
        } else {
            setError(false);
            setErrorMessage("");
        }
    }, [value]);

    return (
        <div className="flex justify-between items-center px-32 mt-20">
            <div>
                <h3 className="text-3xl font-bold text-white">
                    STMIK Pontianak
                </h3>
                <h4 className="text-2xl font-semibold text-white">
                    Download Sertifikat {categoryParams.name}
                </h4>
            </div>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Download Sertifikat</CardTitle>
                    <CardDescription>
                        Sertifikat {categoryParams.name}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="nim">NIM</Label>
                            <Input
                                placeholder="Masukkan NIM Anda"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        disabled={error}
                        onClick={() => {
                            submitHandle(value);
                            setValue("");
                        }}
                    >
                        Download
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CertificateHome;

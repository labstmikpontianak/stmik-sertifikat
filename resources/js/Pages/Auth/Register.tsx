import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Register" />

            <main className="flex flex-col justify-center items-center h-screen w-full space-y-4 bg-sky-950">
                <Link href="/">
                    <img
                        src="/assets/images/logo.png"
                        alt="Logo"
                        className="w-24"
                    />
                </Link>
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>STMIK Pontianak - Register</CardTitle>
                        <CardDescription>
                            Kelola Sertifikat STMIK Pontianak
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={submit}>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="nama">Nama Lengkap</Label>
                                    <Input
                                        id="nama"
                                        placeholder="Nama Lengkap"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    {errors.name ? (
                                        <span className="text-xs text-rose-900 font-bold">
                                            {errors.name}
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email Address"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    {errors.email ? (
                                        <span className="text-xs text-rose-900 font-bold">
                                            {errors.email}
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    {errors.password ? (
                                        <span className="text-xs text-rose-900 font-bold">
                                            {errors.password}
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start">
                            <Button type="submit" disabled={processing}>
                                Register
                            </Button>
                            <div className="text-xs text-gray-400">
                                Sudah Punya Akun?{" "}
                                <Button
                                    variant={"link"}
                                    className="px-0 py-0"
                                    asChild
                                >
                                    <Link href="admin/login">Masuk</Link>
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </main>
        </>
    );
}

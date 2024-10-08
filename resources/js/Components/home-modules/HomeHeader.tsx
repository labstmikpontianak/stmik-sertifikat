import { CategoryData, CategoryParams } from "@/types";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Link } from "@inertiajs/react";

interface Props {
    categoryData: CategoryData[];
    handleParamsChange: (data: CategoryParams) => void;
}

const HomeHeader: React.FC<Props> = ({ categoryData, handleParamsChange }) => {
    const handleSelectChange = (value: string) => {
        const selectedData = JSON.parse(value) as CategoryParams;
        handleParamsChange(selectedData);
    };

    const defaultSelectValue: CategoryParams = {
        id: "Beranda",
        name: "Beranda",
    };

    return (
        <header className="px-8 py-8 flex justify-between items-center">
            {/* Logo and Title */}
            <div className="flex space-x-4 items-center">
                <img
                    src="/assets/images/logo.png"
                    alt="Logo"
                    className="w-16 -mt-2"
                />
                <h1 className="font-bold text-2xl text-white">
                    STMIK Pontianak
                </h1>
            </div>
            <div className="flex items-center space-x-2">
                <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-[320px] bg-blue-500 text-white font-semibold focus:ring-0 border-0">
                        <SelectValue placeholder="Beranda" />
                    </SelectTrigger>
                    <SelectContent className="bg-blue-500 text-white font-semibold border-0">
                        <SelectItem value={JSON.stringify(defaultSelectValue)}>
                            Beranda
                        </SelectItem>
                        {categoryData.map((d) => {
                            const data = {
                                id: d.id,
                                name: d.category_name,
                            };
                            return (
                                <SelectItem
                                    key={d.id}
                                    value={JSON.stringify(data)}
                                >
                                    {d.category_name}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>

                <Button
                    variant="outline"
                    className="bg-transparent text-white border-2"
                    asChild
                >
                    <Link href="login">Masuk Admin</Link>
                </Button>
            </div>
        </header>
    );
};

export default HomeHeader;

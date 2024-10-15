export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

export interface CategoryData {
    id: string;
    category_name: string;
    created_at: Date;
    updated_at: Date;
}

export interface CertificateData {
    id: string;
    category_id: string;
    categories?: CategoryData;
    nim: string;
    nama_lengkap: string;
    program_studi: "TI" | "SI";
    link: string;
    created_at: Date;
    updated_at: Date;
}

export interface CategoryParams {
    id: string;
    name: string;
}

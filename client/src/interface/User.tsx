import { GenderType } from "@/types/products.types";

export interface IUser {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    role: GenderType;
    address: string;
    password: String;
    createdAt: Date;
    updatedAt: Date
    provinceId: number
    province: any;
    cart: any[];
    buy: any[];
}


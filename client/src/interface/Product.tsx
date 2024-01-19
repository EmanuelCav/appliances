import { GenderType } from "@/types/products.types";

export interface IReducerProduct {
    categories: ICategory[];
    getCategories?: () => void;
}

export interface ICategory {
    _id: string;
    category: string;
    createdAt: string;
    updatedAt: string
}

export interface IProduct {
    id: number;
    title: string;
    description: string;
    images: any[];
    categoryId: number;
    category: ICategory;
    price: number;
    stock: number;
    isHide: boolean;
    brand: string;
    createdAt: Date;
    updatedAt: Date;
    cart: any[];
    buy: any[];
}



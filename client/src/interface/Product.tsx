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
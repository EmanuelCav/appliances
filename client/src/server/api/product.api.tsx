import { ICategory, IProduct } from "@/interface/Product"

export const getCategoriesApi = async (): Promise<ICategory[]> => {

    const response = await fetch('http://localhost:4000/categories', {
        method: 'GET'
    })
    
    const data = await response.json()

    return data

}

export const getProducts = async (): Promise<IProduct[]> => {

    const response = await fetch('http://localhost:4000/products', {
        method: 'GET'
    })

    const data = await response.json()

    return data

}
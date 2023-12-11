import { Request, Response } from "express";

import { prisma } from "../helper/prisma";

export const categories = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showCategories = await prisma.category.findMany()

        return res.status(200).json(showCategories)

    } catch (error) {
        throw error
    }

}

export const createCategory = async (req: Request, res: Response): Promise<Response> => {

    const { category } = req.body

    try {

        const newCategory = await prisma.category.create({
            data: {
                category
            }
        })

        return res.status(200).json(newCategory)

    } catch (error) {
        throw error
    }

} 

export const removeCategory = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const category = await prisma.category.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!category) {
            return res.status(200).json({ message: "Category does not exists" })
        }

        await prisma.category.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json({ message: "Category removed successfully" })

    } catch (error) {
        throw error
    }

}
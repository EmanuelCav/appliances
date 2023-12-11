import { Request, Response } from "express";

import { prisma } from "../helper/prisma";

export const products = async (req: Request, res: Response): Promise<Response> => {

    try {

        const products = await prisma.product.findMany({
            take: 10
        })

        return res.status(200).json(products)

    } catch (error) {
        throw error
    }

}

export const product = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const product = await prisma.product.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!product) {
            return res.status(400).json({ message: "Product does not exists" })
        }

        return res.status(200).json(product)

    } catch (error) {
        throw error
    }

}

export const createProduct = async (req: Request, res: Response): Promise<Response> => {

    const { title, description, category, price, stock, isHide } = req.body

    try {

        const newProduct = await prisma.product.create({
            data: {
                title,
                description,
                price,
                stock,
                isHide,
                category
            }
        })

        return res.status(200).json({ message: "createProduct" })

    } catch (error) {
        throw error
    }

}

export const removeProduct = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const product = await prisma.product.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!product) {
            return res.status(400).json({ message: "Product does not exists" })
        }

        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json({ message: "Product removed successfully" })

    } catch (error) {
        throw error
    }

}

export const updateProduct = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params
    const { title, description, price, stock, isHide } = req.body

    try {

        const product = await prisma.product.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!product) {
            return res.status(400).json({ message: "Product does not exists" })
        }

        const productUpdated = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {
                title,
                description,
                price,
                stock
            }
        })

        return res.status(200).json(productUpdated)

    } catch (error) {
        throw error
    }

}
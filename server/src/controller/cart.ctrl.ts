import { Request, Response } from "express";
import { prisma } from "../helper/prisma";

export const cartUser = async (req: Request, res: Response): Promise<Response> => {

    try {

        const cart = await prisma.cart.findMany({
            where: {
                user: req.user
            },
            include: {
                product: {
                    select: {
                        id: true,
                        title: true,
                        price: true
                    }
                }
            }
        })

        return res.status(200).json(cart)

    } catch (error) {
        throw error
    }

}

export const addProduct = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params
    const { quantity } = req.body

    try {

        const product = await prisma.product.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!product) {
            return res.status(400).json({ message: "Product does not exists" })
        }

        await prisma.user.update({
            where: {
                id: Number(req.user)
            },
            data: {
                Cart: {
                    create: [{
                        quantity,
                        product: {
                            connect: {
                                id: product.id
                            }
                        }
                    }]
                }
            }
        })

        return res.status(200).json()

    } catch (error) {
        throw error
    }

}
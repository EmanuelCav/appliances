import { Request, Response } from "express";
import { unlink } from 'fs-extra';

import { prisma } from "../helper/prisma";
import { cloud } from "../helper/images/cloud";
import { folder } from "../config/config";

export const products = async (req: Request, res: Response): Promise<Response> => {

    try {

        const products = await prisma.product.findMany({
            take: 10,
            include: {
                images: true
            }
        })

        return res.status(200).json(products)

    } catch (error) {
        throw error
    }

}

export const product = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const product = await prisma.product.findFirst({
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

export const categoryProducts = async (req: Request, res: Response): Promise<Response> => {

    const { category } = req.params

    try {

        const categorySelected = await prisma.category.findUnique({
            where: {
                category
            }
        })

        if (!categorySelected) {
            return res.status(400).json({ message: "Category does not exists" })
        }

        const products = await prisma.product.findMany({
            where: {
                categoryId: categorySelected.id
            }
        })

        return res.status(400).json(products)

    } catch (error) {
        throw error
    }

}

export const createProduct = async (req: Request, res: Response): Promise<Response> => {

    const { title, shortDescription, description, category, price, stock, brand, isHide } = req.body

    try {

        const categoryProduct = await prisma.category.findUnique({
            where: {
                category
            }
        })

        if (!categoryProduct) {
            return res.status(400).json({ message: "Category does not exists" })
        }

        const newProduct = await prisma.product.create({
            data: {
                title,
                // shortDescription,
                description,
                price: Number(price),
                stock: Number(stock),
                isHide: Boolean(isHide),
                category: {
                    connect: {
                        category: categoryProduct.category
                    }
                },
                brand
            }
        })

        for (let i = 0; i < (req.files?.length as number); i++) {

            const result = await cloud.uploader.upload((req.files as Express.Multer.File[])[i].path, {
                folder: `${folder}`,
                use_filename: true
            })

            await prisma.product.update({
                where: {
                    id: newProduct.id
                },
                data: {
                    images: {
                        create: [{
                            image: result.secure_url,
                            imageId: result.public_id
                        }]
                    }
                }
            })

            await unlink((req.files as Express.Multer.File[])[i].path)

        }

        return res.status(200).json({ message: "Product created successfully" })

    } catch (error) {
        throw error
    }

}

export const removeProduct = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const product = await prisma.product.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!product) {
            return res.status(400).json({ message: "Product does not exists" })
        }

        const images = await prisma.image.findMany({
            where: {
                productId: product.id
            }
        })

        for (let i = 0; i < images.length; i++) {
            await cloud.uploader.destroy(images[i].imageId)
            await prisma.image.delete({
                where: {
                    id: images[i].id
                }
            })
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
    const { title, description, category, price, stock, brand, isHide } = req.body

    try {

        const product = await prisma.product.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                category: true
            }
        })

        if (!product) {
            return res.status(400).json({ message: "Product does not exists" })
        }

        let categoryProduct

        if (category) {
            categoryProduct = await prisma.category.findUnique({
                where: {
                    category
                }
            })
        }

        if (!categoryProduct) {
            return res.status(400).json({ message: "Category does not exists" })
        }

        if ((req.files?.length as number) > 0) {
            const images = await prisma.image.findMany({
                where: {
                    productId: product.id
                }
            })

            for (let i = 0; i < images.length; i++) {
                await cloud.uploader.destroy(images[i].imageId)
                await prisma.image.delete({
                    where: {
                        id: images[i].id
                    }
                })
            }

            for (let i = 0; i < (req.files?.length as number); i++) {

                const result = await cloud.uploader.upload((req.files as Express.Multer.File[])[i].path, {
                    folder: `${folder}`,
                    use_filename: true
                })

                await prisma.product.update({
                    where: {
                        id: Number(id)
                    },
                    data: {
                        images: {
                            create: [{
                                image: result.secure_url,
                                imageId: result.public_id
                            }]
                        }
                    }
                })

                await unlink((req.files as Express.Multer.File[])[i].path)

            }
        }

        await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {
                title: title ? title : product.title,
                description: description ? description : product.description,
                price: price ? Number(price) : product.price,
                stock: stock ? Number(stock) : product.stock,
                category: category ? {
                    connect: {
                        category: categoryProduct.category
                    }
                } : {
                    connect: {
                        category: product.category.category
                    }
                },
                brand: brand ? brand : product.brand,
                isHide: isHide ? Boolean(isHide) : product.isHide
            }
        })

        return res.status(200).json({ message: "Product updated successfully" })

    } catch (error) {
        throw error
    }

}
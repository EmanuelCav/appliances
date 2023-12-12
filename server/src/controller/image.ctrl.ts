import { Request, Response } from "express";

import { prisma } from "../helper/prisma";
import { cloud } from "../helper/images/cloud";

export const images = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showImages = await prisma.image.findMany()

        return res.status(200).json(showImages)

    } catch (error) {
        throw error
    }

}


export const removeImage = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const image = await prisma.image.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!image) {
            return res.status(200).json({ message: "Image does not exists" })
        }

        await cloud.uploader.destroy(image.imageId)

        await prisma.image.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json({ message: "Image removed successfully" })

    } catch (error) {
        throw error
    }

}
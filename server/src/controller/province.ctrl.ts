import { Request, Response } from "express";

import { prisma } from "../helper/prisma";

export const provinces = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showProvinces = await prisma.province.findMany()

        return res.status(200).json(showProvinces)

    } catch (error) {
        throw error
    }

}

export const createProvince = async (req: Request, res: Response): Promise<Response> => {

    const { province } = req.body

    try {

        const newProvince = await prisma.province.create({
            data: {
                province
            }
        })

        return res.status(200).json(newProvince)

    } catch (error) {
        throw error
    }

} 

export const removeProvince = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const province = await prisma.province.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!province) {
            return res.status(200).json({ message: "Province does not exists" })
        }

        await prisma.province.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json({ message: "Province removed successfully" })

    } catch (error) {
        throw error
    }

}
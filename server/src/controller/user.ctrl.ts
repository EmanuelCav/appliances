import { Request, Response } from "express";
import { comparePassword, generateHash, generateToken } from "../helper/encrypt";

import { prisma } from '../helper/prisma';

export const users = async (req: Request, res: Response): Promise<Response> => {

    try {

        const users = await prisma.user.findMany({
            include: {
                province: {
                    select: {
                        province: true
                    }
                }
            },
            take: 10
        })

        return res.status(200).json(users)

    } catch (error) {
        throw error
    }

}

export const user = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                province: {
                    select: {
                        province: true
                    }
                }
            }
        })

        if (!user) {
            return res.status(400).json({ message: "User does not exists" })
        }

        return res.status(200).json(user)

    } catch (error) {
        throw error
    }

}

export const register = async (req: Request, res: Response): Promise<Response> => {

    const { name, surname, email, address, phone, role, password, province } = req.body

    try {

        const pass = await generateHash(password)

        const userProvince = await prisma.province.findUnique({
            where: {
                province
            }
        })

        if (!userProvince) {
            return res.status(400).json({ message: "Province does not exists" })
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                surname,
                email,
                address,
                phone,
                password: pass,
                role,
                province: {
                    connect: {
                        province: userProvince.province
                    }
                }
            }
        })

        const token = generateToken(newUser.id)

        return res.status(200).json({
            user: newUser,
            token
        })

    } catch (error) {
        throw error
    }

}

export const login = async (req: Request, res: Response): Promise<Response> => {

    const { email, password } = req.body

    try {

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(400).json({ message: "Fields do not match" })
        }

        const validation = await comparePassword(password, user.password)

        if (!validation) {
            return res.status(400).json({ message: "Fields do not match" })
        }

        return res.status(200).json(user)

    } catch (error) {
        throw error
    }

}

export const removeUser = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!user) {
            return res.status(400).json({ message: "User does not exists" })
        }

        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json({
            message: "User removed successfully"
        })

    } catch (error) {
        throw error
    }

}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params
    const { address, phone, province } = req.body

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!user) {
            return res.status(400).json({ message: "User does not exists" })
        }

        const userUpdated = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                address,
                phone,
                province
            }
        })

        return res.status(200).json(userUpdated)

    } catch (error) {
        throw error
    }

}
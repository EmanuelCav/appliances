import { Request, Response, response } from "express";
import { PrismaClient } from '@prisma/client';
import { comparePassword, generateHash, generateToken } from "../helper/encrypt";

const prisma = new PrismaClient()

export const users = async (req: Request, res: Response): Promise<Response> => {

    try {

        const users = await prisma.user.findMany()

        return res.status(200).json(users)

    } catch (error) {
        throw error
    }

}

export const register = async (req: Request, res: Response): Promise<Response> => {

    const { name, surname, email, address, phone, password } = req.body

    try {

        const pass = await generateHash(password)

        const newUser = await prisma.user.create({
            data: {
                name,
                surname,
                email,
                address,
                phone,
                password: pass,
                role: 'CLIENT'
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
                id: parseInt(id)
            }
        })

        if (!user) {
            return res.status(400).json({ message: "User does not exists" })
        }

        await prisma.user.delete({
            where: {
                id: parseInt(id)
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
    const { name, surname, email, address, phone } = req.body

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
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
                name,
                surname,
                email,
                address,
                phone
            }
        })

        return res.status(200).json(userUpdated)

    } catch (error) {
        throw error
    }

}
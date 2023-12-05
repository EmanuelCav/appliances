import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { generateHash, generateToken } from "helper/encrypt";

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
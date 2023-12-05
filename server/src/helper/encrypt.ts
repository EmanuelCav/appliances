import { genSalt, hash } from "bcryptjs";
import jwt from 'jsonwebtoken';

import { jwt_key } from "../config/config";

export const generateHash = async (password: string): Promise<string> => {

    const salt: string = await genSalt(8)
    
    return await hash(password, salt)

}

export const generateToken = async (id: number): Promise<string> => {

    const token: string = jwt.sign({ id }, `${jwt_key}`, {
        expiresIn: '30d'
    })

    return token

}

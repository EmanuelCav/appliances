import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

import { jwt_key } from "../../config/config";

import { IValidation } from "../../interface/interface";

const auth = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(" ")[1]

    if(!token) {
        return res.status(500).json({ message: "Token does not exists" })
    }

    const validation = jwt.verify(token, `${jwt_key}`) as IValidation

    if(!validation) {
        return res.status(500).json({ message: "Token is not valid" })
    }

    req.user = validation.id

    next()

}

export default auth


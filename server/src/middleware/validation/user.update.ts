import { Request, Response, NextFunction } from 'express';

import { numberValidation } from '../../helper/validations';
import { prisma } from "../../helper/prisma";

const updateUserValid = async (req: Request, res: Response, next: NextFunction) => {

    const { address, phone, province } = req.body

    if(!address || !phone || !province) {
        return res.status(400).json({ message: "There are empty fields. Please complete" })
    }

    if(!numberValidation.test(phone)) {
        return res.status(400).json({ message: "Please ensure have wrote numbers in the phone field" })
    }

    const provinceExists = await prisma.province.findUnique({
        where: {
            province
        }
    })

    if(!provinceExists) {
        return res.status(400).json({ message: "Province does not exists" })
    }

    next()

}

export default updateUserValid
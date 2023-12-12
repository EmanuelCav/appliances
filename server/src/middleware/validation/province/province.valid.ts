import { Request, Response, NextFunction } from 'express';

import { prisma } from '../../../helper/prisma';

const provinceValid = async (req: Request, res: Response, next: NextFunction) => {

    const { province } = req.body

    if (!province) {
        return res.status(400).json({ message: "There are empty fields. Please complete" })
    }

    const provinceLocation = await prisma.province.findUnique({
        where: {
            province
        }
    })

    if (provinceLocation) {
        return res.status(400).json({ message: "Province already exists" })
    }

    next()

}

export default provinceValid
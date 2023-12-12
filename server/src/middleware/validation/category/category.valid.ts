import { Request, Response, NextFunction } from 'express';

import { prisma } from '../../../helper/prisma';

const categoryValid = async (req: Request, res: Response, next: NextFunction) => {

    const { category } = req.body

    if (!category) {
        return res.status(400).json({ message: "There are empty fields. Please complete" })
    }

    const categoryProduct = await prisma.category.findUnique({
        where: {
            category
        }
    })

    if (categoryProduct) {
        return res.status(400).json({ message: "Category already exists" })
    }

    next()

}

export default categoryValid
import { Request, Response, NextFunction } from 'express';

const categoryValid = async (req: Request, res: Response, next: NextFunction) => {

    const { category } = req.body

    if (!category) {
        return res.status(400).json({ message: "There are empty fields. Please complete" })
    }

    next()

}

export default categoryValid
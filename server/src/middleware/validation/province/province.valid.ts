import { Request, Response, NextFunction } from 'express';

const provinceValid = async (req: Request, res: Response, next: NextFunction) => {

    const { province } = req.body

    if (!province) {
        return res.status(400).json({ message: "There are empty fields. Please complete" })
    }

    next()

}

export default provinceValid
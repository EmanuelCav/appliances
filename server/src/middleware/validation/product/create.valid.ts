import { Request, Response, NextFunction } from 'express';
import { numberValidation } from '../../../helper/validations';

const createValid = async (req: Request, res: Response, next: NextFunction) => {

    const { title, description, category, price, stock, isHide } = req.body

    if (!title || !description || !category || !price || !stock || !isHide) {
        return res.status(400).json({ message: "There are empty fields. Please complete" })
    }

    const isPriceValid = numberValidation.test(price)

    if (!isPriceValid) {
        return res.status(400).json({ message: "Price is not valid" })
    }

    const isStockValid = numberValidation.test(stock)

    if (!isStockValid) {
        return res.status(400).json({ message: "Stock is not valid" })
    }

    if (!req.files) {
        return res.status(400).json({ message: "You must upload files" })
    }

    next()

}

export default createValid
import { Request, Response, NextFunction } from 'express';
import { numberValidation } from '../../../helper/validations';

const updateValid = async (req: Request, res: Response, next: NextFunction) => {

    const { price, stock } = req.body

    const isPriceValid = numberValidation.test(price)

    if (!isPriceValid) {
        return res.status(400).json({ message: "Price is not valid" })
    }

    const isStockValid = numberValidation.test(stock)

    if (!isStockValid) {
        return res.status(400).json({ message: "Stock is not valid" })
    }

    next()

}

export default updateValid
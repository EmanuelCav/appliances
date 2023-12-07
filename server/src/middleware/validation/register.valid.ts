import { Request, Response, NextFunction } from 'express';

import { numberValidation, stringValidation, validateEmail } from '../../helper/validations';
import { prisma } from "../../helper/prisma";

const registerValid = async (req: Request, res: Response, next: NextFunction) => {

    const { name, surname, email, address, phone, password, confirmPassword, province } = req.body

    if(!name || !surname || !email || !address || !phone || !password || !confirmPassword || !province) {
        return res.status(400).json({ message: "There are empty fields. Please complete" })
    }

    if(password.length < 6) {
        return res.status(400).json({ message: "Password must have more than 5 characters" })
    }

    if(password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" })
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(user) {
        return res.status(401).json({ message: "User already exists" })
    }

    if(!validateEmail(email)) {
        return res.status(400).json({ message: "Please ensure have wrote an email correctly" })
    }

    if(!stringValidation.test(name)) {
        return res.status(400).json({ message: "Please ensure have wrote characters in the name field" })
    }

    if(!stringValidation.test(surname)) {
        return res.status(400).json({ message: "Please ensure have wrote characters in the surname field" })
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

export default registerValid
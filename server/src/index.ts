import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

dotenv.config()

import { port } from './config/config';

const app = express()

app.set('port', port)

import userRoute from './routes/user.routes';
import productRoute from './routes/product.routes';
import categoryRoute from './routes/category.routes';

app.use(morgan('dev'))
app.use(cors())
app.use(express.json({ limit: '30mb' }))
app.use(express.urlencoded({ extended: true, limit: '30mb' }))

app.use(userRoute)
app.use(productRoute)
app.use(categoryRoute)

app.use(express.static(path.join(__dirname, "../public")))

app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
})
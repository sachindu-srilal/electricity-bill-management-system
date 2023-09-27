
import express, {json} from 'express'
import cors from 'cors'
import {router as Router} from './api/httpCustomerController'
import env from 'dotenv'

env.config();
const app =express();
app.use(cors());
app.use(json())
app.listen(process.env.APP_PORT,()=>{console.log("server has started")});
app.use('/api/v1/customers',Router);



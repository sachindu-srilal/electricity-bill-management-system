
import express, {json} from 'express'
import cors from 'cors'
import {router as Router} from './api/httpCustomerController'
import env from 'dotenv'

env.config();
const app =express();
app.use(cors());
app.use(json());
app.use('/api/v1/customers',Router);
const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
});


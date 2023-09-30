import express, {RequestHandler} from 'express'
import {Record} from "../dto/record";
import {saveRecord} from "../business/business";
import {displayDetails} from "../business/business";
import {findByAccount, findByDateAndAccount} from '../dao/dao';
import Joi, {ValidationError} from 'joi'
const dao = require('../dao/dao');

const recordValidator: RequestHandler = (req, res, next) => {
    const record = req.body as Record;
    console.log(record.date)
    try {
        Joi.assert(record, Record.SCHEMA, {abortEarly: false});
        next();
    } catch (e) {
        if (e instanceof ValidationError) res.status(400).json(e.details);
    }
};


export const router = express.Router();

router.post("/", recordValidator, async (req, res) => {
    const record = req.body as Record;
    if (!await findByAccount(record.account)) {
        res.status(404).send("Invalid Account Number");
        return;
    }
    if (await findByDateAndAccount(record.account, record.date)) {
        res.status(404).send("Duplicate Entry");
        return;
    }

    const result = await saveRecord(record);
    res.sendStatus(201);

});

router.get("/:account", async (req, res) => {
    // should have minimum 3 readings
    const bool = await findByAccount(+req.params.account);
    if (bool) {
        const result = await displayDetails(+req.params.account);
        res.send(result);
    } else {
        res.status(404).send("Invalid Account Number");
    }
});


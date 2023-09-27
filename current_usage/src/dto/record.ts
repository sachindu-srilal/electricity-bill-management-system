import Joi from 'joi'
export class Record{
    constructor(public account:number,public reading:number,public date:Date) {
    }
    public static readonly SCHEMA = Joi.object({
        account: Joi.number().required(),
        reading: Joi.number().required(),
        date: Joi.date().required()
    });
}
import {Record} from '../dto/record'
const dbConnection = require("../db/dbcp");
const queries = require("./query");



    export async function saveEntity(entity:Record) {
        let con = await dbConnection();
        try {
            await con.query("START TRANSACTION");
            let savedTodo = await con.query(
                queries.insert_record,
                [entity.account, entity.reading,entity.date]
            );
            await con.query("COMMIT");
        } catch (ex) {
            await con.query("ROLLBACK");
            console.log(ex);
            throw ex;
        } finally {
            await con.release();
            await con.destroy();
        }
    }

   export async function updateEntity(entity:Record) {
        let con = await dbConnection();
        try {
            await con.query("START TRANSACTION");
            await con.query(queries.update_record, [
                entity.reading,
                new Date(),
            ]);
            await con.query("COMMIT");
            return true;
        } catch (ex) {
            await con.query("ROLLBACK");
            console.log(ex);
            throw ex;
        } finally {
            await con.release();
            await con.destroy();
        }
    }

    export async function deleteEntity(account:number) {
        let con = await dbConnection();
        try {
            await con.query("START TRANSACTION");
            await con.query(queries.delete_record, [account]);
            await con.query("COMMIT");
            return true;
        } catch (ex) {
            await con.query("ROLLBACK");
            console.log(ex);
            throw ex;
        } finally {
            await con.release();
            await con.destroy();
        }
    }

    export async function readEntities(account:number) {
        let con = await dbConnection();
        try {
            await con.query("START TRANSACTION");
            let record = await con.query(queries.read_record, [account]);
            await con.query("COMMIT");
            record = JSON.parse(JSON.stringify(record));
            return record;
        } catch (ex) {
            console.log(ex);
            throw ex;
        } finally {
            await con.release();
            await con.destroy();
        }
    }
        export async function findByAccount(account:number) {
            let con = await dbConnection();
            try {
                let record = await con.query(queries.findById_record,[account]);
                return record.length? true:false
            } catch (ex) {
                console.log(ex);
                throw ex;
            } finally {
                await con.release();
                await con.destroy();
            }

};
export async function findByDateAndAccount(account:number,date:Date) {
    let con = await dbConnection();
    try {
        let record = await con.query(queries.findByDateAndAccount_record,[account,date]);
        return record.length? true:false;
    } catch (ex) {
        console.log(ex);
        throw ex;
    } finally {
        await con.release();
        await con.destroy();
    }

};
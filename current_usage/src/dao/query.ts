module.exports = {
    insert_record: `INSERT INTO customer(account, reading,date) VALUES(?, ?,?)`,
    read_record: `SELECT id,account,reading, date FROM customer where account=? order by date desc limit 3`,
    update_record: `UPDATE customer SET customer.reading = ?, customer.date = ? WHERE customer.account = ?`,
    delete_record: `DELETE FROM tbl_todo WHERE tbl_todo.id = ?`,
    findById_record:'select * from customer where customer.account =?',
    findByDateAndAccount_record:'select * from customer where customer.account =? and customer.date=?'
}
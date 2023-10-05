module.exports = {
    insert_record: `INSERT INTO customer(account, reading,date) VALUES(?, ?,?)`,
    read_record: `SELECT id,account,reading, date FROM customer where account=? order by date desc `,
    update_record: `UPDATE customer SET customer.reading = ?, customer.date = ? WHERE customer.account = ?`,
    delete_record: `DELETE FROM tbl_todo WHERE tbl_todo.id = ?`,
    findById_record:'SELECT * FROM customers WHERE customers.account_number =?',
    findByDateAndAccount_record:'SELECT * FROM customer WHERE customer.account =? and customer.date=?'
}

//limit 3
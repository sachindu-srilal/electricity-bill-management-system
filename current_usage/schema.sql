CREATE TABLE IF NOT EXISTS customers (
    account_number INT PRIMARY KEY ,
    customer_name VARCHAR(100) NOT NULL
    );



CREATE TABLE IF NOT EXISTS customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account INT NOT NULL ,
    reading INT NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (account) REFERENCES customers (account_number)
);
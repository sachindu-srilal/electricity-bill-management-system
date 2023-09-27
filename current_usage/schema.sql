CREATE TABLE IF NOT EXISTS customer (
                                        id INT AUTO_INCREMENT PRIMARY KEY,
                                        account INT NOT NULL ,
                                        reading INT NOT NULL,
                                        date DATE NOT NULL
);
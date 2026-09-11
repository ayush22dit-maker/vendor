CREATE DATABASE IF NOT EXISTS vendorestore;
USE vendorestore;



CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (role_name)
VALUES
    ('vendor'),
    ('customer');



CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    reset_otp VARCHAR(6) DEFAULT NULL,
    reset_otp_expiry DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (role_id)
    REFERENCES roles(id)
);



CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    status ENUM('Active','Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vendor_id INT NOT NULL,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status ENUM('Active','Inactive') DEFAULT 'Active',
    price DECIMAL(10,2) NOT NULL,
    discount DECIMAL(5,2) DEFAULT 0,
    stock_quantity INT DEFAULT 0,
    images JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (vendor_id)
    REFERENCES users(id),

    FOREIGN KEY (category_id)
    REFERENCES categories(id)
);



DELIMITER $$

CREATE PROCEDURE sp_RegisterUser(
    IN p_role_id INT,
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255)
)
BEGIN

    INSERT INTO users(
        role_id,
        name,
        email,
        password
    )
    VALUES(
        p_role_id,
        p_name,
        p_email,
        p_password
    );

    SELECT
        id,
        role_id,
        name,
        email,
        created_at
    FROM users
    WHERE id = LAST_INSERT_ID();

END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_LoginUser(
    IN p_email VARCHAR(100)
)
BEGIN

    SELECT
        u.id,
        u.name,
        u.email,
        u.password,
        u.role_id,
        r.role_name
    FROM users u
    INNER JOIN roles r
        ON u.role_id = r.id
    WHERE u.email = p_email;

END $$

DELIMITER ;



DELIMITER $$

CREATE PROCEDURE sp_ForgotPassword(
    IN p_email VARCHAR(100)
)
BEGIN

    SELECT
        id,
        name,
        email
    FROM users
    WHERE email = p_email;

END $$

DELIMITER ;



DELIMITER $$

CREATE PROCEDURE sp_SaveOtp(
    IN p_email VARCHAR(100),
    IN p_otp VARCHAR(6)
)
BEGIN

    UPDATE users
    SET
        reset_otp = p_otp,
        reset_otp_expiry = DATE_ADD(
            NOW(),
            INTERVAL 5 MINUTE
        )
    WHERE email = p_email;

END $$

DELIMITER ;



DELIMITER $$

CREATE PROCEDURE sp_VerifyResetOtp(
    IN p_email VARCHAR(100),
    IN p_otp VARCHAR(6)
)
BEGIN

    SELECT
        id,
        name,
        email
    FROM users
    WHERE email = p_email
      AND reset_otp = p_otp
      AND reset_otp_expiry > NOW();

END $$

DELIMITER ;



DELIMITER $$

CREATE PROCEDURE sp_ResetPassword(
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    IN p_otp VARCHAR(6)
)
BEGIN

    UPDATE users
    SET
        password = p_password,
        reset_otp = NULL,
        reset_otp_expiry = NULL
    WHERE email = p_email
      AND reset_otp = p_otp
      AND reset_otp_expiry > NOW();

END $$

DELIMITER ;


DELIMITER $$
CREATE PROCEDURE sp_Addcategory(
IN p_name VARCHAR(100),
IN p_description TEXT,
IN p_status VARCHAR(20)
 )
 BEGIN
 INSERT INTO categories(name , description , status)
 VALUES(p_name , p_description, p_status);
 SELECT 
 id ,
 name ,
 description,
 created_at
 FROM categories
 WHERE id = LAST_INSERT_ID();
 END $$
 DELIMITER ; 
 
 
 DELIMITER $$
 CREATE PROCEDURE  sp_Getcategories()
BEGIN
SELECT 
id ,
 name ,
 description ,
 status,
 created_at
 FROM categories
 ORDER BY id ASC;
 END $$
 DELIMITER ; 
 
 DELIMITER $$
 CREATE PROCEDURE sp_GetCategoryById(
 IN p_id INT 
 )
 BEGIN
 SELECT 
 id ,
 name ,
 description,
 status,
 created_at
 FROM categories
 WHERE id  = p_id ; 
 END $$ 
 DELIMITER ; 
 


 DELIMITER $$
 CREATE PROCEDURE sp_Updatecategory(
 IN p_id INT,
 IN p_name VARCHAR(100),
IN p_description TEXT,
IN p_status VARCHAR(20)
)
BEGIN
UPDATE categories
SET
name = p_name , 
description = p_description ,
status = p_status
WHERE id = p_id;
SELECT * FROM categories
WHERE id = p_id ; 
END $$
DELIMITER ; 

DELIMITER $$
CREATE PROCEDURE sp_Deletecategory(
IN p_id INT)
BEGIN 
DELETE FROM categories
WHERE id = p_id ;
END $$
DELIMITER ;



DELIMITER $$ 
 CREATE PROCEDURE  sp_addProducts(

 IN p_category_id INT,
 IN p_vendor_id INT ,
 IN p_name VARCHAR(100),
 IN p_description TEXT ,
 IN p_status  VARCHAR(20),
 IN p_price DECIMAL(10,2),
 IN p_discount DECIMAL(5,2),
 IN p_stock_quantity INT,
 IN p_images JSON
 
 )
 BEGIN
 INSERT INTO products(
 category_id ,
 vendor_id , 
 name , 
 description ,
 status , 
 price ,
 discount,
 stock_quantity,
 images
 )
 VALUES(p_category_id ,
 p_vendor_id ,
 p_name ,
 p_description ,
 p_status,
 p_price,
 p_discount,
 p_stock_quantity,
 p_images
 );
 
 SELECT 
 id , 
 category_id ,
 vendor_id ,
 name ,
 description ,
 status,
 price , 
 discount ,
 stock_quantity,
 images,
 created_at,
updated_at
 FROM products
WHERE id = LAST_INSERT_ID();
END $$
DELIMITER ; 


 DELIMITER $$
 CREATE PROCEDURE getProduct()
 BEGIN 
 SELECT *  FROM  products;
 END $$
 DELIMITER ;
 
 
 DELIMITER $$
 CREATE PROCEDURE getProductById(
 IN p_id INT )
 BEGIN
 SELECT * FROM products
 WHERE id = p_id ;
 END $$
 DELIMITER ; 
 
 DELIMITER $$
 CREATE PROCEDURE updateProducts(
 IN p_id INT ,
 IN p_category_id INT,
 IN p_vendor_id INT ,
 IN p_name VARCHAR(100),
 IN p_description TEXT ,
 IN p_status  VARCHAR(20),
 IN p_price DECIMAL(10,2),
 IN p_discount DECIMAL(5,2),
 IN p_stock_quantity INT,
 IN p_images JSON
 )
 BEGIN 
 UPDATE products
 SET 
 category_id = p_category_id ,
 
 name = p_name ,
 description  = p_description ,
 status = p_status ,
 price = p_price ,
 discount = p_discount ,
 stock_quantity = p_stock_quantity ,
 images = p_images 
 WHERE  id = p_id  AND vender_id = p_vendor_id ;
 END $$ 
 DELIMITER ; 
 
 
 DELIMITER $$
 CREATE PROCEDURE DeleteProduct(
 IN p_id INT )
 BEGIN 
 DELETE FROM  products
 WHERE id = p_id 
 AND vendor_id = p_vendor_id;
 END $$
 DELIMITER ; 
 




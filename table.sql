create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(50),
    status varchar(20),
    role varchar(20),
    UNIQUE(email)
); 

INSERT INTO user (name, contactNumber, email, password, status, role) 
VALUES ('Admin', '121212', 'Admin@gmail.com', 'Admin', 'true', 'admin');

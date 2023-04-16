DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;

USE cms_db;

CREATE TABLE Departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dep_name VARCHAR(100) NOT NULL
);


CREATE TABLE Roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100)  NOT NULL,
  department_id INT NOT NULL,
  salary DECIMAL NOT NULL,
  FOREIGN KEY (department_id) REFERENCES Departments(id)
  ON DELETE CASCADE
);

CREATE TABLE Employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100)  NOT NULL,
  last_name VARCHAR(100)  NOT NULL,
  role_id INT ,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES Roles(id)
  ON DELETE CASCADE, 
  FOREIGN KEY (manager_id) REFERENCES Employees(id) ON DELETE CASCADE
);
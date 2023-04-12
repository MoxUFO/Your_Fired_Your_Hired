INSERT INTO Departments (dep_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO Employees (first_name,last_name,title,department,salary,manager)
VALUES ('John', 'Doe','Sales Lead','Sales',100000),
       ('Mike', 'Chan','Salesperson','Sales', 80000),
       ('Ashley','Rodriguez','Lead Engineer', 'Enginerring', 150000),
       ('Kevin','Tupik','Software Engineer', 'Enginerring', 120000),
       ('Kunal','Singh','Account Manager', 'Finance', 160000),
       ('Malia','Brown','Accountant', 'Finance', 125000),
       ('Sarah','Lourd','Legal Team Lead', 'Legal',250000),
       ('Tom','Allen','Lawyer', 'Legal',190000);

INSERT INTO Role (title, department,salary)
VALUES ('Sales Lead','Sales',100000),
       ('Salesperson','Sales', 80000),
       ('Lead Engineer', 'Enginerring', 150000),
       ('Software Engineer', 'Enginerring', 120000),
       ('Account Manager', 'Finance', 160000),
       ('Accountant', 'Finance', 125000),
       ('Legal Team Lead', 'Legal',250000),
       ('Lawyer', 'Legal',190000);
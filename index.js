const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "crash2010",
    database: "cms_db",
  },
  console.log(`Connected to the cms_db database.`)
);

async function menu() {
  const { menuChoice } = await inquirer.prompt([
    {
      type: "list",
      name: "menuChoice",
      message: "What would you like to do?",
      choices: [
        "View all departments.",
        "View all roles.",
        "View all employees.",
        "Add department.",
        "Add employee.",
        "Add role.",
        "Update employee role.",
        "Exit!",
      ],
    },
  ]);
  console.log(menuChoice);
  switch (menuChoice) {
    case "View all employees.":
      showEmployees();
      break;
    case "Add employee.":
      addEmployee();
      break;
    case "Update employee role.":
      updateRole();
      break;
    case "View all roles.":
      showRoles();
      break;
    case "Add role.":
      addRole();
      break;
    case "View all departments.":
      showDepartments();
      break;
    case "Add department.":
      addDeparement();
      break;
    default:
      "Exit!";
      return;
  }
}

function showDepartments() {
  const sql = `SELECT * FROM Departments`;
  db.query(sql, (err, result) => {
    console.table(result);
    if (err) {
      console.log(err);;
       return;
    }
  });
  //   menu()
}

async function addDeparement(params) {
  const { dep_name } = await inquirer.prompt([
    {
      type: "input",
      name: "dep_name",
      message: "What is the Department name?",
    },
  ]);
  console.log(dep_name);
  const sql = `INSERT INTO Departments (dep_name)
      VALUES ("${dep_name}");`;
  db.query(sql, (err, result) => {
    console.table(result);
    if (err) {
      console.log(err);;
      return;
    }
  });
  //   menu()
}

function showEmployees() {
  const sql = `SELECT e.id, e.first_name, e.last_name, e.manager_id, r.title, d.dep_name FROM employees e JOIN Roles r ON e.role_id = r.id  JOIN Departments d ON r.department_id = d.id; `;
  db.query(sql, (err, results) => {
    console.table(results);
    if (err) {
      console.log(err);;
      return;
    }
  });
  //   menu()
}

async function addEmployee() {

  const personAnswers = []
  const roleAnswers = []
  const personQuery = `SELECT * FROM Employees`
    db.query(personQuery, (err, results) => {
      for (let i = 0; i < results.length; i++) {
       personAnswers.push(results[i].first_name + " " + results[i].last_name)
      }
    });
    const roleQuery = `SELECT * FROM Roles`
    db.query(roleQuery, (err, results) => {
      for (let i = 0; i < results.length; i++) {
       roleAnswers.push(results[i].title)
      }
    });

  const { firstName, lastName, assignedRole, manager } = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What employee's first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What employee's last name?",
    },
    {
      type: "list",
      name: "assignedRole",
      message: "What employee's role?",
      choices: roleAnswers
    },
    {
      type: "list",
      name: "manager",
      message: "Who is the employee's manager?",
      choices: personAnswers,
    },
  ]);
  const first = manager.split(" ")[0];
  const last = manager.split(" ")[1];
  const ManagerId = ` SELECT id FROM Employees WHERE  first_name = '${first}' AND last_name = '${last}';`;

  db.query(ManagerId, (err, result) => {
    const useableId = result[0].id;
    const sql = `INSERT INTO Employees (first_name,last_name,role_id,manager_id)
    VALUES ('${firstName}', '${lastName}',null ,${useableId});`;

  db.query(sql, (err, result) => {
      console.log(err);
    });
  });

  const roleId = `SELECT id FROM Roles WHERE title = "${assignedRole}";`;
  db.query(roleId, (err, result) => {
    const role = result[0].id;
    // console.log(result[0].id);
    const sql = `UPDATE Employees 
    SET role_id = ${role}
    WHERE first_name = "${firstName}" AND last_name = "${lastName}";`;
    db.query(sql, (err, result) => {
      console.log(result);
      console.log(err);
    });
  });
  //   menu()
}

function showRoles() {
  const sql = `SELECT r.id, r.title, r.salary, d.dep_name AS department FROM roles r JOIN Departments d ON r.department_id = d.id;`;
  db.query(sql, (err, results) => {
    console.table(results);
    if (err) {
      console.log(err);;
      return;
    }
  });
  // menu()
}

async function addRole() {
  const answers = []
  const query = `SELECT * FROM Departments`
    db.query(query, (err, results) => {
      for (let i = 0; i < results.length; i++) {
       answers.push(results[i].dep_name)
      }
    });
    console.log(answers);
  const {newRole,salary,depName} = await inquirer.prompt([
    {
      type: "input",
      name: "newRole",
      message: "What is the name of the role?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary of the role?",
    },
    {
      type: "list",
      name: "depName",
      message: "What department does the role belong to?",
      choices:answers ,
    },
  ])
  const departmentId = `SELECT id FROM Departments WHERE dep_name = "${depName}" `
  db.query(departmentId, (err,result) =>{
  const depId =result[0].id;
  const sql = `INSERT INTO Roles  (title, department_id,salary) VALUES ("${newRole}",${depId},${salary})`
  db.query(sql, (err,result) =>{
    console.log(err);
  })
 })
}

async function updateRole() {
  const personAnswers = []
  const query = `SELECT * FROM Employees`
  let employeeList = await db.promise().query(query);
  // console.log(employeeList);
    for (let i = 0; i < employeeList[0].length; i++) {
     personAnswers.push(employeeList[0][i].first_name + " " + employeeList[0][i].last_name)
    }
  
    const roleAnswers = []
    const roleQuery = `SELECT * FROM Roles`
    let roleList = await db.promise().query(roleQuery);

      for (let i = 0; i < roleList[0].length; i++) {
       roleAnswers.push(roleList[0][i].title)
      }
      // console.log(roleAnswers, personAnswers);
    
  const {personName,newRole} = await inquirer.prompt([

    {
      type: "list",
      name: "personName",
      message: "Which employee's role do you want to update?",
      choices: personAnswers ,
    },
    {
      type: "list",
      name: "newRole",
      message: "What is the role do you want to assaign?",
      choices: roleAnswers ,
    },
  ])
  const first = personName.split(" ")[0];
  const last = personName.split(" ")[1];
  const departmentId = `SELECT id FROM Roles WHERE title = "${newRole}" `
  db.query(departmentId, (err,result) =>{
  const roleId =result[0].id;
  // console.log(first + " " + last);
  const sql = ` SET SQL_SAFE_UPDATES = 0; UPDATE Employees SET role_id = 4 WHERE first_name = 'fsf' AND last_name = 'sdf'; SET SQL_SAFE_UPDATES = 1;`
  db.query(sql, (err,result) =>{
    console.log(err);
  })
 })
}

menu();

// use async await for your queries and set up your connection so you don't use callbacks in mysql

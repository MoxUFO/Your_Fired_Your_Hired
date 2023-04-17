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

//  async function getManagerId() {
//   let sql = ` SELECT * FROM Employees;`;
//   let theTable = await  db.query(sql, (err, result) => {
//     return result;
//   });
//   console.log(theTable); 
// }



// getManagerId()

async function menu() {
  const { menuChoice } = await inquirer.prompt([
    {
      type: "list",
      name: "menuChoice",
      message: "What would you like to do?",
      choices: [
        "View all employees.",
        "Add employee.",
        "Update empolyee role.",
        "View all roles.",
        "Add role.",
        "View all departments.",
        "Add department",
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
    case "Update empolyee role.":
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
    case "Add department":
      addDeparement();
      break;
    default:
      "Exit!";
      return;
  }
}
// let test = function getAllManagers() {
//   const sql = `SELECT id FROM Employees WHERE manager_id IS NULL AND first_name = 'Ashley' AND last_name = 'Rodriguez';`;
//   db.query(sql, (err, result) => {
//     console.log(result[0].id);
//   });
// };

function showDepartments() {
  const sql = `SELECT * FROM Departments`;
  db.query(sql, (err, result) => {
    // console.log(rows)
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
    // console.log(results);
    console.table(results);
    if (err) {
      console.log(err);;
      return;
    }
  });
  //   menu()
}

async function addEmployee() {
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
      choices: [
        "Lead Engineer",
        "Software Engineer",
        "Account Manager",
        "Accountant",
        "Legal Team Lead",
        "Lawyer",
        "Sales Lead",
        "Salesperson",
      ],
    },

    {
      type: "list",
      name: "manager",
      message: "Who is the employee's manager?",
      choices: [
        "Ashley Rodriguez",
        "Kevin Tupik",
        "Kunal Singh",
        "Malia Brown",
        "Sarah Lourd",
        "Tom Allen",
        "John Doe",
        "Mike Chan",
      ],
    },
  ]);
  const first = manager.split(" ")[0];
  const last = manager.split(" ")[1];
  const ManagerId = ` SELECT id FROM Employees WHERE manager_id IS NULL AND first_name = '${first}' AND last_name = '${last}';`;

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
    console.log(results);
    // console.table(results)
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

  const EmployeeArr = []
  const query = `SELECT * FROM Departments`
    db.query(query, (err, rents) => {
      for (let i = 0; i < rents.length; i++) {
       answers.push(rents[i].dep_name)
      }
    });

  const { updateWho, addedRole } = await inquirer.prompt([
    {
      type: "list",
      name: "updateWho",
      message: "Which employee role do you want to update?",
      choices: [
        "Ashley Rodriguez",
        "Kevin Tupik",
        "Kunal Singh",
        "Malia Brown",
        "Sarah Lourd",
        "Tom Allen",
        "John Doe",
        "Mike Chan",
      ],
    },
    {
      type: "list",
      name: "addedRole",
      message: "Which role do you want to assaign the employeee?",
      choices: [
        "Lead Engineer",
        "Software Engineer",
        "Account Manager",
        "Accountant",
        "Legal Team Lead",
        "Lawyer",
        "Sales Lead",
        "Salesperson",
      ],
    },
  ]);
  console.log(addedRole);
  //   menu()
}

menu();

// use async await for your queries and set up your connection so you don't use callbacks in mysql

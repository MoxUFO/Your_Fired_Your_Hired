const inquirer = require('inquirer')
const mysql = require('mysql2')
const cTable = require('console.table')
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'crash2010',
      database: 'cms_db'
    },
    console.log(`Connected to the cms_db database.`)
  );

async function menu(){

    const {menuChoice} = await inquirer.prompt([{
        type: 'list',
        name: 'menuChoice',
        message: 'What would you like to do?',
        choices:
        ['View all employees.',
        'Add employee.',
        'Update empolyee role.',
        'View all roles.',
        'Add role.',
        'View all departments.',
        'Add department',
        'Exit!']
      },
    ])
    console.log(menuChoice);
      switch (menuChoice) {
    case 'View all employees.':
      showEmployees()
      break;
    case 'Add employee.':
      addEmployee()
      break;
    case 'Update empolyee role.':
      updateRole()
      break;
      case 'View all roles.':
      showRoles()
      break;
      case 'Add role.':
      addRole()
      break;
      case 'View all departments.':
      showDepartments()
      break;
      case 'Add department':
      addDeparement()
      break;
    default: 'Exit!'
      console.log('Invalid color!');
      break;
  }
}


function showDepartments(){
    const sql = `SELECT * FROM Departments`;
    db.query(sql, (err, rows) => {
        console.log(err);
        console.log(rows);

        // if (err) {
        //   res.status(500).json({ error: err.message });
        //    return;
        // }
        // res.json({
        //   message: 'success',
        //   data: rows
        // });
        // console.log(sql);
      });

      
    // menu()
}

async function addDeparement(params) {
    const {dep_name} = await inquirer.prompt([
        {
          type: 'input',
          name: 'dep_name',
          message: 'What is the Department name?',
        },
      ])
      console.log(dep_name);
      const sql = `INSERT INTO Departments (dep_name)
      VALUES ("${dep_name}");`;
    db.query(sql, (err, rows) => {
        console.log(err);
        // console.log(rows);

        // if (err) {
        //   res.status(500).json({ error: err.message });
        //    return;
        // }
        // res.json({
        //   message: 'success',
        //   data: rows
        // });
        // console.log(sql);
      });
    //   menu()
}

function showEmployees(){
    const sql = `SELECT * FROM employees e JOIN Roles r ON e.role_id = r.id JOIN Departments d ON r.department_id = d.id;`
    db.query(sql, (err, rows) => {
        console.log(err);
        console.log(rows);

        // if (err) {
        //   res.status(500).json({ error: err.message });
        //    return;
        // }
        // res.json({
        //   message: 'success',
        //   data: rows
        // });
        // console.log(sql);
      });
    // menu()
}

function addEmployee(params) {
    inquirer.prompt([
        {
          type: 'input',
          name: 'firstname',
          message: 'What employee\'s first name?', 
        },
        {
            type: 'input',
            name: 'lastname',
            message: 'What employee\'s last name?', 
          },
          {
            type: 'list',
            name: 'assigned-role',
            message: 'What employee\'s role?', 
            choices: ['Lead Engineer',
            'Software Engineer',
            'Account Manager',
            'Accountant',
            'Legal Team Lead',
            'Lawyer',
            'Sales Lead',
            'Salesperson']
          },
          {
            type: 'list',
            name: 'manager',
            message: 'Who is the employee\'s manager?', 
            choices: ['Ashley Rodriguez',
            'Kevin Tupik',
            'Kunal Singh',
            'Malia Brown',
            'Sarah Lourd',
            'Tom Allen',
            'John Doe',
            'Mike Chan']
          },   
      ])

    //   menu()
}

function showRoles (){
    const sql = `SELECT r.id, r.title, r.salary, d.dep_name AS department FROM roles r JOIN Departments d ON r.department_id = d.id;`
    db.query(sql, (err, rows) => {
        console.log(err);
        console.log(rows);

        // if (err) {
        //   res.status(500).json({ error: err.message });
        //    return;
        // }
        // res.json({
        //   message: 'success',
        //   data: rows
        // });
        // console.log(sql);
      });
    // menu()
}

function addRole(params) {
    inquirer.prompt([
        {
          type: 'input',
          name: 'new-role',
          message: 'What is the name of the role?',
          
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
            
          },
          {
            type: 'list',
            name: 'dep-name',
            message: 'What department does the role belong to?',
            choices:
            ['Engineering.',
            'Finance.',
            'Legal.',
            'Sales.',]
          },  
      ])

    //   menu()
}

function updateRole(params) {
    inquirer.prompt([
        {
          type: 'list',
          name: 'update-who',
          message: 'Which employee role do you want to update?',
          choices: ['Ashley Rodriguez',
          'Kevin Tupik',
          'Kunal Singh',
          'Malia Brown',
          'Sarah Lourd',
          'Tom Allen',
          'John Doe',
          'Mike Chan']
        },
        {
            type: 'list',
            name: 'added-role',
            message: 'Which role do you want to assaign the employeee?', 
            choices: ['Lead Engineer',
            'Software Engineer',
            'Account Manager',
            'Accountant',
            'Legal Team Lead',
            'Lawyer',
            'Sales Lead',
            'Salesperson']
          },
      ])

    //   menu()
}

menu()

// use async await for your queries and set up your connection so you don't use callbacks in mysql

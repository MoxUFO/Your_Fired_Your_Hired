const inquirer = require('inquirer')
const mysql = require('mysql2')
const cTable = require('console.table')

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

    const {name} = await inquirer.prompt([{
        type: 'list',
        name: 'menu-item',
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
    return console.log(name);;
    console.log(name);
//   switch (name) {
//     case 'View all employees.':
//       showEmployees()
//       break;
//     case 'Add employee.':
//       addEmployee()
//       break;
//     case 'Update empolyee role.':
//       updateRole()
//       break;
//       case 'View all roles.':
//       showRoles()
//       break;
//       case 'Add role.':
//       addRole()
//       break;
//       case 'View all departments.':
//       showDepartments()
//       break;
//       case 'Add department':
//       addDeparement()
//       break;
//     default: 'Exit!'
//       console.log('Invalid color!');
//       break;
//   }




   
    //switch statement to call other functions
}


function showDepartments(){
    //show the departments
    menu()
}

function addDeparement(params) {
    inquirer.prompt([
        {
          type: 'input',
          name: 'dep_name',
          message: 'What is the Department name?',
        },
      ])

      menu()
}

function showEmployees(){
    //
    menu()
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

      menu()
}

function showRoles (){
    //
    menu()
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

      menu()
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

      menu()
}

menu()

// use async await for your queries and set up your connection so you don't use callbacks in mysql

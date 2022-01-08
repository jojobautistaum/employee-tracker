const express = require('express');
const MyQuery = require('./src/track-queries');
const db = require('./config/connection');
const inquirer = require('inquirer');

const myquery = new MyQuery();

// Inquirer for adding Department
function addDept(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'departname',
      message: 'What is the name of the new Department? (REQUIRED) ',
      validate: deptInput => {
        if (!deptInput) {
          console.log("\nPlease enter a name for new Department! ");
          return false;
        } else {
          return true;
        }
      }
    }
  ]).then(answer => {
    myquery.addDepartment(answer.department);
    toDo();
  }).catch(err => {
    console.log(err);
  });
}

// Inquirer for adding Role
function addRole(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the new Role? (REQUIRED) ',
      validate: titleInput => {
        if (!titleInput) {
          console.log("\nPlease enter a title of the new Role!");
          return false;
        } else {
          return true;
        }
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this new Role? (REQUIRED) ',
      validate: salaryInput => {
        salaryInput = parseInt(salaryInput);
        if (isNaN(salaryInput)) {
          console.log("\nPlease enter numeric number only for Salary!");
          return false;
        } else {
          return true;
        }
      }
    },
    {
      type: 'list',
      name: 'department',
      message: "Please select the department!",
      choices: ['1 Sales', '2 Engineering', '3 Finance','4 Legal'],
      default: '1 Sales',
    }
  ]).then(answer => {
    myquery.addRole(answer.title, answer.salary, parseInt(answer.department));
    toDo();
  }).catch(err => {
    console.log(err);
  });
}

// Inquirer for Adding Employee
function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'fName',
      message: "What is the employee's first name? (REQUIRED) ",
      validate: fNameInput => {
        if (!fNameInput) {
          console.log("\nPlease enter the First Mame of the employee!");
          return false;
        } else {
          return true;
        }
      }
    },
    {
      type: 'input',
      name: 'lName',
      message: "What is the employee's last name? (REQUIRED) ",
      validate: lNameInput => {
        if (!lNameInput) {
          console.log("\nPlease enter the Last Name of the employee!");
          return false;
        } else {
          return true;
        }
      }
    },
    {
      type: 'list',
      name: 'role',
      message: "Please select the employee's role!",
      choices: ['1 Sales Person', '2 Sales Manager', '3 Lead Engineer','4 Software Engineer',
                '5 Account Manager', '6 Accountant', '7 Legal Team Lead', '8 Lawyer'],
      default: '1 Sales Person',
    },
    {
      type: 'list',
      name: 'manager',
      message: "Please select the employee's manager!",
      choices: ['1 Gina Martinez', '3 Jimbo White', '5 Johny Walker','7 Ever Lasting'],
      default: '1 Sales',
    }
  ]).then(answer => {
    myquery.addEmployee(answer.fName, answer.lName, parseInt(answer.role), parseInt(answer.manager));
    toDo();
  }).catch(err => {
    console.log(err);
  });
}

// Inquirer for Updating Employee Role
function updateRole(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'What is the employee ID? (REQUIRED) ',
      validate: idInput => {
        idInput = parseInt(idInput);
        if (isNaN(idInput)) {
          console.log("\nPlease enter the numeric Employee ID!");
          return false;
        } else {
          return true;
        }
      }
    },
    {
      type: 'list',
      name: 'role',
      message: "Please select the new role of the employee!",
      choices: ['1 Sales Person', '2 Sales Manager', '3 Lead Engineer','4 Software Engineer',
                '5 Account Manager', '6 Accountant', '7 Legal Team Lead', '8 Lawyer'],
      default: '1 Sales Person',
    }
  ]).then(answer => {
    myquery.updateEmployee(answer.id, parseInt(answer.role));
    toDo();
  }).catch(err => {
    console.log(err);
  });
}

// Main function for Inquirer prompt
function toDo(){
  inquirer.prompt([
    {
      type: 'list',
      name: 'toDo',
      message: "What would you like to do? ",
      choices: ['View all departments', 'View all roles', 'View all employees', 
                'Add a department', 'Add a role', 'Add an employee', 
                'Update an employee role', 'Exit'],
      default: 'View all deparmtents',
    }
  ]).then(answer => {
    answer = JSON.stringify(answer);
    if (answer.includes("all departments")) {
      myquery.viewDepartments();
    } else if (answer.includes("all roles")) {
      myquery.viewRoles();
    } else if (answer.includes("all employees")) {
      myquery.viewEmployees();
    } else if (answer.includes("Add a department")) {
      addDept();
    } else if (answer.includes("Add a role")) {
      addRole();
    } else if (answer.includes("Add an employee")) {
      addEmployee();
    } else if (answer.includes("Update")) {
      updateRole();
    } else {
      // Close connection to the Database
      db.end();
    }
  }).catch(err => {
    console.log(err);
  });
}

// Connec to the Database then run Inquirer
db.connect(err => {
  if (err) throw err;
  toDo();
  console.log(`Connected to ${db.config.database} database`);
  console.log(myquery.viewEmployees());
  
});


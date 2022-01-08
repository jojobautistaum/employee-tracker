const express = require('express');
const MyQuery = require('./src/track-queries');
const db = require('./config/connection');
const inquirer = require('inquirer');
const myquery = new MyQuery();
// const util = require('util');
// const query = util.promisify(db.query).bind(db);

// Input for adding Department
function addDept(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
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

// Input for Adding Role
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

// Input for Adding Employee
function addEmployee() {
  // Get the roles list for dynamic list of choices
  const sqlRole = `SELECT CONCAT(id, ' ', title) AS title FROM role`;
  db.query(sqlRole, (err, result) => {
    if (err){
      return console.log(err.message);
    }
    const roles = result.map(function(item) {
      return item['title'];
    });

    // Get the Manager and Lead list for dynamic list of choices
    const sqlMgr = `SELECT CONCAT(e.id, ' ', e.first_name, ' ', e.last_name, ' - ', r.title) AS Manager 
                    FROM employee e
                      JOIN role r ON r.id=e.role_id
                      WHERE r.title like '%Manager%' OR r.title like '%Lead%'`;
    db.query(sqlMgr, (err, result) => {
      if (err){
        return console.log(err.message);
      }
      const managers = result.map(function(item) {
        return item['Manager'];
      });

      // Get the required Info
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
          choices: roles,
          default: roles[0],
        },
        {
          type: 'list',
          name: 'manager',
          message: "Please select the employee's manager!",
          choices: managers,
          default: managers[0],
        }
      ]).then(answer => {
        myquery.addEmployee(answer.fName, answer.lName, parseInt(answer.role), parseInt(answer.manager));
        toDo();
      }).catch(err => {
        console.log(err);
      });
    });
  });
}


// Input for Updating Employee Role
function updateRole(){
  // Get list of Roles for dynamic list of choices
  const sql = `SELECT CONCAT(id, ' ', title) AS title FROM role`;
  db.query(sql, (err, result) => {
    if (err){
      return console.log(err.message);
    }
    const roles = result.map(function(item) {
      return item['title'];
    });

    // Select a new role for the employee
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
        choices: roles,
        default: roles[0],
      }
    ]).then(answer => {
      myquery.updateEmployee(answer.id, parseInt(answer.role));
      toDo();
    }).catch(err => {
      console.log(err);
    });
  });
}

// Confirm if the user want to go back to the main menu
function goToMain(){
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'mainMenu',
      message: "Go back to the main menu ",
      default: true
    }
  ]).then(answer => {
    if(!answer.mainMenu) {
      console.log("Good Bye...");
      db.end();
    }
    toDo();
  }).catch(err => {
    console.log(err);
  });
}

// Main Input prompt
function toDo(){
  console.clear();
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
      goToMain();
    } else if (answer.includes("all roles")) {
      myquery.viewRoles();
      goToMain();
    } else if (answer.includes("all employees")) {
      myquery.viewEmployees();
      goToMain();
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
      console.log("Good Bye...");
      db.end();
    }
  }).catch(err => {
    console.log(err);
  });
}

// Connect to the Database then run Inquirer Prompts
db.connect(err => {
  if (err) throw err;
  toDo();
});
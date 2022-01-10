const express = require('express');
const MyQuery = require('./src/track-queries');
const db = require('./config/connection');
const inquirer = require('inquirer');
const myQuery = new MyQuery();

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
    myQuery.addDepartment(answer.department);
    return goToMainMenu("Add");
  }).catch(err => {
    console.log(err);
  });
}

// Input for Adding Role
function addRole(){
  // Get list of Roles for dynamic list of choices
  const sql = `SELECT CONCAT(id, ' ', name) AS dept FROM department`;
  db.query(sql, (err, result) => {
    if (err){
      return console.log(err.message);
    }
    const departments = result.map(function(item) {
      return item['dept'];
    });

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
        choices: departments,
      }
    ]).then(answer => {
      myQuery.addRole(answer.title, answer.salary, parseInt(answer.department));
      return goToMainMenu('Add');
    }).catch(err => {
      console.log(err);
    });
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
      managers.push('0 None');

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
        myQuery.addEmployee(answer.fName, answer.lName, parseInt(answer.role), parseInt(answer.manager));
        return goToMainMenu('Add');
      }).catch(err => {
        console.log(err);
      });
    });
  });
}

// Input for Updating Employee Role
function updateEmployeeRole(){
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
      myQuery.updateEmployeeRole(answer.id, parseInt(answer.role));
      return goToMainMenu('Update');
    }).catch(err => {
      console.log(err);
    });
  });
}

// Input for Updating Employee Role
function updateEmployeeManager(){
  // Get list of Roles for dynamic list of choices
  const sql = `SELECT CONCAT(e.id, ' ', e.first_name, ' ', e.last_name, ' - ', r.title) AS Manager 
               FROM employee e
                JOIN role r ON r.id=e.role_id
                WHERE r.title like '%Manager%' OR r.title like '%Lead%'`;
  db.query(sql, (err, result) => {
    if (err){
      return console.log(err.message);
    }
    const managers = result.map(function(item) {
      return item['Manager'];
    });
    managers.push("0 None");

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
        message: "Please select the new manager of the employee!",
        choices: managers,
      }
    ]).then(answer => {
      myQuery.updateEmployeeManager(answer.id, parseInt(answer.role));
      return goToMainMenu('Update');
    }).catch(err => {
      console.log(err);
    });
  });
}

// Confirm if the user want to go back to the main menu
function goToMainMenu(menu){
  console.clear();
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'main',
      message: "Go back to the Main Menu ",
      default: true
    }
  ]).then(answer => {
    console.clear();
    if(answer.main) {
      mainMenu();
    } else {
      if (menu === 'View') {
        viewMenu();
      } else if (menu === 'Add') {
        addMenu();
      } else {
        updateMenu();
      }
    }
  }).catch(err => {
    console.log(err);
  });
}

// View Menu
function viewMenu(){
  console.clear();
  inquirer.prompt([
    {
      type: 'list',
      name: 'viewMenu',
      message: "View Menu ",
      choices: ['Departments', 'Roles', 'Employees', 'Employee by Department', 
                'Employee by Manager', 'Total Department Budget'], 
    }
  ]).then(answer => {
    answer = JSON.stringify(answer);
    if (answer.includes("Departments")) {
      myQuery.viewDepartments();
    } else if (answer.includes("Roles")) {
      myQuery.viewRoles();
    } else if (answer.includes("Employees")) {
      myQuery.viewEmployees();
    } else if (answer.includes("by Department")) {
      myQuery.viewEmployeeByDepartment();
    } else if (answer.includes("by Manager")) {
      myQuery.viewEmployeeByManager();
    } else {
      myQuery.viewBudgetByDepartment();
    }
    return goToMainMenu('View');
  }).catch(err => {
    console.log(err);

  });
}

// Add Menu
function addMenu(){
  console.clear();
  inquirer.prompt([
    {
      type: 'list',
      name: 'addMenu',
      message: "Add Menu",
      choices: ['Departments', 'Roles', 'Employees'], 
    }
  ]).then(answer => {
    answer = JSON.stringify(answer);
    if (answer.includes("Departments")) {
      addDept();
    } else if (answer.includes("Roles")) {
      addRole();
    } else {
      addEmployee();
    } 
  }).catch(err => {
    console.log(err);
  });
}

// Update Menu
function updateMenu(){
  console.clear();
  inquirer.prompt([
    {
      type: 'list',
      name: 'updateMenu',
      message: "Update Menu",
      choices: ["Employee's Role", "Employee's Manager"], 
    }
  ]).then(answer => {
    answer = JSON.stringify(answer);
    if (answer.includes("Role")) {
      updateEmployeeRole();
    } else {
      updateEmployeeManager();
    } 
  }).catch(err => {
    console.log(err);
  });
}

// Main Input prompt
function mainMenu(){
  console.clear();
  inquirer.prompt([
    {
      type: 'list',
      name: 'mainMenu',
      message: "Main Menu",
      choices: ['View', 'Add', 'Update', 'Delete', 'Exit'],
      default: 'View',
    }
  ]).then(answer => {
    answer = JSON.stringify(answer);
    console.clear();
    if (answer.includes("View")) {
      return viewMenu();
    } else if (answer.includes("Add")) {
      return addMenu();
    } else if (answer.includes("Update")) {
      return updateMenu();
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
  mainMenu();
});
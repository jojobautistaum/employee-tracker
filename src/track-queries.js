const db = require ('../config/connection');

// Class for select, insert and update queries
class MyQuery {

  // Show all rows in the department table
  viewDepartments() {
    const sql = `SELECT id as 'Department ID', name as Department FROM department
                 ORDER BY id`;
    
    db.query(sql, (err, result) => {
      if (err){
        return console.log(err.message);
      }
      console.log("\n");
      console.table(result);
    });
  }

  // Show all records from employee table joined to some info from role and department tables
  viewEmployees() {
    const sql = `SELECT e.id AS 'Employee ID', e.first_name AS 'First Name', e.last_name AS 'Last Name', 
                    r.title as Role, d.name AS Department, r.salary AS Salary, 
                    CONCAT(e2.first_name, ' ', e2.last_name) AS 'Manager/Lead'
                 FROM employee e
                    JOIN role r ON r.id = e.role_id
                    JOIN department d ON d.id = r.department_id
                    LEFT JOIN employee e2 ON e.manager_id=e2.id
                    ORDER BY e.id`;
    
    db.query(sql, (err, result) => {
      if (err){
        return console.log(err.message);
      }
      console.log("\n");
      console.table(result);
    });
  }

  // Show all records from role table joined to department table name
  viewRoles() {
    const sql = `SELECT r.title as Role, r.id as Role_ID, d.name as Department, r.salary as Salary
                 FROM role r
                    JOIN department d ON d.id=r.department_id
                    ORDER BY r.id`;
    
    db.query(sql, (err, result) => {
      if (err){
        return console.log(err.message);
      }
      console.log("\n");
      console.table(result);
    });
  }
  
  // Query for adding department name
  addDepartment(department) {
    const sql = `INSERT INTO department(name)
                   VALUES('${department}')`;
    db.query(sql, (err, result) => {
      if (err){
        return console.log(err.message);
      }
      return console.log(`\n ${department} has been added to the Department table!`);
    });
  }

  // Query for adding role or title
  addRole(title, salary, deptId) {
    const sql = `INSERT INTO role(title, salary, department_id)
                   VALUES('${title}', ${salary}, ${deptId})`;
    
    db.query(sql, (err, result) => {
      if (err){
        return console.log(err.message);
      }
      console.log(`\n${title} has been added to the Role table`);
    });
  }

  // Query for adding employee
  addEmployee(fName, lName, roleId, managerId) {
    if (managerId === 0){
      // No manager assigned to this employee
      managerId = 'NULL';
    }
    const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
                   VALUES('${fName}', '${lName}', ${roleId}, ${managerId})`;
    console.log(sql);
    db.query(sql, (err, result) => {
      if (err){
        return console.log(err.message);
      }
      console.log(`\nWelcome our new employee: ${fName} ${lName}!`);
    });
  }

  // Query for deleting department
  deleteDepartment(deptId) {
    const sql = `DELETE FROM department WHERE id=${deptId}`;
    db.query(sql, (err, result) => {
      if (err){
        return console.log(err.message);
      }
      console.log(`\nDepartment ID '${deptId}' has been deleted!`);
    });
  }

  // Query for updating role of an employee
  updateEmployeeRole(employeeId, roleId) {
    const sql = `UPDATE employee SET role_id=${roleId} WHERE id=${employeeId}`;
    db.query(sql, (err, result) => {
      if (err){
        return console.log(err.message);
      }
      console.log(`\nRole for employee ID '${employeeId}' has been updated!`);
    });
  }

  // Query for updating manager of an employee
  updateEmployeeManager(employeeId, managerId) {
    if (managerId === 0) {
      // Employee has no manager
      managerId = 'NULL';
    }
    const sql = `UPDATE employee SET manager_id=${managerId} WHERE id=${employeeId}`;
    db.query(sql, (err, result) => {
      if (err){
        return console.log(err.message);
      }
      console.log(`\nRole for employee ID '${employeeId}' has been updated!`);
    });
  }
}

module.exports = MyQuery;
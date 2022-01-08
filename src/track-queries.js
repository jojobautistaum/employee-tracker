const db = require ('../config/connection');

class MyQuery {

  constructor(sql){
    this.sql = sql;
  }

  viewDepartments() {
    const sql = `SELECT * FROM department`;
    
    db.query(sql, (err, result) => {
      if (err){
        return console.log(err.message);
      }
      return JSON.stringify(result);
    });
  }

  viewEmployees() {
    const sql = `SELECT e.id, e.first_name, e.last_name, 
                    r.title, d.name AS department, r.salary, 
                    CONCAT(e2.first_name, ' ', e2.last_name) AS 'Manager/Lead'
                 FROM employee e
                    JOIN role r ON r.id = e.role_id
                    JOIN department d ON d.id = r.department_id
                    LEFT JOIN employee e2 ON e.manager_id=e2.id`

    db.query(sql, (err, result) => {
      if (err){
        return console.log(err.message);
      }
      return JSON.stringify(result);
    });
  }

  viewRoles() {
    const sql = `SELECT r.title as Title, r.id as Role_ID, d.name as Department, r.salary as Salary
                 FROM role r
                    JOIN department d ON d.id=r.department_id`;

    db.query(sql, (err, result) => {
      if (err){
        return console.log(err.message);
      }
      return JSON.stringify(result);
    });
  }
  
  addDepartment(department) {
    const sql = `INSERT INTO department(name)
                   VALUES(${department})`;
    
    db.query(sql, (err, result) => {
      if (err){
        return console.log(err.message);
      }
      console.log(result);
    });
  }

  addRole(title, salary, deptId) {
    const sql = `INSERT INTO role(title, salary, department_id)
                   VALUES(${title}, ${salary}, ${deptId})`;
    
    db.query(sql, (err, result) => {
      if (err){
        return console.log(err.message);
      }
      console.log(result);
    });
  }

  addEmployee(fName, lName, roleId, managerId) {
    const sql = `INSERT INTO employee(firt_name, last_name, role_id, manager_id)
    VALUES(${fName}, ${lName}, ${roleId}, ${managerId})`;

    db.query(sql, (err, result) => {
      if (err){
        return console.log(err.message);
      }
      console.log(result);
    });
  }

  updateEmployee(employeeId, roleId) {
    const sql = `UPDATE role SET role_id=${roleId} WHERE id=${employeeId}`;

    db.query(sql, (err, result) => {
      if (err){
        return console.log(err.message);
      }
      console.log(result);
    });
  }

}

module.exports = MyQuery;
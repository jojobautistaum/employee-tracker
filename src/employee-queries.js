const express = require('express');
const db = require ('../config/connection');

class Queries {

constructor(){
    
}

  getEmployees() {
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

}

module.exports = Queries;
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'hard2Guess',
      database: 'employee_tracker_db'
    }
    console.log(`Connected to the ${db} database.`)
  );

  module.exports = db;
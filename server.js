const express = require('express');
const Queries = require('./src/employee-queries');
const db = require('./config/connection');
const inquirer = require('inquirer');

function dbQueries(){

    

}


db.connect(err => {
  if (err) throw err;
  const queries = new Queries();
  
  console.log(queries.getEmployees());
  
});


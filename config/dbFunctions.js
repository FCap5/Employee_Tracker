const mysql = require("mysql");
const connection = require("./connection.js");

class Store {
  //add department to list
  addDepartmentDB(value) {
    connection.connect("INSERT INTO departments (name) VALUES = ?", [value]);
  }
  //take response and add to departments table

  //add role to list

  //add employee to list

  //view departments

  //view roles

  //view employees

  //update employee roles
}

const mysql = require("mysql");
const connection = require("./connection.js");
const inquirer = require("inquirer");

class Store {
  //add department to list
  addDepartmentDB(value) {
    connection.query(
      "INSERT INTO departments (name) VALUES  (?)",
      [value],
      (err, value) => {
        if (err) {
          console.log("Didn't work");
          throw err;
        }
      }
    );
    console.log(`The ${value} department has been added to your company.`);
  }
  //take response and add to departments table
  addRoleDB(title, salary, departmentID) {
    connection.query(
      "INSERT INTO roles (title, salary, department_id) VALUES  (?, ?, ?)",
      [title, salary, departmentID],
      (err, value) => {
        if (err) {
          console.log("Didn't work");
          throw err;
        }
      }
    );
    console.log(`The ${title} role has been added to your company.`);
  }

  addEmployeeDB(firstName, lastName, roleId, managerId) {
    connection.query(
      "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES  (?, ?, ?, ?)",
      [firstName, lastName, roleId, managerId],
      (err, value) => {
        if (err) {
          console.log("Didn't work");
          throw err;
        }
      }
    );
    console.log(`${firstName} ${lastName} has been added to your company.`);
  }
  //add employee to list
  viewRolesDB(response) {
    console.log(response);
    /* const array = [];
    connection.query(
      "SELECT title FROM roles WHERE department department_id =?",
      [response.id],
      (err, values) => {
        if (err) throw err;
        values.forEach((value) => {
          array.push(value.name);
        });
        inquirer.prompt({
          type: "list",
          name: "departSelect",
          choices: array,
        });
      }
    ); */
  }
  //view departments
  viewDepartmentsDB() {
    const array = [];
    connection.query("SELECT name FROM departments", (err, values) => {
      if (err) throw err;
      values.forEach((value) => {
        array.push(value.name);
      });
      inquirer
        .prompt({
          type: "list",
          name: "departSelect",
          choices: array,
        })
        .then((response) => {
          console.log(response.departSelect);
        });
    });
  }

  //view roles
}

//view employees

//update employee roles

module.exports = new Store();

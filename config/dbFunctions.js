const mysql = require("mysql");
const connection = require("./connection.js");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
          //console.log(response.departSelect);
          this.viewRolesFromDepartmentDB(response.departSelect);
        });
    });
  }
  //TODO view employees
  viewEmployeesDB() {}

  addNewRole() {
    inquirer.prompt(addRole).then((response) => {
      const departmentArray = [];
      connection.query("SELECT name FROM departments", (err, data) => {
        if (err) {
          console.log("this didn't work");
          throw err;
        }
        data.forEach((datus) => {
          departmentArray.push(datus.name);
        });
        console.log(departmentArray);
        const roleSelect = [
          {
            type: "list",
            name: "departmentId",
            message: "What is the department for this new role?",
            choices: departmentArray,
          },
        ];
        inquirer.prompt(roleSelect).then((response2) => {
          connection.query(
            "SELECT id FROM departments WHERE name =?",
            [response2.departmentId],
            (err, data) => {
              if (err) throw err;
              store.addRoleDB(response.title, response.salary, data[0].id);
              inquirer.prompt(addRoleFollowUp).then((response) => {
                if (response.addRoleFollowUp == true) {
                  addNewEmployee();
                } else {
                  postMenuSelect();
                }
              });
            }
          );
        });
      });
    });
  }
}

module.exports = new Store();

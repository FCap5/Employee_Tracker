const inquirer = require("inquirer");
const express = require("express");
const store = require("./dbFunctions.js");
const mysql = require("mysql");
const connection = require("./connection.js");

const app = express();

const employeeList = [];
const managerList = [];
const departmentList = [];
const roleList = [];

//TODO fix initial inquirer situation

const runProgram = () => {
  const mainMenuSelect = [
    {
      type: "list",
      name: "menu",
      message: "What action would you like to execute?",
      choices: [
        "add department",
        "add role",
        "add employee",
        "view departments",
        "view roles",
        "view employees",
        "update employee rolls",
      ],
    },
  ];

  const postActionMenu = [
    {
      type: "list",
      name: "postAction",
      message: "Please select one of below options",
      choices: ["Return to Menu", "Exit"],
    },
  ];

  const addDepartment = [
    {
      type: "input",
      name: "newDept",
      message: "What is the name of the department you would like to add?",
    },
  ];

  const addDeptFollowUp = [
    {
      type: "confirm",
      name: "deptFollowUp",
      message: "Would you like to add a role to this department?",
    },
  ];
  /*   const roleList = () => {
    connection.query("SELECT name FROM departments", (err, data) => {
      if (err) {
        console.log("this didn't work");
        throw err;
      }
      return data.name;
    });
  }; */
  const addRole = [
    {
      type: "input",
      name: "title",
      message: "What is the name of the new role?",
    },
    {
      type: "number",
      name: "salary",
      message: "What is the salary for this new role?",
    },
  ];

  const addRoleFollowUp = [
    {
      type: "confirm",
      name: "roleFollowUp",
      message: "Would you like to add an employee to this new role?",
    },
  ];

  const addEmployee = [
    {
      type: "input",
      name: "firstName",
      message: "What is the first name of the new employee?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the last name of the new employee?",
    },
    {
      //TODO update to list to display roles
      type: "number",
      name: "roleId",
      message: "What is the role ID for this new employee?",
    },
    {
      //TODO update to list to display managers
      type: "number",
      name: "managerId",
      message: "What is the ID of the manager this new employee?",
    },
  ];

  const postMenuSelect = () => {
    inquirer.prompt(postActionMenu).then((response) => {
      if (response.postAction === "Return to Menu") {
        mainMenu();
      } else if (response.postAction === "Exit") {
        console.log("Have a Lovely Day!");
      }
    });
  };

  const addNewDepartment = () => {
    inquirer.prompt(addDepartment).then((response) => {
      store.addDepartmentDB(response.newDept);
      inquirer.prompt(addDeptFollowUp).then((response) => {
        if (response.deptFollowUp == true) {
          addNewRole();
        } else {
          postMenuSelect();
        }
      });
    });
  };

  const addNewRole = () => {
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
  };

  const addNewEmployee = () => {
    inquirer.prompt(addEmployee).then((response) => {
      store.addEmployeeDB(
        response.firstName,
        response.lastName,
        response.roleId,
        response.managerId
      );
      postMenuSelect();
    });
  };

  const mainMenu = () => {
    //TODO display new employee rolls at top
    inquirer.prompt(mainMenuSelect).then((response) => {
      //if add department
      if (response.menu === "add department") {
        addNewDepartment();
      }
      //if add role
      else if (response.menu === "add role") {
        addNewRole();
      }
      //if add employee
      else if (response.menu === "add employee") {
        addNewEmployee();
      }
      //if view departments
      else if (response.menu === "view departments") {
        store.viewDepartmentsDB();
      }
      //if view roles
      else if (response.menu === "view roles") {
        //view roles
        postMenuSelect();
      }
      //if view employees
      else if (response.menu === "view employees") {
        //viewEmployees
        postMenuSelect();
      }
      //if update employee roles
      else if (response.menu === "update employee rolls") {
        //update employee roles
        postMenuSelect();
      }
    });
  };
  mainMenu();
};

module.exports = runProgram();

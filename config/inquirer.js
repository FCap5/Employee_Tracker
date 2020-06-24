const inquirer = require("inquirer");
const express = require("express");
const store = require("./dbFunctions.js");
const mysql = require("mysql");
const connection = require("./connection.js");

const app = express();

const runProgram = () => {
  const mainMenuSelect = [
    {
      type: "list",
      name: "menu",
      message: "What action would you like to execute?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Employees by Department",
        "View Employees by Role",
        "View All Employees",
      ],
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
  ];

  const postMenuSelect = () => {
    const postActionMenu = [
      {
        type: "list",
        name: "postAction",
        message: "Please select one of below options",
        choices: ["Return to Menu", "Exit"],
      },
    ];
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
                if (response.roleFollowUp == true) {
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
      //get list of roles
      const rolesList = [];
      connection.query("SELECT title FROM roles", (err, roles) => {
        if (err) throw err;
        roles.forEach((role) => {
          rolesList.push(role.title);
        });
        const rolesInquire = [
          {
            type: "list",
            name: "selectRole",
            message: "What is their role?",
            choices: rolesList,
          },
        ];
        inquirer.prompt(rolesInquire).then((roleID) => {
          connection.query(
            "SELECT role_id FROM roles WHERE title =?",
            [roleID.selectRole],
            (err, newRoleId) => {
              if (err) throw err;
              connection.query(
                "SELECT id, first_name, last_name FROM employees",
                (err, employees) => {
                  if (err) throw err;
                  const fullNames = [];
                  employees.forEach((employee) => {
                    const employeeName = `${employee.id}, ${employee.last_name}, ${employee.first_name}`;

                    fullNames.push(employeeName);
                  });
                  const managers = [
                    {
                      type: "list",
                      name: "selectManager",
                      message: "Select new employee's manager",
                      choices: fullNames,
                    },
                  ];
                  inquirer.prompt(managers).then((managerName) => {
                    store.addEmployeeDB(
                      response.firstName,
                      response.lastName,
                      newRoleId[0].role_id,
                      managerName.selectManager[0]
                    );
                    postMenuSelect();
                  });
                }
              );
            }
          );
        });
      });
    });
  };

  const mainMenu = () => {
    inquirer.prompt(mainMenuSelect).then((response) => {
      //if add department
      if (response.menu === "Add Department") {
        addNewDepartment();
      }
      //if add role
      else if (response.menu === "Add Role") {
        addNewRole();
      }
      //if add employee
      else if (response.menu === "Add Employee") {
        addNewEmployee();
      }
      //if view departments
      else if (response.menu === "View Employees by Department") {
        //store.viewDepartmentsDB();
        store.viewDepartmentsDB(mainMenu);
      }
      //if view roles
      else if (response.menu === "View Employees by Role") {
        store.viewRolesDB(mainMenu);
      }
      //if view employees
      else if (response.menu === "View All Employees") {
        store.viewEmployeesDB(mainMenu);
      }
    });
  };
  mainMenu();
};

module.exports = runProgram();

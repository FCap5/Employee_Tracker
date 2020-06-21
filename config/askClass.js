const inquirer = require("inquirer");
const program = require("./inquirer.js");

class Ask {
  postMenuSelect() {
    inquirer.prompt(postActionMenu).then((response) => {
      if (response.postAction === "Return to Menu") {
        mainMenu();
      } else if (response.postAction === "Exit") {
        console.log("Have a Lovely Day!");
      }
    });
  }

  addNewDepartment() {
    inquirer.prompt(addDepartment).then((response) => {
      //code to add response to list
      inquirer.prompt(addDeptFollowUp).then((response) => {
        if (response.deptFollowUp == true) {
          addNewRole();
        } else {
          postMenuSelect();
        }
      });
    });
  }

  addNewRole() {
    inquirer.prompt(addRole).then((response) => {
      //code to add response to db
      inquirer.prompt(addRoleFollowUp).then((response) => {
        if (response.addRoleFollowUp == true) {
          addNewEmployee();
        } else {
          postMenuSelect();
        }
      });
    });
  }

  addNewEmployee() {
    inquirer.prompt(addEmployee).then((response) => {
      //code to add response to db
      postMenuSelect();
    });
  }

  mainMenu() {
    inquirer.prompt(program.mainMenuSelect).then((response) => {
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
        console.log("add employee");
      }
      //if view departments
      else if (response.menu === "view departments") {
        addNewEmployee();
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
  }
}

module.exports = new Ask();

# Employee_Tracker

## CONCEPTUALIZING THE SCOPE

The first challenge for this exercise was understanding the full scope of data I would need to return and/or render. With a dynamic inquirer app, every input or resposne needs to be either looped back to the main menu or provided with the appropriate follow-up. Each input then needs to make the proper connection query and either return or edit the appropraite data. To be honest, it seems the tables provided were intentionally convoluted. My guess is that this was to provide additional practice in working with mysql. For the sake of practice, I decided not to just create left join tables for every query, though that probably would have been the cleanest way coplete the homework. Instead, I used this as an opportunity to make nested calls to multiple different tables and extrapolate information as needed.

## SETTING UP INQUIRER

I set up my inquirer so that the actual functionality of the app would be as simple as possible. After creating my inquirer objects and functions to execute the appropriate calls, I set everything into a series of if/else ifs. The whole app is basically run with this code:

```
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
```

## EXTRA CLASS WORK

I decided to use a Class to help organize my functions into two categories, user prompting and database storage/recall. The Class "store" organized all my functions that added or recalled information from my databases. It almost organized the app into front end and backend, with the terminal being the front end. It took a little bit to wrap my head around, but ulimtately, I think it helped to organize the app.

## DO YOU VALIDATE?

This homework didn't ask for data validation. If I had more time, I probably would add datavalidation for the inquirer resonses to ensure that there were no blanks, integers when required, strings when required, and that there were no duplicate answers provided.

## THE APP:

[![Click Through of App](assets/videoImg.png)](https://youtu.be/pqUVb0H23CY)

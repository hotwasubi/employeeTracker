const inquirer = require('inquirer');
const mysql = require('mysql');
const consoletable = require('console.table');
const chalk = require('chalk');
const figlet = require('figlet');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "Phoebe12@",
    database: "employee_db"
})

connection.connect((err) => {
    if(err){
        console.log(`error connecting`, err.stack);
        return
    }
    console.log(`Connected through id ${connection.threadId}`);
});

function starterPrompt (){

    figlet('Employee Tracker', function (err, data){
        if (err){
            console.log('Somethings not working');
            console.dir(err);
            return;
        }
        console.log(chalk.red(data))
    });

    inquirer.prompt([{
        message: 'What would you like to do?',
        type: 'list',
        name: 'Choice',
        choices: [
            'View Employees',
            'View Employees by Department',
            'View Employees by Role',
            'Add new Employee',
            'Add Role',
            'Add Department',
            'Update Employee',
            'View Roles',
            'View Departments',
            'Exit'
        ]
    }])

    .then((answers) => {
        if (answers.choice === 'View Employees') {
            viewEmployees();
        } else if (answers.choice === 'View Employees by Department') {
            viewByDept();
        } else if (answers.choice === 'View Employees by Role') {
            viewByRole();
        } else if (answers.choice === 'Add Employee') {
            addEmployee();
        } else if (answers.choice === 'Add Role') {
            addRole();
        } else if (answers.choice === 'Add Department') {
            addDept();
        } else if (answers.choice === 'Update Employee') {
            updateEmployeeRole();
        } else if (answers.choice === 'View Roles') {
            viewRoles();
        } else if (answers.choice === 'View Departments') {
            viewDepts();
        }

        else if (answers.choice === 'Exit') {
            exit();
        }
    })
};

starterPrompt();

// SQL  

function viewEmployees() {
    connection.query(`SELECT employee.first_name,
    employee.last_name,
    role.title AS Title,
    role.salary AS salary,
    department.name AS Department
FROM employee
    INNER JOIN role ON employee.role_id=role.role_id
    INNER JOIN department ON employee.role_id=department.department_id`, (err, result) =>{
      if (err) throw err;
      console.table(result);  
    })
    starterPrompt();
};

function viewByDept() {
    inquirer.prompt([{
        message: "Which department would you like to view?",
        type: 'list',
        name: 'dept',
        choices: [
            'Engineering',
            'Management',
            'Marketing',
            'Legal',
            'Sales'
        ]
    }])
        .then((answers) => {
            connection.query(`SELECT 
            employee.first_name,
            employee.last_name,
            department.name AS Department
        FROM employee
            INNER JOIN role ON employee.role_id=role.role_id     
            INNER JOIN department ON employee.role_id=department.department_id
            WHERE department.name='${answers.dept}'`, (err, result) => {
                if (err) throw err;
                console.table(result);

            })
            starterPrompt();
        })

};


connection.end();

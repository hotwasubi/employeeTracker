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
    database: "employee_DB"
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


};

starterPrompt();
connection.end();
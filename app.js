const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let newTeam = [];

console.log("Let's create your team!");


function createManager() {
    inquirer.prompt([{
            type: "input",
            message: "What is your managers name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your managers id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your managers email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your managers office number?",
            name: "officeNumber"
        }

    ]).then(function(response) {
        const newManager = new Manager(response.name, response.id, response.email, response.officeNumber);
        newTeam.push(newManager);
        addMember();

    });

}

function addMember() {
    inquirer.prompt([{

            type: "list",
            name: "type",
            message: "What type of team member would you like to add?",
            choices: ["Engineer", "Intern", "I don't want to add any more team members"]
        }

    ]).then(function(answer) {
        if (answer.type === "Engineer") {
            createEngineer();
        } else if (answer.type === "Intern") {
            createIntern();
        } else {
            fs.mkdirSync(OUTPUT_DIR)
            fs.writeFileSync(outputPath, render(newTeam), 'utf-8')
        }
    });
}

function createEngineer() {
    inquirer.prompt([{

            type: "input",
            message: "What is your engineer's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your engineer's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your engineer's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your engineer's github?",
            name: "github"
        }


    ]).then(function(response) {

        const newEngineer = new Engineer(response.name, response.id, response.email, response.github);
        newTeam.push(newEngineer);
        addMember();
    });

}

function createIntern() {
    inquirer.prompt([{

            type: "input",
            message: "What is your Intern's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your Intern's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your Intern's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your Intern's school?",
            name: "school"
        }

    ]).then(function(response) {

        const newIntern = new Intern(response.name, response.id, response.email, response.school);
        newTeam.push(newIntern);
        addMember();

    });

}

createManager();
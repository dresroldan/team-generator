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
            name: "choice",
            message: "What type of team member would you like to add?",
            choices: ["Engineer", "Intern", "I don't want to add any more team members"]
        }

    ]).then(function(response) {
        if (response.type === "Engineer") {
            createEngineer();
        } else if (response.type === "Intern") {
            createIntern();
        } else {
            fs.mkdirSync(OUTPUT_DIR)
            fs.writeFileSync(outputPath, render(newTeam), 'utf-8')
        }

    })
}

// function createEngineer() {
//     inquirer.prompt([{

//             type: "input",
//             message: "What is your engineer's name?",
//             name: "name"
//         },
//         {
//             type: "input",
//             message: "What is your engineer's id?",
//             name: "id"
//         },
//         {
//             type: "input",
//             message: "What is your engineer's email?",
//             name: "email"
//         },
//         {
//             type: "input",
//             message: "What is your engineer's github?",
//             name: "github"
//         }


//     ]).then(function(response) {

//         const newEngineer = new Engineer(engineersName.name, engineersName.id, engineersName.email, engineersName.officeNumber);
//         newTeam.push(newManager);
//         addMember();

//     })

// }


createManager();




// switch statement after manager is made:
// switch(response for questions of what they want to do after manking manager)
// case 'make engineer': engineerQuestionsPrompt()
// case 'make intern': internQuestionsPrompt()
// case 'quit': 

// console.log(managersName);
// const newManager = new Manager(managersName.name, managersName.id, managersName.email, managersName.officeNumber);
// newTeam.push(newManager);
// console.log(render(newTeam));
// // fs.writeFileSync(outputPath, render(newTeam));





// }


// start();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
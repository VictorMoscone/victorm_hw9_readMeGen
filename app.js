const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFilePromt = util.promisify(fs.writeFile);

inquirer
    .prompt([
        { type: "input", name: "testInput", message: "enter a test" }
    ])
    .then(({ testInput, testInput3 }) => {
        const str = `first test results: ${testInput}\nsecond test results ${testInput3}`;
        
        const rm = `
        Test ${testInput} and ${testInput3}.
        `;

        return writeFilePromt("ReadMe.md", rm)
    })
    .then(() => console.log("complete"))

    .catch((err) => console.log(err));


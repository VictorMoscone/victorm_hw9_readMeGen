const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
// The below three Requires are pulling our license notices for later.
const mitNotice = require("./licenses/mit");
const ccNotice = require("./licenses/cc");
const unlicenseNotice = require("./licenses/unlicense");

// Uses the utilities library to turn callbacks into promises.
const createFile = util.promisify(fs.writeFile);

// This is the list of user prompts  that we get when the app runs.
const userPrompts = () => {
    return inquirer.prompt([
        {
            type: `input`,
            name: `homeworkNumber`,
            message: `What's the number of the assignment?`,
        },
        {
            type: `input`,
            name: `userName`,
            message: `What's your full name?`,
        },
        {
            type: `input`,
            name: `assignmentName`,
            message: `What's the name of your assignment?`,
        },
        {
            type: `input`,
            name: `assnTitle`,
            message: `What title do you want for this assignment?`,
        },
        {
            type: `input`,
            name: `introduction`,
            message: `Write out a quick introduction to your ReadMe.`,
        },
        {
            type: `input`,
            name: `howTo`,
            message: `Write out a short summary of how the user will use your app.`,
        },
        {
            type: `input`,
            name: `yourReflection`,
            message: `Briefly reflect on the process of creating this app.`,
        },
        {
            type: `editor`,
            name: `setupInstructions`,
            message: `Explain how to setup your app for use. Include a live URL if applicable.`,
        },
        {
            type: `input`,
            name: `primaryPurpose`,
            message: `What's the primary purpose of your app?`,
        },
        {
            type: `editor`,
            name: `screenshotUrl`,
            message: `Include screenshot/video URLs for the app using github issues.`,
        },
        {
            type: `input`,
            name: `contCovenant`,
            message: `Include a link to a contributions covenant badge of your choice.`,
        },
        {
            type: `input`,
            name: `testGuide`,
            message: `Do you have any tests for this app? If so, include instructions on how to run them.`,
        },
        {
            type: `input`,
            name: `gitName`,
            message: `Provide your GitHub username.`,
        },
        {
            type: `input`,
            name: `emailInfo`,
            message: `Provide an email address for users to contact you.`,
        },
        {
            type: `editor`,
            name: `credits`,
            message: `Provide the URL of any sites that were useful.`,
        },
        {
            type: `list`,
            name: `license`,
            message: `Choose your license type.`,
            choices: ["Mit", "Creative Commons", "Unlicense"]
        },
    ]);
};

// This provides our template for the ReadMe files.
const writeReadMe = (userInput) => 
`
${licenseBadge(userInput.license)}

# ${userInput.homeworkNumber} ${userInput.userName}'s ${userInput.assignmentName} - HW${userInput.homeworkNumber}

## ${userInput.assnTitle}

**A quick description**: ${userInput.introduction}

## Table of Contents

* [Reflection](#Reflection)
* [Setup Instructions](#Setup-Instructions)
* [Usage](#Usage)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [Questions](#Questions)
* [Credits](#Credits)
* [License](#License)

${userInput.howTo}

## Reflection

${userInput.yourReflection}

## Setup Instructions

---

${userInput.setupInstructions}

---

### **Usage**

* Primary Usage: ${userInput.primaryPurpose}
* Seen below -

${userInput.screenshotUrl}

### **Contributing**

${userInput.contCovenant}

### **Tests**

${userInput.testGuide}

### **Questions**

[My GitHub Profile](https://github.com/${userInput.gitName})
My Email Information: ${userInput.emailInfo}

### **Credits** 

${userInput.credits}

- - -
### **License**
© 2020 ${userInput.userName}. All Rights Reserved.

${licenseNotice(userInput.license)}
`;

// Based on user response, this will add a badge for our chosen license.
const licenseBadge = (type) => {
    console.log(type)
    if (type == "Mit") {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else if (type == "Creative Commons") {
        return "[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)";
    } else if (type == "Unlicense") {
        return "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
    };
};

// This is what figures out and populates our license notice at the end of the ReadMe.
const licenseNotice = (type) => {
    if (type == "Mit") {
        return mitNotice;
    } else if (type == "Creative Commons") {
        return ccNotice;
    } else if (type == "Unlicense") {
        return unlicenseNotice;
    };
};

// Our asynchronous promises (thanks to promisify) to run the code.
const initialize = async () => {
    try {
        const userInput = await userPrompts();
        const readMe = writeReadMe(userInput);
        await createFile(`ReadMe.md`, readMe);
        console.log("Your file has been written.");
    } catch (err) {
        console.log(err);
    };
};

// Runs the code immediately.
initialize();
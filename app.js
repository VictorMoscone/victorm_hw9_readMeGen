const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

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
            type: `input`,
            name: `setupInstructions`,
            message: `Explain how to setup your app for use. Include a live URL if applicable.`,
        },
        {
            type: `input`,
            name: `primaryPurpose`,
            message: `What's the primary purpose of your app?`,
        },
        {
            type: `input`,
            name: `screenshotUrl`,
            message: `Include a screenshot URL for the app using github issues.`,
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
            type: `list`,
            name: `license`,
            message: `Choose your license type.`,
            choices: ["Mit", "Creative Commons", "Do What You Want"]
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

TODO: More list logic for crediting.
* https://stackoverflow.com/questions/5898656/check-if-an-element-contains-a-class-in-javascript
* https://stackoverflow.com/questions/9709758/dont-display-numbers-bullets-for-ordererd-or-unordered-list/9709788
* https://stackoverflow.com/questions/19655189/javascript-click-event-listener-on-class
* https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
* https://19january2017snapshot.epa.gov/sunsafety/uv-index-scale-1_.html#:~:text=A%20UV%20Index%20reading%20of%203%20to%205%20means%20moderate,when%20the%20sun%20is%20strongest.&text=swimming%20or%20sweating.-,Watch%20out%20for%20bright%20surfaces%2C%20like%20sand%2C%20water%20and%20snow,reflect%20UV%20and%20increase%20exposure.

- - -
### **License**
TODO: User chooses which license to use.

© 2020 Victor Moscone. All Rights Reserved.
`;

const licenseBadge = (type) => {
    console.log(type)
    if (type == "Mit") {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else if (type == "Creative Commons") {
        return "[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)";
    } else if (type == "Do What You Want") {
        return "[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)";
    }
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
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
            name: `primaryPurpose`,
            message: `What's the primary purpose of your app?`,
        },
        {
            type: `confirm`,
            name: `reflectionList`,
            message: `Do you want to start a list of possible improvements?`,
        },
    ]);
};

const listForm = (source) => {
    if (source.reflectionList) {
        const 
    };
};

// This provides our template for the ReadMe files.
const writeReadMe = (userInput) => 
`
# 0${userInput.homeworkNumber} ${userInput.userName}'s ${userInput.assignmentName} - HW${userInput.homeworkNumber}

## ${userInput.assnTitle}

**A quick description**: ${userInput.introduction}

${userInput.howTo}

## Reflection

${userInput.yourReflection}
// TODO: Reflection list logic {writeList()};

## Setup Instruction

---
TODO: Utilitize the function for list creation to do the same here.
{writeList()};
1. Clone the repro to your desktop.
2. Launch index.html.

TODO: Logic that asks if you have a live webpage. If so, you input URL.
Alternatively:
1. Visit {userInput.webUrl}
---

**Usage**

* Primary Usage: ${userInput.primaryPurpose}
* Seen below -

TODO: Need logic that prompts the user to input the various screenshot URLs.
![weather_mobile_1](https://user-images.githubusercontent.com/70674522/98459793-f9fbdd80-2152-11eb-971f-6616d4656b5a.PNG)
![weather_web_1](https://user-images.githubusercontent.com/70674522/98459794-fa947400-2152-11eb-9cd0-34be180f6668.PNG)
![weather_web_2](https://user-images.githubusercontent.com/70674522/98459795-fb2d0a80-2152-11eb-87a2-2878b71ff18f.PNG)

**Credits** 

TODO: More list logic for crediting.
* https://stackoverflow.com/questions/5898656/check-if-an-element-contains-a-class-in-javascript
* https://stackoverflow.com/questions/9709758/dont-display-numbers-bullets-for-ordererd-or-unordered-list/9709788
* https://stackoverflow.com/questions/19655189/javascript-click-event-listener-on-class
* https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
* https://19january2017snapshot.epa.gov/sunsafety/uv-index-scale-1_.html#:~:text=A%20UV%20Index%20reading%20of%203%20to%205%20means%20moderate,when%20the%20sun%20is%20strongest.&text=swimming%20or%20sweating.-,Watch%20out%20for%20bright%20surfaces%2C%20like%20sand%2C%20water%20and%20snow,reflect%20UV%20and%20increase%20exposure.

- - -
© 2020 Victor Moscone. All Rights Reserved.
`;

// Our asynchronous promises (thanks to promisify) to run the code.
const initialize = async () => {
    try {
        const userInput = await userPrompts();
        listForm(userInput);
        const readMe = writeReadMe(userInput);
        await createFile(`ReadMe.md`, readMe);
        console.log("Your file has been written.");
    } catch (err) {
        console.log(err);
    }
};

const writeList = () => {

};

// Runs the code immediately.
initialize();
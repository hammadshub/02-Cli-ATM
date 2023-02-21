#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let user = {
    name: "Hammad",
    pin: 1221,
    balance: 10000,
};
const resp = await inquirer.prompt([
    {
        message: "Pls enter pin",
        name: "pin",
        type: "password",
    },
]);
//console.log("resp:",resp);
let continueTransection = true;
if (Number(resp.pin) !== user.pin) {
    console.log(chalk.red("You have entered wrong pin"));
}
else {
    while (continueTransection == true) {
        const resp = await inquirer.prompt([
            {
                name: "selectedType",
                message: "Plz select an option",
                type: "list",
                choices: ['Withdraw', 'Fast Cash', 'Balance Inquiry'] //todo add Depositrs and bill
            },
            {
                name: "amount",
                message: "Plz select amount",
                type: "list",
                choices: ["500", "2000", "3000", "5000", "10000"],
                when(resp) {
                    return resp.selectedType == "Fast Cash";
                },
            },
            {
                name: "amount",
                message: "Plz enter amount",
                when(resp) {
                    return resp.selectedType == "Withdraw";
                },
            }
        ]);
        //console.log("selected type" , resp);
        if (resp.selectedType == "Balance Inquiry") {
            console.log(chalk.greenBright(`Your balance is: ${user.balance}`));
            const toRepeat = await inquirer.prompt([
                {
                    name: "repeat",
                    type: "confirm",
                    message: "Do you want to try another transection",
                }
            ]);
            // console.log("torepeat",toRepeat);
            if (toRepeat.repeat == true)
                continueTransection = true;
            else {
                continueTransection = false;
            }
        }
        else {
            user.balance = user.balance - resp.amount;
            console.log(chalk.yellow(`Your new balance is ${user.balance}`));
            continueTransection = false;
        }
    }
}

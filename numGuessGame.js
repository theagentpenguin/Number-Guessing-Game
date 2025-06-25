#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
//import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
// import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let numberOfChances = 0;
let chancesTaken = 0;
const sleep = (ms = 3000) => new Promise((r)=> setTimeout(r,ms));

//const randomNumber = Math.floor(Math.random()*101);
const randomNumber = 8;
let userGuess;
let gameLevel;

/************************************************************************
Name of the function: game()
Inputs: no arguments
Output: This is the fist function that is called. 
        It welcomes the player and gives instructions
*************************************************************************/
async function game(){
    console.clear();
    const welcomeMessage = chalkAnimation.karaoke(
        'Welcome to NumGuess, a number guessing game! \n'
    );
    await sleep();
    console.log(`
        ${chalk.blue('How to Play???')}
        1] Select the difficulty that you want to play with
        2] Guess the random number
        3] You'll win if you guess the correct number before your chances run out!!

        `);
}
/************************************************************************
Name of the function: chooseLevel()
Inputs: no arguments
Output: This function shows the available difficulty levels and gets the
        input from the user.
*************************************************************************/
async function chooseLevel(){
    const levels = await inquirer.prompt({
        name : 'diff_level',
        type: 'list',
        message: `Select your difficulty level:
        Easy: 10 Chances
        Medium: 5 chances
        Difficult: 3 chances`,
        choices: [
            'Easy',
            'Medium',
            'Difficult'
        ],
    });
    gameLevel = levels.diff_level;
    console.log("Game level: "+gameLevel);
    if(gameLevel === 'Easy'){
        numberOfChances = 10;
    } else if (gameLevel === 'Medium'){
        numberOfChances = 5;
    } else if(gameLevel === 'Difficult'){
        numberOfChances = 3;
    }
    //console.log(userGuess);
}
/************************************************************************
Name of the function: numGuess()
Inputs: no arguments
Output: This gets the guessed number from the player and calls solutionCheck
        function to evaluate it.
*************************************************************************/
async function numGuess(){
    if(chancesTaken > numberOfChances){
    loser();
    }
    const guesses = await inquirer.prompt({
        name : 'guessed_number',
        type: 'input',
        message: 'Enter your guess',
        default(){
            return 'any number between 0-100';
        },

    });
    userGuess = guesses.guessed_number;
    //console.log(userGuess);
    return solutionCheck(userGuess);
}
/************************************************************************
Name of the function: solutionCheck(userGuess)
Inputs: userGuess -> the number guessed by the player
Output: Evaluates the guessed number and declares winner if the guess is correct.
        Else, calls numGuess recursively till the chances run out.
*************************************************************************/
async function solutionCheck(userGuess){
    
    const spinner = createSpinner('Lets check it!!!');
    
    chancesTaken++;
    if(userGuess == randomNumber){
        winner();
    } else {
        spinner.start();
        await sleep(1000);
        if(userGuess > randomNumber){
            spinner.error(`The number is less than ${userGuess}, guess again`);
        }
        if(userGuess < randomNumber){
            spinner.error(`The number is greater than ${userGuess}, guess again`);
        }
        
        return numGuess();
        
    }
}
/************************************************************************
Name of the function: winner()
Inputs: no arguments
Output: Shows the victory banner if the player wins
*************************************************************************/
function winner(){
    console.clear();
    const msg = `   Congratulations!
    
    You have Guessed it correctly in ${chancesTaken} attempts!!!`;
    const winBanner = chalkAnimation.karaoke(msg);
    setTimeout(() => process.exit(0), 8000);   
}
/************************************************************************
Name of the function: loser()
Inputs: no arguments
Output: shows the loser banner if the player loses
*************************************************************************/
function loser(){
    console.clear();
    const msg = `   
    Oh dear!
    You've run out of chances!
    
    Better luck next time!`;
    const loseBanner = chalkAnimation.karaoke(msg);
    setTimeout(() => process.exit(0), 8000);
}

await game();
await chooseLevel();
await numGuess();
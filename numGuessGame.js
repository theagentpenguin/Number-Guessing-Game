#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
// import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let numberOfChances = 0;
let chancesTaken = 0;
const sleep = (ms = 3000) => new Promise((r)=> setTimeout(r,ms));

//const randomNumber = Math.floor(Math.random()*100);
const randomNumber = 8;
let userGuess;
let gameLevel;


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

async function chooseLevel(){
    const levels = await inquirer.prompt({
        name : 'diff_level',
        type: 'list',
        message: 'Select your difficulty level',
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

async function solutionCheck(userGuess){
    
    const spinner = createSpinner('Lets check it!!!');
    spinner.start();
    await sleep(1000);
    chancesTaken++;
    if(userGuess == randomNumber){
//        spinner.success('Good guess!');
        winner();
    } else {
        
        spinner.error('Its an incorrect guess, guess again');
        return numGuess();
        
    }
}

function winner(){
    console.clear();
    const msg = `   Congratulations!
    
    You have Guessed it correctly!!!`;
    const winBanner = chalkAnimation.karaoke(msg);
    sleep(5000);    
}

function loser(){
    console.clear();
    const msg = `   
    Oh dear!
    You've run out of chances!
    
    Better luck next time!`;
    // const loseBanner = setTimeout(()=>{
    //     chalkAnimation.karaoke(msg);
    // },5000);  
    spinner.error(chalkAnimation.karaoke(msg));
}

await game();
await chooseLevel();
await numGuess();
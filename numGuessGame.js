#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import gradient from 'gradient-string';
import readline from 'readline';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';

const sleep = (ms = 3000) => new Promise((r)=> setTimeout(r,ms));

let userGuess;
async function game(){
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

async function numGuess(){
    const guesses = await inquirer.prompt({
        num : 'guessed_number',
        type: 'input',
        message: 'Enter your guess',
        default(){
            return 'any number between 0-100';
        },

    });
    userGuess = guesses.guessed_number;
    console.log(userGuess);
}

async function solutionCheck(){

}
//await game();
await numGuess();
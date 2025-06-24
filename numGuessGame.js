#!/usr/bin/env node
import {Command} from 'commander';
import readline from 'readline';

const game = new Command();
game
    .name('Number Guess Game')
    .description('A CLI based game with commander.js')
    .option('-d, --debug','to debug')
    .option('-p, --play','Starts the game');
game.parse();

const randomNumber = Math.floor(Math.random());


game
    .command('play')
    .action(()=>{
        console.log("Select the mode you want to play!");
    });
game.parse();
const options = game.opts();
if(options.debug){
    console.log("The game shall start!");
}
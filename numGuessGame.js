#!/usr/bin/env node
import {Command} from 'commander';

const game = new Command();
game
    .name('Number Guess Game')
    .description('A CLI based game with commander.js')
    .option('-d, --debug','to debug')
    .option('-p, --play','Starts the game');
game.parse();

game
    .command('play')
    .action(()=>{
        console.log("Inside the play area");
    });
game.parse();
const options = game.opts();
if(options.debug){
    console.log("The game shall start!");
}
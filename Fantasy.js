
const { printTable } = require('console-table-printer');
//Enemmy Stats Generation Logic
function enemyStatsGen(min, max, count) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // character stats creator  
  
  class playerCreator {
    constructor(name, health, strength) {
      this.name = name;
      this.health = health;
      this.strength = strength;
    }}
  
  
  // Main character Stats and stats display
  
  const mainChar = new playerCreator("Linkussy", 100, enemyStatsGen(50,75,1))

  console.log('These are your stats')
 const logMainCharStats = [{
  name: mainChar.name,
  strength: mainChar.strength,
  health: mainChar.health
 }]

 printTable(logMainCharStats) 
  
const Enemies = ["Goblin", "Elf", "Dragon"];
const enemyChosen = Math.floor(Math.random() * Enemies.length);
const newEnemy = new playerCreator(Enemies[enemyChosen], 100, enemyStatsGen(50,100,1));
  
  //Enemy Stats Display 
  console.log("A new enemy has appeared!")
  const logEnStats =[{
    name: newEnemy.name,
    strength: newEnemy.strength,
    health: newEnemy.health,
  }]
  printTable(logEnStats);
  

 //Player Choices and choice interface
  const readline = require('readline');
  const playerChoiceInt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });



//Game loop function
function gameLoop(playerHealth, botHealth){

  //Enemy Choices Logic 
  const enChoices = ["Attack","Block","Train"];
  const botLogic =  Math.floor(Math.random() * enChoices.length);
  const botChoice = enChoices[botLogic]
  

  playerChoiceInt.question("Pick a move: ", (answer) => {
  let playerChoice = answer; // Store the player's choice in a variable

  console.log(`Lindor chooses to ${playerChoice}`);

  console.log(`The ${newEnemy.name} chose to ${botChoice}`)

  //Option logic
  // Both bot and player pick Attack
  if (answer === "Attack" && botChoice === "Attack" && mainChar.strength > newEnemy.strength) {
    newEnemy.health -= (mainChar.strength - newEnemy.strength);
  console.log(`Enemy health after attack: ${newEnemy.health}`);
  }else if(answer === "Attack" && botChoice === "Attack" && mainChar.strength < newEnemy.strength) {
    mainChar.health -= (newEnemy.strength - mainChar.strength);
    console.log(`The ${newEnemy.name} is stronger. You lost health. Your health is now ${mainChar.health}`)
  }
  // If either choses to Block
  else if(answer === "Attack" && botChoice === "Block") {
    mainChar.strength -= 5;
    console.log(`The ${newEnemy.name} has blocked your attack you lose 5 strength. Your strength is now at ${mainChar.strength}`)
  }else if (answer === "Block" && botChoice === "Attack") {newEnemy.strength -= 5;
  console.log(`You Blocked the ${newEnemy.name}'s attack. They have lost 5 strength. The ${newEnemy.name}'s strength is at ${newEnemy.strength}`);
}
 // If both choose Block 
 else if(answer === "Block" && botChoice === "Block") {
  console.log("Both players chose to block. Nothing happens");
 }
 //If player chooses Train
 if(answer === "Train" && botChoice !== "Attack") {
  mainChar.strength += 5;
  console.log(`You trained your strength. Your strength is now at ${mainChar.strength}`);
 } else if(answer === "Train" && botChoice === "Attack") {
  mainChar.health = (mainChar.health - newEnemy.strength)
  console.log(`The ${newEnemy.name} attacked you while you were training. You took the full attack. Your health is now ${mainChar.health}`)
 }
 //If Bot choses Train
 else if(botChoice === "Train" && answer !== "Attack") {
  newEnemy.strength += 5;
  console.log(`The ${newEnemy.name} chose to train. It gained 5 strengh. It now has ${newEnemy.strength}`)
 } else if(botChoice === "Train" && answer === "Attack") {
  newEnemy.health = (newEnemy.health - mainChar.strength)
  console.log(`You got a direct hit while the ${newEnemy.name} was training. Its health is now ${newEnemy.health}`)
 }
 // recursive call back to allow for more than one player input 
 gameLoop(playerHealth, botHealth);
 
 //Gameover check 
 if(mainChar.health <= 0 || newEnemy.health <= 0) {
  console.log("Game Over! Thanks for playing!")
  playerChoiceInt.close();
 }
  
})
}
gameLoop(mainChar.health, newEnemy.health);





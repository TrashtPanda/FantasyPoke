
const { printTable } = require('console-table-printer');
//Enemmy Stats Generation Logic
function enemyStatsGen(min, max, count) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const enemyStats = enemyStatsGen
  
  // Main character Stats and stats display 
  const mainChar = {
    name: "Lindor",
    age: 21,
    "Characterstats": {
      health : 100,
      strength : enemyStatsGen(50,75,1)
    }
  }
  for(let stats in mainChar) {
   if(typeof mainChar[stats] === "object") {
     console.log(`${stats}: `)
     for(let nestedStats in mainChar[stats]) {
       console.log(`${nestedStats} : ${mainChar[stats][nestedStats]}`)
     }
   } else {console.log(`${stats}: ${mainChar[stats]}`)}
  } 
  
  //Enemy Generator and random selector  
  class enemyGenBot {
    constructor(name, health, strength) {
      this.name = name;
      this.health = health;
      this.strength = strength;
    }

    initTrain(){
      this.strength += 5;
    }

    
  }


const Enemies = ["Goblin", "Elf", "Dragon"];
const enemyChosen = Math.floor(Math.random() * Enemies.length);
const newEnemy = new enemyGenBot(Enemies[enemyChosen], 100, enemyStatsGen(50,100,1));
  
  //Enemy Stats Display 
  console.log("A new enemy has appeared!")
  const logStats =[{
    name: newEnemy.name,
    strength: newEnemy.strength,
    health: newEnemy.health,
  }]
  printTable(logStats);
  for(let enStats in newEnemy) {
    console.log(enStats);
    console.log(`${enStats}: ${newEnemy[enStats]}`)
  }

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
  const botChoice = "Train"
  // enChoices[botLogic]
  

  playerChoiceInt.question("Pick a move: ", (answer) => {
  let playerChoice = answer; // Store the player's choice in a variable

  console.log(`Lindor chooses to ${playerChoice}`);

  console.log(`The ${newEnemy.name} chose to ${botChoice}`)

  //Option logic
  // Both bot and player pick Attack
  if (answer === "Attack" && botChoice === "Attack" && mainChar["Characterstats"].strength > newEnemy.strength) {
    newEnemy.health -= (mainChar["Characterstats"].strength - newEnemy.strength);
  console.log(`Enemy health after attack: ${newEnemy.health}`);
  }else if(answer === "Attack" && botChoice === "Attack" && mainChar["Characterstats"].strength < newEnemy.strength) {
    mainChar["Characterstats"].health -= (newEnemy.strength - mainChar["Characterstats"].strength);
    console.log(`The ${newEnemy.name} is stronger. You lost health. Your health is now ${mainChar["Characterstats"].health}`)
  }
  // If either choses to Block
  else if(answer === "Attack" && botChoice === "Block") {
    mainChar["Characterstats"].strength -= 5;
    console.log(`The ${newEnemy.name} has blocked your attack you lose 5 strength. Your strength is now at ${mainChar["Characterstats"].strength}`)
  }else if (answer === "Block" && botChoice === "Attack") {newEnemy.strength -= 5;
  console.log(`You Blocked the ${newEnemy.name}'s attack. They have lost 5 strength. The ${newEnemy.name}'s strength is at ${newEnemy.strength}`)
}
 // If both choose Block 
 else if(answer === "Block" && botChoice === "Block") {
  console.log("Both players chose to block. Nothing happens")
 }
 //If player chooses Train
 if(answer === "Train" && botChoice !== "Attack") {
  console.log("triggered")
  mainChar["Characterstats"].strength += 5;
  console.log(mainChar)
  console.log(`You trained your strength. Your strength is now at ${mainChar['Characterstats'].strength}`)
 } else if(answer === "Train" && botChoice === "Attack") {
  mainChar["Characterstats"].health = (mainChar["Characterstats"].health - newEnemy.strength)
  console.log(`The ${newEnemy.name} attacked you while you were training. You took the full attack. Your health is now ${mainChar["Characterstats"].health}`)
 }
 //If Bot choses Train
 else if(botChoice === "Train" && answer !== "Attack") {
  newEnemy.strength += 5;
  console.log(`The ${newEnemy.name} chose to train. It gained 5 strengh. It now has ${newEnemy.strength}`)
 } else if(botChoice === "Train" && answer === "Attack") {
  newEnemy.health = (newEnemy.health - mainChar["Characterstats"].strength)
  console.log(`You got a direct hit while the ${newEnemy.name} was training. Its health is now ${newEnemy.health}`)
 }
 // recursive call back to allow for more than one player input 
 gameLoop(playerHealth, botHealth);
 
 //Gameover check 
 if(mainChar["Characterstats"].health <= 0 || newEnemy.health <= 0) {
  console.log("Game Over! Thanks for playing!")
  playerChoiceInt.close();
 }
  
})
}
gameLoop(mainChar["Characterstats"].health, newEnemy.health);





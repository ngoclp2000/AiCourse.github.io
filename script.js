var Board;
const humans = 'X';
const AIplayer = 'O';
let sizeOfBoard = 5;
var delayInMilliseconds = 1000; //1 second
const winDirection1 =[
    [0 ,1 ,2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const winDirection2 =[
    [0,1,2,3],
    [1,2,3,4],
    [5,6,7,8],
    [6,7,8,9],
    [10,11,12,13],
    [11,12,13,14],
    [15,16,17,18],
    [16,17,18,19],
    [20,21,22,23],
    [21,22,23,24],
    [0,5,10,15],
    [5,10,15,20],
    [1,6,11,16],
    [6,11,16,21],
    [2,7,12,17],
    [7,12,17,22],
    [3,8,13,18],
    [8,13,18,23],
    [4,9,14,19],
    [9,14,19,24],
    [1,7,13,19],
    [0,6,12,18],
    [6,12,18,24],
    [5,11,17,23],
    [3,7,11,15],
    [4,8,12,16],
    [8,12,16,20],
    [9,13,17,21]
];
const cells = document.querySelectorAll('.cell');

function startGame(){
    Board = Array.from(Array(25).keys);
    for(let i = 0; i < 25; i++){
        cells[i].innerText = "";
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnclick, false);
    }
    document.querySelector("#playing").style.display = "block";
    document.querySelector("#playbut").innerText = "Replay";
}
function turnclick(cell){
    let gameWon = turn(cell.target.id,humans);
    if(!gameWon){
        document.querySelector("#playing").innerText = "Turn: Computer";
        for(let i = 0 ; i < Math.pow(sizeOfBoard,2); i++){
            document.getElementById(i).removeEventListener('click', turnclick, false);
        }
        setTimeout(function() {
        //your code to be executed after 1 second
        if(!checkTie()) {
            for(let i = 0 ; i < Math.pow(sizeOfBoard,2); i++){
                if(!(Board[i] == humans || Board[i] == AIplayer)){
                    document.getElementById(i).addEventListener('click',turnclick, false);
                }
            }
            turn(bestSpot(), AIplayer);
        }
        
        document.querySelector("#playing").innerText = "Turn: Player";
             }, delayInMilliseconds);
            }       
}
function turn(id, player){
    Board[Number(id)] = player;
    document.getElementById(id).innerText = player;
    document.getElementById(id).style.background = "red";
    document.getElementById(id).removeEventListener('click', turnclick, false);
    let gameWon = checkWin();
    return gameWon;
}
function checkWin(){
    var check = 0;
    let winner;
    winDirection2.forEach(element => {
           if(sizeOfBoard == 3){
               if(Board[element[0]] == humans && Board[element[1]] == humans && Board[element[2]] == humans){
                   check = 1;
                   winner = humans;
               }
               else if(Board[element[0]] == humans && Board[element[1]] == humans && Board[element[2]] == AIplayer){
                check = 1;
                winner = AIplayer;
            }
           }else{
            console.log(Board[element[0]],Board[element[1]],Board[element[2]],Board[element[3]]);
            if(Board[element[0]] == humans && Board[element[1]] == humans && Board[element[2]] == humans && Board[element[3]] == humans){
                check = 1;
                winner = humans;
            }
            else if(Board[element[0]] == AIplayer && Board[element[1]] == AIplayer &&  Board[element[2]] == AIplayer && Board[element[3]] == AIplayer){
                check = 1;
                winner = AIplayer;
            }
           }
    });
    if(check){
        for(let i = 0 ;i < Math.pow(sizeOfBoard,2) ;i++){
            document.getElementById(i).removeEventListener('click', turnclick , false);
        } 
        document.querySelector("#playbut").innerText = "Replay";
        declareWinner(winner);  
        return true;
    }
    else 
        return false;
}
function bestSpot(){
    for(let i = 0 ; i < 25 ; i++){
        if(Board[i] == undefined ){
            return i;
        }
    }
}
function checkTie(){
    for(let i = 0 ; i < 25 ;i++){
        if(Board[i] == undefined){
            return false;
        }
    }
    for(let i = 0 ; i < 25 ;i++){
        cells[i].style.backgroundColor = "green";
        declareWinner("Tie Game!!!");
    }
    document.querySelector("#playbut").innerText = "Replay";
    return true;
}
function declareWinner(player){
    document.getElementById("myNav").style.width = "100%";
    document.getElementById("winner-player").innerText = "Winner: " + player;
}
document.getElementById("content").style.height = innerHeight + "px";

let menu = document.querySelector("#menu-starter");
let button = document.querySelectorAll(".option-but");
let BoardStart = document.querySelector(".main");
function start(){
   menu.style.display = "none";
   button[0].style.display = "block";
   button[1].style.display = "block";
   BoardStart.style.display = "block";
}
function back(){
    menu.style.removeProperty("display");
    button[0].style.display = "none";
    button[1].style.display ="none";
    BoardStart.style.display ="none";
    document.querySelector("#playing").style.display = "none";
}
function restart(){
    document.getElementById("myNav").style.width = "0%";
    startGame();
}
function backtoMenu(){
    document.getElementById("myNav").style.width = "0%";
    document.querySelector("#playing").style.display = "none";
}
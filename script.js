var Board;
const humans = 'X';
const AIplayer = 'O';
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
    document.querySelector(".endgame").style.display = "none";
    Board = Array.from(Array(25).keys);
    for(let i = 0; i < 25; i++){
        cells[i].innerText = "";
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnclick, false);
    }
}
function turnclick(cell){
    let gameWon = turn(cell.target.id,humans);
    if(!gameWon)
        if(!checkTie()) turn(bestSpot(), AIplayer);
}
function turn(id, player){
    Board[id] = player;
    document.getElementById(id).innerText = player;
    document.getElementById(id).style.background = "red";
    document.getElementById(id).removeEventListener('click', turnclick, false);
    let gameWon = checkWin();
    console.log(gameWon);
    return gameWon;
}
function checkWin(){
    let check;
    console.log(Board);
    winDirection2.forEach(element => {
           if(Board[element[0]] == 'X' && Board[element[1]] == 'X' && Board[element[2]] == 'X' && Board[element[3]] == 'X' ){
               
               for(let i = 0 ;i < 25 ;i++){
                   document.getElementById(i).removeEventListener('click', turnclick , false);
               }    
                    document.querySelector("#playbut").innerText = "Replay";
                    declareWinner(humans);     
                   check = 1;
           }
            if(Board[element[0]] == 'O' && Board[element[1]] == 'O' && Board[element[2]] == 'O' && Board[element[3]] == 'O'){
                for(let i = 0 ;i < 25 ;i++){
                    document.getElementById(i).removeEventListener('click', turnclick , false);
                }
                document.querySelector("#playbut").innerText = "Replay";
               declareWinner(AIplayer);
               check = 1;
           }
    });
    if(check){
        return true;
    }else return false;
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
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = player;
}
document.getElementById("content").style.height = innerHeight + "px";

let Board;
const humans = 'X';
const AIplayer = 'O';
var sizeOfBoard,cells;
var delayInMilliseconds = 0; //1 second
let BoardStart;
let winnerTemp;
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
    [0,1,2,3,4],
    [5,6,7,8,9],
    [10,11,12,13,14],
    [15,16,17,18,19],
    [20,21,22,23,24],
    [0,5,10,15,20],
    [1,6,11,16,21],
    [2,7,12,17,22],
    [3,8,13,18,23],
    [4,9,14,19,24],
    [0,6,12,18,24],
    [4,8,12,16,20]
];

let choice_win_direct;
function SizeofBoard(number){
    sizeOfBoard = number;
    button[0].style.display = "block";
    button[1].style.display = "block";
    if(sizeOfBoard == 5){
        cells = document.querySelectorAll('#table5 .cell');
        BoardStart = document.getElementById("table5");
        BoardStart.style.display = "block";
        choice_win_direct = winDirection2;
    }
    else
    {
        cells = document.querySelectorAll('#table3 .cell');
        BoardStart = document.getElementById("table3");
        document.getElementById("_table3").style.left = "42%";
        BoardStart.style.display = "block";
        choice_win_direct = winDirection1;
    }
    document.getElementById("overlay").style.width = "0%";
    startGame();
}

function startGame(){
    Board = Array.from(Array(Math.pow(sizeOfBoard,2)).keys);
    for(let i = 0; i < Math.pow(sizeOfBoard,2); i++){
        cells[i].innerText = "";
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnclick, false);
    }
    document.querySelector("#playing").style.display = "block";
    if(sizeOfBoard == 3)
        document.querySelector(".playbut3").innerText = "Replay";
    else
        document.querySelector(".playbut5").innerText = "Replay";
}

function turnclick(cell){
    playSound();
    let gameWon = turn(cell.target.id,humans);
    if(!gameWon){
        document.querySelector("#playing").innerText = "Turn: Computer";
        let true_id = "#table" + sizeOfBoard  + " " + "table" + " " + "td";
        true_id = document.querySelectorAll(true_id);
        for(let i = 0 ; i < Math.pow(sizeOfBoard,2); i++){
            true_id[i].removeEventListener('click', turnclick, false);
        }
        if(!checkTie()){
        setTimeout(function() {
        //your code to be executed after 1 second
        
            for(let i = 0 ; i < Math.pow(sizeOfBoard,2); i++){
                if(!(Board[i] == humans || Board[i] == AIplayer)){
                    true_id[i].addEventListener('click',turnclick, false);
                }
            }
            turn(bestSpot(Board,AIplayer)[0], AIplayer);
            playSound();
        document.querySelector("#playing").innerText = "Turn: Player";
             }, delayInMilliseconds);
            }
        }       
}
function turn(id, player){
    Board[Number(id)] = player;
    let true_id = "#table" + sizeOfBoard  + " " + "table" + " " + "td";
    true_id = document.querySelectorAll(true_id);
    true_id[id].innerText = player;
    true_id[id].style.background = "red";
    true_id[id].removeEventListener('click', turnclick, false);
    let gameWon = checkWin(Board);
    if(gameWon){
        for(let i = 0 ;i < Math.pow(sizeOfBoard,2) ;i++){
            document.getElementById(i).removeEventListener('click', turnclick , false);
        } 
        document.querySelector("#playbut").innerText = "Replay";
        declareWinner(player); 
    }
    return gameWon;
}
function checkWin(Board1){
    var check = 0;
    let winner;
    choice_win_direct.forEach(element => {
           if(sizeOfBoard == 3){
               if(Board1[element[0]] == humans && Board1[element[1]] == humans && Board1[element[2]] == humans){
                   check = 1;
                   winner = humans;
                   winnerTemp = humans;
               }
               else if(Board1[element[0]] == AIplayer && Board1[element[1]] == AIplayer && Board1[element[2]] == AIplayer){
                check = 1;
                winner = AIplayer;
                winnerTemp = AIplayer;
            }
           }else{
            //console.log(Board[element[0]],Board[element[1]],Board[element[2]],Board[element[3]]);
            if(Board1[element[0]] == humans && Board1[element[1]] == humans && Board1[element[2]] == humans && Board1[element[3]] == humans && Board1[element[4]] == humans){
                check = 1;
                winner = humans;
                winnerTemp = humans;
            }
            else if(Board1[element[0]] == AIplayer && Board1[element[1]] == AIplayer &&  Board1[element[2]] == AIplayer && Board1[element[3]] == AIplayer && Board1[element[4]]== AIplayer){
                check = 1;
                winner = AIplayer;
                winnerTemp = AIplayer;
            }
           }
    });
    if(check){ 
        return true;
    }
    else 
        return false;
}
function checkTie(){
    for(let i = 0 ; i < Math.pow(sizeOfBoard,2) ;i++){
        if(Board[i] == undefined){
            return false;
        }
    }
    for(let i = 0 ; i < Math.pow(sizeOfBoard,2) ;i++){
        cells[i].style.backgroundColor = "green";
        declareWinner("Tie Game!!!");
    }
    document.querySelector("#playbut").innerText = "Replay";
    return true;
}
function declareWinner(player){
    document.getElementById("myNav").style.width = "100%";
    document.getElementById("winner-player").innerText =   player;
}


let menu = document.querySelector("#menu-starter");
let button = document.querySelectorAll(".option-but");
function start(){
   document.getElementById("overlay").style.width = "100%";
   menu.style.display = "none";
}
function back(){
    menu.style.removeProperty("display");
    startGame();
    button[0].style.display = "none";
    button[1].style.display ="none";
    BoardStart.style.display ="none";
    document.querySelector("#playing").style.display = "none";
    document.querySelector("#playbut").innerText = "Play";
}
function restart(){
    document.getElementById("myNav").style.width = "0%";
    document.getElementById("overlay").style.width = "100%";
    BoardStart.style.display = "none";
    document.getElementById("playing").style.display = "none";
}
function backtoMenu(){
    document.getElementById("myNav").style.width = "0%";
    document.querySelector("#playing").style.display = "none";
}
var sound = new Audio();         // create the audio
sound.src = "sound.wav";  // set the resource location 
sound.oncanplaythrough = function(){   // When the sound has completely loaded
    sound.readyToRock = true;    // flag sound is ready to play
                                   // I just made it up and can be anything
};
sound.onerror = function(){      // not required but if there are problems this will help debug the problem
    console.log("Sound file SoundFileURL.mp3 failed to load.")
};
function playSound(){
    if(sound && sound.readyToRock){  // check for the sound and if it has loaded
        sound.currentTime = 0;       // seek to the start
        sound.play();                // play it till it ends
    }
}
document.getElementById("content").style.height = innerHeight + "px";

function find_min(list){
    let min = Infinity;
    let node_chose = [];
    list.forEach(element=>{
        if(element[1] < min){
            node_chose = element;
            min = element[1];
        }
    });
    return node_chose;
}
function find_max(list){
    let max = -Infinity;
    let node_chose = [];
    list.forEach(element=>{
        if(element[1] > max){
            node_chose = element;
            max = element[1];
        }
    });
    return node_chose;
}
function Find_available_node(_Board){
    let list = [];
    for(let i = 0 ; i < Math.pow(sizeOfBoard,2);i++){
        if(_Board[i] === undefined)
            list.push(i);
    }
    return list;
}

function _checkTie(_Board){
    for(let i = 0 ; i < Math.pow(sizeOfBoard,2) ;i++){
        if(_Board[i] === undefined){
            return false;
        }
    }
    return true;
}
function bestSpot(_Board,player){
    if(Find_available_node(_Board).length <= 10){
        return minmax(_Board,player,0)
    }else{
        do{
            let random_pos = Math.floor(Math.random() * Math.pow(sizeOfBoard,2));
            if(Board[random_pos] == undefined)
                return [random_pos];
        }while(1);
    }
}

function minmax(_Board,player,depth){
    let list = [[]];
    let list_available_node =  Find_available_node(_Board);
    list_available_node.forEach(element => {
        let Board_copy = [..._Board];
        Board_copy[element] = player;
        if(checkWin(Board_copy))
            if(player == AIplayer)
                 list.push([element,10-depth]);
            else 
                list.push([element,depth-10]);
        else if(_checkTie(Board_copy))
                list.push([element,0]);
        else 
                list.push([element,minmax(Board_copy, player == AIplayer ? humans : AIplayer,depth+1)[1]]);
    });
    if(player == AIplayer){
        return find_max(list);
    }
    else{
        return find_min(list);
    }
}

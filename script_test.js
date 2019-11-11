let Board;
const humans = 'X';
const AIplayer = 'O';
var sizeOfBoard,cells;
var delayInMilliseconds = 500; //1 second
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
    [0,6,12,18],
    [6,12,18,24],
    [4,8,12,16],
    [8,12,16,20]
];
// const winDirection3 =[
//     [0,1,2,3,4],
//     [5,6,7,8,9],
//     [10,11,12,13,14],
//     [15,16,17,18,19],
//     [20,21,22,23,24],
//     [0,5,10,15,20],
//     [1,6,11,16,21],
//     [2,7,12,17,22],
//     [3,8,13,18,23],
//     [4,9,14,19,24],
//     [0,6,12,18,24],
//     [4,8,12,16,20]
// ];

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
            turn(bestSpot(Board,AIplayer), AIplayer);
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
        declareWinner(player); 
    }
    return gameWon;
}

function checkWin(Board1){
    // Phần này chắc dễ hiểu =))
    let check = 0 ;
    if(sizeOfBoard == 3){
        choice_win_direct.forEach(element=>{
            let num_X = 0;
            let num_O = 0;
            element.forEach(pos=>{
                if(Board1[pos] == humans)
                    num_X++;
                else if(Board1[pos] == AIplayer)
                    num_O++;
            })
            if((num_X == 3 && num_O == 0) || (num_X == 0 && num_O == 3)){
                check = 1;
            }
        })
    }else{
        choice_win_direct.forEach(element=>{
            let num_X = 0;
            let num_O = 0;
            element.forEach(pos=>{
                if(Board1[pos] == humans)
                    num_X++;
                else if(Board1[pos] == AIplayer)
                    num_O++;
            })
            if((num_X == 4 && num_O == 0) || (num_X == 0 && num_O == 4)){
                check = 1;
            }
        })
    }
    if(check)
        return true;
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
    return true;
}
function declareWinner(player){
    document.getElementById("myNav").style.width = "100%";
    document.getElementById("winner-player").innerText =   player;
}



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
        let value = Find_available_node(_Board);
        return alpha_beta_pruning(_Board,0,player,-1000,1000)[0];
    }else{
       return eval(_Board);
    }
}
let count = 0;
// Not done please consider more about alpha beta
function alpha_beta_pruning(_Board,depth,player,alpha,beta){
    
    count++; // Count how many times the function called
    let list = Find_available_node(_Board);
    let list_return_value = [];
    for(let i = 0 ; i < list.length ; i++){
        let _boardCopy = [..._Board];
        _boardCopy[list[i]] = player;
        if(checkWin(_boardCopy)){
            if(player == AIplayer)
                list_return_value.push([list[i],1]);
            else
            list_return_value.push([list[i],-1]);
        }else if(_checkTie(_boardCopy)){
            list_return_value.push([list[i],0]);
        }
        else{
                let value = alpha_beta_pruning(_boardCopy,depth+1,player == AIplayer ? humans : AIplayer,alpha,beta);
                list_return_value.push([list[i],value[1]]);
                if(player === AIplayer){
                    alpha  = Math.max(alpha,value[1]);
                }else{
                    beta = Math.min(beta,value[1]);
                }
        }
        if(alpha >= beta)
            break;
    }
    if(player === AIplayer){
        return find_max(list_return_value);
    }else{
        return find_min(list_return_value);
    }
}
// Hàm đánh giá điểm của từng states mà O được điền vào từng ô trống
function eval(_Board){
    let list = Find_available_node(_Board);
    let list_return_value = [];
    list.forEach(element=>{
        let Board_copy = [..._Board];
        Board_copy[element] = AIplayer;
        list_return_value.push([Point(Board_copy),element]);
    })
    let max = [-Infinity,1];
    for(let i = 0 ; i < list_return_value.length ; i++){
        if(list_return_value[i][0] > max[0])
            max = list_return_value[i];
    }
    return max[1];
}

function Point(_Board){
    let point = 0;
    choice_win_direct.forEach(element=>{
        let num_O = 0;
        let num_X = 0;
      for(let i = 0 ; i < element.length ; i++){
        if(_Board[element[i]] == humans)
            num_X++;
        else if(_Board[element[i]] == AIplayer)
            num_O++;
      } 
        point += calculate(num_X,num_O);
    })
    return point;
}
//Hàm tính điểm dựa vào số lượng X,O trong row col diag 
function calculate(numX,numO){
    let point = 0;
    if(numX == 3 && numO == 0)
        point-=1000;
    else if(numO == 4)
        point+=2000;
    else if(numO > 0)
        point++;
    else if(numX == 2 && numO == 0)
        point--;
    else if(numO == 3 && numX ==0)
        point++;
    return point;
}
// function minmax(_Board,player,depth){
//     let list = [[]];
//     let list_available_node =  Find_available_node(_Board);
//     list_available_node.forEach(element => {
//         let Board_copy = [..._Board];
//         Board_copy[element] = player;
//         if(checkWin(Board_copy))
//             if(player == AIplayer)
//                  list.push([element,10-depth]);
//             else 
//                 list.push([element,depth-10]);
//         else if(_checkTie(Board_copy))
//                 list.push([element,0]);
//         else 
//                 list.push([element,minmax(Board_copy, player == AIplayer ? humans : AIplayer,depth+1)[1]]);
//     });
//     if(player == AIplayer){
//         return find_max(list);
//     }
//     else{
//         return find_min(list);
//     }
// }


// For logic behavior

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
    BoardStart.style.display = "none";
    menu.style.removeProperty("display");
    button[0].style.display = "none";
    button[1].style.display ="none";
    document.querySelector("#pausegame").style.width = "0%";
}
function pause(){
    document.querySelector("#pausegame").style.width = "100%";
}
function resume(){
    document.querySelector("#pausegame").style.width = "0%";
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
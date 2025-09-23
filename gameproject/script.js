var fruits = ["appleg" ,"beryg","mangog","mangog","orangeg","watermilaing"]
let timeleft = 100;
let timerinterval;
let gameInterval

var board = []
var rows = 9
var columns = 9
var score = 0

var curtile;
var othertile;
let gameStarted = false; // 🔹 New flag

window.onload = function(){
    startgame()
    starttimer()

    gameInterval = window.setInterval(function(){
        crushfruits()
        slidefruit()
        genratefruits()
    },100)
}

function randomfruit(){
    return fruits[Math.floor(Math.random() * fruits.length)];
}

function startgame(){
    for(let i = 0  ;i<rows;i++){
        let row = []
        for(let j = 0 ;j<columns;j++){
            let tile = document.createElement('img')
            tile.id = i.toString()+ "-" + j.toString();

            tile.src = "./images/" + randomfruit()+".png";

            tile.addEventListener("dragstart",dragstart)
            tile.addEventListener("dragover",dragover)
            tile.addEventListener("dragenter",dragenter)
            tile.addEventListener("dragleave",dragleave)
            tile.addEventListener("dragend",dragend)
            tile.addEventListener("drop",dragdrop)

            document.getElementById("board").append(tile)
            row.push(tile)
        }
        board.push(row)
    }
}

function starttimer(){
    const timerDisplay = document.getElementById("timer");

    timerinterval = setInterval(()=>{
        let mint = Math.floor(timeleft/60)
        let sec = timeleft % 60
        timerDisplay.innerText = mint.toString().padStart(2,"0")+":"+ sec.toString().padStart(2,"0") 

        if(timeleft <= 0 ){
            clearInterval(timerinterval)
            gameover()
        }
        timeleft--
    },1000)
}

function gameover(){
    clearInterval(timerinterval)
    clearInterval(gameInterval);

    let overlay = document.createElement("div");
    overlay.classList.add("overlay");

    let popup = document.createElement("div");
    popup.classList.add("gameoverpopup");

    if(score >= 200){
        popup.innerHTML = ` <h2> <img style="width:50px; height:"55px" src="./images/orangeg.png"/> Congratulation You Win ! <h2>
        <p> Your Final Score: <b>${score}</b></p>
        <button id="playmore">Play For HighScore</button>`;
    }else{
        popup.innerHTML = ` <h2> <img style="width:50px; height:"55px" src="./images/gameover.png"/> Game Over! <h2>
        <p> Your Final Score: <b>${score}</b></p>
        <button id="playagain">Play Again</button>`;
    }

    overlay.appendChild(popup);
    document.body.appendChild(overlay)

    if(score >=200){
        document.getElementById("playmore").addEventListener("click",restartgame)
    }else{
        document.getElementById("playagain").addEventListener("click",restartgame)
    }
}

function restartgame(){
    score=0;
    timeleft=200;
    gameStarted = false; // 🔹 Reset flag
    document.getElementById("score").innerText = score

    document.getElementById("board").innerHTML = "";
    board=[];

    document.querySelector(".overlay").remove()

    startgame()
    starttimer()

    gameInterval =  window.setInterval(function(){
        crushfruits()
        slidefruit()
        genratefruits()
    },100)
}

function dragstart(){
    curtile = this
}

function dragover(e){
    e.preventDefault()
}

function dragenter(e){
    e.preventDefault()
}

function dragleave(e){
    e.preventDefault()
}

function dragdrop(){
    othertile = this
}

function dragend(){
    if(curtile.src.includes("blank")|| othertile.src.includes("blank")){
        return;
    }
    let curcoords = curtile.id.split("-")
    let i = parseInt(curcoords[0])
    let  j = parseInt(curcoords[1])
    let othercords = othertile.id.split("-")

    let i1 = parseInt(othercords[0])
    let j1 = parseInt(othercords[1])

    let moveleft = j1 == j-1 && i == i1
    let moveright = j1 == j+1 && i == i1
    let movetop = i == i1-1 && j == j1
    let movebot= i == i1+1 && j == j1

    let isthsicondition = moveleft || moveright || movebot || movetop

    if(isthsicondition){
        let curimg = curtile.src;
        let otherimg = othertile.src;
        curtile.src = otherimg;
        othertile.src = curimg

        let validmove = checkvalid()
        if(!validmove){
            let curimg = curtile.src;
            let otherimg = othertile.src;
            curtile.src = otherimg;
            othertile.src = curimg
        } else {
            gameStarted = true; // 🔹 First valid move ke baad hi score count hoga
        }
    }
}

function crushfruits(){
    crushfour()
    crushthree()
    document.getElementById("score").innerText = score
}

function crushthree(){
    for(let  i=0 ;i<rows;i++){
        for(let j = 0 ;j<columns-2;j++){
           let fruit1 = board[i][j]
           let fruit2 =  board[i][j+1]
           let fruit3 = board[i][j+2]
           if(fruit1.src == fruit2.src && fruit2.src == fruit3.src && !fruit1.src.includes("blank")){
                fruit1.src = "./images/blank.png";
                fruit2.src = "./images/blank.png";
                fruit3.src = "./images/blank.png";
                if(gameStarted) score+=3; // 🔹 Score sirf game start hone ke baad hi
           } 
        }
    }

    for(let  j=0 ;j<columns;j++){
        for(let i = 0 ;i<rows-2;i++){
           let fruit1 = board[i][j]
           let fruit2 =  board[i+1][j]
           let fruit3 = board[i+2][j]
           if(fruit1.src == fruit2.src && fruit2.src == fruit3.src && !fruit1.src.includes("blank")){
                fruit1.src = "./images/blank.png";
                fruit2.src = "./images/blank.png";
                fruit3.src = "./images/blank.png";
                if(gameStarted) score+=3; 
           } 
        }
    }
}

function crushfour(){
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns - 3; j++) {
            let fruit1 = board[i][j];
            let fruit2 = board[i][j + 1];
            let fruit3 = board[i][j + 2];
            let fruit4 = board[i][j + 3];
            if (
                fruit1.src == fruit2.src &&
                fruit2.src == fruit3.src &&
                fruit3.src == fruit4.src &&
                !fruit1.src.includes("blank")
            ) {
                fruit1.src = "./images/blank.png";
                fruit2.src = "./images/blank.png";
                fruit3.src = "./images/blank.png";
                fruit4.src = "./images/blank.png";
                if(gameStarted) score += 5; // 🔹 Same change
            }
        }
    }

    for (let j = 0; j < columns; j++) {
        for (let i = 0; i < rows - 3; i++) {
            let fruit1 = board[i][j];
            let fruit2 = board[i + 1][j];
            let fruit3 = board[i + 2][j];
            let fruit4 = board[i + 3][j];
            if (
                fruit1.src == fruit2.src &&
                fruit2.src == fruit3.src &&
                fruit3.src == fruit4.src &&
                !fruit1.src.includes("blank")
            ) {
                fruit1.src = "./images/blank.png";
                fruit2.src = "./images/blank.png";
                fruit3.src = "./images/blank.png";
                fruit4.src = "./images/blank.png";
                if(gameStarted) score += 5;
            }
        }
    }
}

function checkvalid(){
    for(let  i=0 ;i<rows;i++){
        for(let j = 0 ;j<columns-2;j++){
           let fruit1 = board[i][j]
           let fruit2 =  board[i][j+1]
           let fruit3 = board[i][j+2]
           if(fruit1.src == fruit2.src && fruit2.src == fruit3.src && !fruit1.src.includes("blank")){
               return true
           } 
        }
    }

    for(let  j=0 ;j<columns;j++){
        for(let i = 0 ;i<rows-2;i++){
           let fruit1 = board[i][j]
           let fruit2 =  board[i+1][j]
           let fruit3 = board[i+2][j]
           if(fruit1.src == fruit2.src && fruit2.src == fruit3.src && !fruit1.src.includes("blank")){
               return true
           } 
        }
    }
    return false
}

function slidefruit(){
    for(let c = 0 ;c<columns;c++){
        let ind = rows-1
        for(let r = columns-1;r>=0;r--){
            if(!board[r][c].src.includes("blank")){
                board[ind][c].src = board[r][c].src;
                ind -= 1
            }
        }
        for(let r = ind; r>=0;r--){
            board[r][c].src =  "./images/blank.png"
        }
    }
}

function genratefruits(){
    for(let c = 0 ; c<columns;c++){
        if(board[0][c].src.includes("blank")){
            board[0][c].src = "./images/"+randomfruit()+".png"
        }
    }
}

let candies=["Blue","Orange","Green","Purple","Red","Yellow"];
let board=[];
let rows= 9;
let columns= 9;
let score= 0;

let currTile;
let otherTile;

window.onload = function(){
    startGame();
    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    },100);
}

function randomCandy(){
    return candies[Math.floor(Math.random() * candies.length)];
}

function startGame(){
    for(let i=0; i<rows; i++){
       let temp=[];
       for(let j=0; j<columns; j++){
          let tile = document.createElement("img");
          tile.id = i.toString()+ "-" + j.toString();
          tile.src = "./images/"+randomCandy()+".png";

          tile.addEventListener("dragstart", dragStart);
          tile.addEventListener("dragover", dragOver);
          tile.addEventListener("dragenter", dragEnter);
          tile.addEventListener("dragleave", dragLeave);
          tile.addEventListener("drop", dragDrop);
          tile.addEventListener("dragend", dragEnd);

          document.getElementById("board").append(tile);
          temp.push(tile);
       }
       board.push(temp);
    }
    console.log(board);
}

function dragStart(){
    currTile= this;
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){

}

function dragDrop(){
    otherTile= this;
}

function dragEnd(){
    if(currTile.src.includes("blank") || otherTile.src.includes("blank")){
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = +currCoords[0];
    let c = +currCoords[1];

    let otherCoords = otherTile.id.split("-");
    let r2 = +otherCoords[0];
    let c2 = +otherCoords[1];

    let moveLeft = c2==c-1 && r==r2;
    let moveRight = c2==c+1 && r==r2;
    
    let moveUp = r2==r-1 && c==c2;
    let moveDown = r2==r+1 && c==c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if(isAdjacent){
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if(!validMove){
            let currImg= currTile.src;
            let otherImg= otherTile.src;
            currTile.src= otherImg;
            otherTile.src= currImg;
        }
    }
}

function crushCandy(){
    crushThree();
    document.getElementById("score").innerText = score;
}

function crushThree(){
    for(let i=0; i<rows; i++){
        for(let j=0; j<columns-2; j++){
            let candy1= board[i][j];
            let candy2= board[i][j+1];
            let candy3= board[i][j+2];
            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("blank")){
                candy1.src="./images/blank.png";
                candy2.src="./images/blank.png";
                candy3.src="./images/blank.png";
                score+=30;
            }
        }
    }

    for(let j=0; j<columns; j++){
        for(let i=0; i<rows-2; i++){
            let candy1= board[i][j];
            let candy2= board[i+1][j];
            let candy3= board[i+2][j];
            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("blank")){
                candy1.src="./images/blank.png";
                candy2.src="./images/blank.png";
                candy3.src="./images/blank.png";
                score+=30;
            }
        }
    }
}

function checkValid(){
    for(let i=0; i<rows; i++){
        for(let j=0; j<columns; j++){
            let candy1= board[i][j];
            let candy2= board[i][j+1];
            let candy3= board[i][j+2];
            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("blank")){
                return true;
            }
        }
    }

    for(let j=0; j<columns; j++){
        for(let i=0; i<rows-2; i++){
            let candy1= board[i][j];
            let candy2= board[i+1][j];
            let candy3= board[i+2][j];
            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("blank")){
                return true;
            } 
        }
    }

    return false;
}

function slideCandy(){
    for(let j=0; j<columns; j++){
        let ind= rows-1;
        for(let i=columns-1; i>=0; i--){
            if(!board[i][j].src.includes("blank")){
                board[ind][j].src= board[i][j].src;
                ind -= 1;
            }
        }

        for(let i=ind; i>=0; i--){
            board[i][j].src= "./images/blank.png";
        }
    }
}

function generateCandy(){
    for(let j=0; j<columns; j++){
        if(board[0][j].src.includes("blank")){
            board[0][j].src= "./images/"+randomCandy()+".png";
        }
    }
}
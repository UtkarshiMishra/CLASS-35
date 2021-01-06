var ball;
var hbp;
var database; 

function setup(){

    createCanvas(500,500);
    
    database = firebase.database();
    console.log(database);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    hbp = database.ref('Ball/Position')
    hbp.on("value",readPosition,showError)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('Ball/Position').set({
        'x':position.x + x,
        'y':position.y + y
    })
    
   // ball.x = ball.x + x;
    //ball.y = ball.y + y;
}

function readPosition(data) {
    position = data.val();
    console.log(position);
    ball.x = position.x
    ball.y = position.y
}

function showError() {
    console.log("error");
}
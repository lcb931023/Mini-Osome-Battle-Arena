/*//////////////game client script////////////////
Functionality:
 - Set up Socket
 - Send message through socket
 - Set up Canvas
 - Update Canvas

**************************************************/
/**************************************************
** GAME VARIABLES
**************************************************/
var canvas,			// Canvas DOM element
	ctx,			// Canvas rendering context
	inputs,			// Client input
	localPlayer,	// Local player
	remotePlayers,	// Remote player
	socket;			// Socket


/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
	// Declare the canvas and rendering context
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");

	// Maximize the canvas
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// disable right click's context menu
	canvas.oncontextmenu = function() {
	     return false;  
	} 

	
	// Calculate a random start position for the local player
	// The minus 5 (half a player size) stops the player being
	// placed right on the egde of the screen
	var startX = Math.round(Math.random()*(canvas.width-5)),
		startY = Math.round(Math.random()*(canvas.height-5)),
		startHp = 100
		;

	// Initialise Client controls
	inputs = new Inputs(startX, startY);


	// Initialise the local player
	localPlayer = new Player(startX, startY, startHp);

	//initialise the socket connection to the server
	//*io.connect connects you to a socket.io server by using the first param as server address.
	//*second param customizes some option.
	socket = io.connect("http://localhost", {port:8070, transports:["websocket"]});

	//initiate empty remotePlayer array that stores other players on the server
	remotePlayers = [];
	
	// Start listening for events
	setEventHandlers();
	
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	//record mouse position
	window.addEventListener("mousemove", onMouseMove, false);
	// Input
	window.addEventListener("keydown", onKeydown, false);
	window.addEventListener("keyup", onKeyup, false);
	window.addEventListener("mousedown", onMouseDown, false);
	window.addEventListener("mouseup", onMouseUp, false);
	

	// Window resize
	window.addEventListener("resize", onResize, false);
	
	//client listen to socket events
	socket.on("connect", onSocketConnected);
	socket.on("disconnect", onSocketDisconnect);
	socket.on("new player", onNewPlayer);
	socket.on("move player", onMovePlayer);
	socket.on("attack player", onAttackPlayer);
	socket.on("remove player", onRemovePlayer);
};



// Keyboard key down
function onKeydown(e) {
	if (localPlayer) {
		inputs.onKeyDown(e);
	};
};

// Keyboard key up
function onKeyup(e) {
	if (localPlayer) {
		inputs.onKeyUp(e);
	};
};
//mouse position
function onMouseMove(e){
	if (localPlayer) {
		inputs.onMouseMove(e);
	}
}

//Mouse Down
function onMouseDown(e) {
	if (localPlayer) {
		inputs.onMouseDown(e);
	}
}
//Mouse Up
function onMouseUp(e) {
	if (localPlayer) {
		inputs.onMouseUp(e);
	}
}

// Browser window resize
function onResize(e) {
	// Maximise the canvas
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};

//*****socket event handlers*****
function onSocketConnected(){
	console.log("Connected to socket server");
	//assign the client's id to itself
	localPlayer.id = this.socket.sessionid;
	//tell the server to create a new player when you connected
	socket.emit("new player", {x: localPlayer.getX(), y:localPlayer.getY()});
};

function onSocketDisconnect(){
	console.log("Disconnected from socket server");
};

function onNewPlayer(data){
	console.log("New player connected: "+data.id);
	//create a new player object based on the position data sent from le server, 
	var newPlayer = new Player(data.x, data.y, data.hp);
	console.log("ID: "+data.id+"HP: " + data.hp);
	//then sets the id of player, 
	newPlayer.id = data.id;
	//and adds to remotePlayers
	remotePlayers.push(newPlayer);
}

function onMovePlayer(data){
	//find the player that moved according to data from server, and move it using setters from Player class
	var movePlayer = playerById(data.id);
	if(!movePlayer) {
		console.log("Player not found: "+data.id);
		return;
	};
	currentX = movePlayer.getX();
	currentY = movePlayer.getY();
	dX = data.x - currentX;
	dY = data.y - currentY;
	movePlayer.updateMoveDirection(dX, dY);
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);	
};

function onAttackPlayer(data){
	//if playerById cannot find it, that means the client itself is the target/attacker
	var attacker = playerById(data.attackerID);
	var target = playerById(data.targetID);
	if(!attacker) {//that means the attacker is probably 
		if(data.attackerID == localPlayer.id){
			attacker = localPlayer;
		}else{console.log("Attacker not found: "+data.attackerID);return;}
	}
	if(!target) {
		if(data.targetID == localPlayer.id){
			target = localPlayer;
		}else{console.log("Target not found: "+data.targetID);return;}
	}
	target.setHp(data.hp);
}

function onRemovePlayer(data){
	//find the disconnected player.
	var removePlayer = playerById(data.id);
	if (!removePlayer) {
		console.log("Player not found: "+data.id);
		return;
	};
	//remove it from remotePlayers array
	remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
};

//utility: find the players by id in the array quickly
function playerById(id)	{
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		if (remotePlayers[i].id == id)
			return remotePlayers[i];
	};
	//and if there's no matching players...
	return false;
};
//reset the game when player health drops to zero
function resetGame(){
	remotePlayers = [];
	socket.emit("disconnect");
	//window.location.reload();
}

/**************************************************
** GAME ANIMATION LOOP
**************************************************/
function animate() {
	update();
	draw();

	// Request a new animation frame using Paul Irish's shim
	window.requestAnimFrame(animate);
};


/**************************************************
** sending events to server since 2013
**************************************************/
function update() {
	if(localPlayer.move(inputs)) {
		socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY()});
	};
	var targetIndex = localPlayer.attack(inputs);//returns -1 if no target
	if(targetIndex+1) {
		//console.log(remotePlayers[targetIndex].id);
		socket.emit("attack player", {targetID:remotePlayers[targetIndex].id, atkRange: localPlayer.getAttackRange()});
	}
	//check for death
	if(localPlayer.getHp()==0){
		resetGame();
	}
};


/**************************************************
** GAME DRAW
**************************************************/
function draw() {
	// Wipe the canvas clean
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw the local player
	localPlayer.draw(ctx);
	//draw all remote players 
	var i;
	for (i=0; i < remotePlayers.length; i++) {
		remotePlayers[i].draw(ctx);
	};
};
//////////////game server script////////////////
 

/************************************************************************************************/
/*										TUTORIAL AT												*/
/*http://rawkes.com/articles/creating-a-real-time-multiplayer-game-with-websockets-and-node.html*/
/************************************************************************************************/
//*start running the server by typing 
//*node game.js
//*in the terminal
//*when the terminal is pointed to the game's directory


//add some node.js requirements
var util = require("util"),
	io = require("socket.io"),
	//require server Player class to use it!
	Player = require("./Player").Player;
//add core game variables
var socket,
	players;
//init method, set players to an empty array
function init(){
	players = [];
	
	
	
	//get the socket server listening on a port
	socket = io.listen(8000);
	//optional: limits socket.io to using WebSockets and not falling back to anything else. This step also reduces workload from sockets.io to terminal
	socket.configure(function() {
		socket.set("transports", ["websocket"]);
		socket.set("log level", 2);
	});
	
	//always start handling the socket events after socket is given a value.
	setEventHandlers();
};

var setEventHandlers = function() {//*we do this syntax to create an anonymous function that assigns its value to a variable
	//listens for new connections to Socket.IO, passing them off to the onSocketConnection function
	socket.sockets.on("connection", onSocketConnection);
};

function onSocketConnection(client) {
//server listen to socket events
	util.log("New player has connected: "+client.id);
	client.on("disconnect", onClientDisconnect);
	client.on("new player", onNewPlayer);
	client.on("move player", onMovePlayer);
	client.on("attack player", onAttackPlayer);
};

function onClientDisconnect(){
	util.log("Player has disconnected: "+this.id);//this refers to the client variable from the onSocketConnection function
	//find the disconnected player.
	var removePlayer = playerById(this.id);
	if (!removePlayer) {
		util.log("Player not found: "+this.id);
		return;
	};
	//remove it from players array
	players.splice(players.indexOf(removePlayer), 1);
	//tell all other players to remove that disconnected player
	this.broadcast.emit("remove player", {id: this.id});
};

function onNewPlayer(data) {
	//creates a new player instance using position info from the client
	var newPlayer = new Player(data.x, data.y);
	newPlayer.id = this.id;
	
	//*emit sends a message. 
	//*this.broadcast.emit sends the message to all clients except the current one
	//*while this.emit sends it to only the current one
	//send this new player(client) to other player(client) by broadcasting it
	this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});
	//send existing client's player to this new client's player
	var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
		existingPlayer = players[i];
		this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
	};
	//add this new player to the players array
	players.push(newPlayer);
};

function onMovePlayer(data) {
	//find the moved player
	var movePlayer = playerById(this.id);
	if (!movePlayer) {
		util.log("Movement Player not found: "+this.id);return;
	};
	//move the positions of it on the server
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
	//send the new position to all clients
	this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()});
};

function onAttackPlayer(data) {
	var attacker = playerById(this.id);
	var target = playerById(data.targetID);
	if(!attacker) {util.log("Attacker not found: "+this.id);return;}
	if(!target) {util.log("Target not found: "+data.targetID);return;}
	if (target.receiveAttack(1,data.atkRange,attacker.getX(),attacker.getY(),target.getX(),target.getY()) + 1){
		this.emit("attack player", {attackerID: this.id, targetID: target.id, hp:target.getHp()});
		this.broadcast.emit("attack player", {attackerID: this.id, targetID: target.id, hp:target.getHp()});
	}
	if (target.getHp() == 0){
		players.splice(players.indexOf(target), 1);
		this.emit("remove player", {id: target.id});
		this.broadcast.emit("remove player", {id: target.id});
	}
}

//utility: find the players by id in the array quickly
function playerById(id)	{
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].id == id)
			return players[i];
	};
	//and if there's no matching players...
	return false;
};


//run the init at the end of file
init();
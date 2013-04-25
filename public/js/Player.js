/**************************************************
** CLIENT PLAYER CLASS
Current Functionality: 
Movement by Clicking
**************************************************/
var Player = function(startX, startY) {
	var x = startX,
		y = startY,
		id,
		movementSpeed = 5;
		
	//getters and setters
	var getX = function() {
		return x;
	};
	var getY = function() {
		return y;
	};
	var setX = function(newX) {
		x = newX;
	};
	var setY = function(newY) {
		y = newY;
	};
	


	/****Functionality functions.******
	That sounds functional.
	**********************************/
	var move = function(inputs){
		//if mouse is down
		if (inputs.mDownR){

			//fetch the mouse's location. mouseLoc is always recorded by inputs
			var mouseX = inputs.mX,
				mouseY = inputs.mY;
			//calculate the difference of x and y
			var difX = mouseX - x;
			var difY = mouseY - y;
			//if there is a difference
			if (difX != 0 && difY != 0){
				//calculare distance
				var dist = Math.sqrt(difX*difX + difY*difY);
				//calculate change in x and y. refer to note pg.7
				var dX = movementSpeed * difX / dist;
				var dY = movementSpeed * difY / dist;
				//update player position
				x += dX; y += dY;
				return true;
			}
		}
		return false;//if all that moving didn't happen, return false		
	}






	/***End Functionality Function****/





	var update = function(inputs) {
		
		//Check Movement; If there should be movement, the function returns true;
		return (move(inputs)) ? true : false;
	};

	var draw = function(ctx) {
		ctx.fillRect(x-5, y-5, 10, 10);
	};

	return {
	//colon here is used just like
	//var blugh = {myBlugha: "Derp", myBlughi: "Dirp"};
	//this is called object literal]
	//here we are doing this to make them gets and sets and all that accessible
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY,
		move: move,
		update: update,
		draw: draw
	}
};
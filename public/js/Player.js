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

		/* so, time to make this better...
		 - um. so. when you, um, right click on some position
		 - it records the position clicked
		 - and do the same calculation, except this time it need to take consideration of the minimum movement range
		 	- i mean, if it moves by movementSpeed each update
		 	- then it shouldn't move when the mDowmR position is within the range of movement speed
		 	- for efficiency, we can rough that range up by a rectangle around mDownR pos. or just use dist
		 - so what's the starting value of mDRX/mDRY?
		 - 
		 - make inputs store:
		 	- if mouseR is down, update the value of mDRX/mDRY
		 - var move = function(inputs)
		 	- if the future position is far enough from x/y
		 		- make moves son
				- return true
		 	- otherwise, return false
		*/

		//fetch the mouse's location. mouseLoc is always recorded by inputs
		var futureX = inputs.mDRX,
			futureY = inputs.mDRY;
		//calculate the difference of x and y
		var difX = futureX - x;
		var difY = futureY - y;

		//if the future position is further than minimum movement 
		//aka movementSpeed
		//move an amount toward there and return true
		if (
			Math.abs(difX) > movementSpeed ||
			Math.abs(difY) > movementSpeed
			){

			
			//calculare distance
			var dist = Math.sqrt(difX*difX + difY*difY);
			//calculate change in x and y. refer to note pg.7
			var dX = movementSpeed * difX / dist;
			var dY = movementSpeed * difY / dist;
			//update player position
			x += dX; y += dY;
			return true;
		
		}
		//if there's still movement, 
		//but the future position is not further than minimum movement 
		//aka movementSpeed
		//just move to future position and return true
		if (
			difX != 0 || difY != 0
			){
			x = futureX; y = futureY;
			return true;
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
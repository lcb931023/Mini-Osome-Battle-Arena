/**************************************************
** CLIENT PLAYER CLASS
Current Functionality: 
Movement by Clicking

**************************************************/
var Player = function(startX, startY) {
	var x = startX,
		y = startY,
		id,
		movementSpeed = 5,
		state = "r";
		
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
		//fetch the mouse's location. mouseLoc is always recorded by inputs
		var futureX = inputs.mDRX,
			futureY = inputs.mDRY;
		//calculate the difference of x and y
		var difX = futureX - x;
		var difY = futureY - y;
		//if the future position is further than min move aka moveSpeed
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
			updateMoveDirection(dX,dY);
			//update player position
			x += dX; y += dY;
			return true;
		}
		//if there's still movement, 
		//but the future position is not further than min move aka moveSpeed
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

	function updateMoveDirection(dX,dY){
		var absTan = Math.abs(dY / dX); // note pg.10
		//Up and Down
		if (absTan > 2.414){
			if(dY<0){
				state = "u";
			}else{
				state = "d";
			}
		}
		//Left and Right
		else if (absTan < 0.414){
			if(dX<0){
				state = "l";
			}else{
				state = "r";
			}
		}
		//diagonals
		else{
			if(dY<0){
				if(dX<0){
					state = "ul";
				}else{
					state = "ur";
				}
			}else{
				if(dX<0){
					state = "dl";
				}else{
					state = "dr";
				}
			}
		}
	}

	
	var update = function(inputs) {
		//Check Movement; If there should be movement, the function returns true;
		return (move(inputs)) ? true : false;
	};
//draw the player depending on its current state
	var draw = function(ctx) {
		var p = spriteParts["tank"][state];
		//console.log(p);
		ctx.drawImage(images["tank"],p.x,p.y,p.w,p.h,x,y,p.w*4,p.h*4);
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
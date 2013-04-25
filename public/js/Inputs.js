/**************************************************
** GAME Input CLASS
**************************************************/
var Inputs = function(up, left, right, down, mDown, mX, mY) {
	
	var up = up || false,
		left = left || false,
		right = right || false,
		down = down || false,
		mDown = mDown || false,
		mX = mX || 0;
		mY = mY || 0;

	
		
	var onKeyDown = function(e) {
		var that = this,
			c = e.keyCode;
		switch (c) {
			// Controls
			case 37: // Left
				that.left = true;
				break;
			case 38: // Up
				that.up = true;
				break;
			case 39: // Right
				that.right = true; // Will take priority over the left key
				break;
			case 40: // Down
				that.down = true;
				break;
		};
	};
	
	var onKeyUp = function(e) {
		var that = this,
			c = e.keyCode;
		switch (c) {
			case 37: // Left
				that.left = false;
				break;
			case 38: // Up
				that.up = false;
				break;
			case 39: // Right
				that.right = false;
				break;
			case 40: // Down
				that.down = false;
				break;
		};
	};

	var onMouseDown = function(e) {
		var that = this;
		that.mDown = true;
	}

	var onMouseUp = function(e) {
		var that = this;
		that.mDown = false;
	}

	var onMouseMove = function(e){
		var that = this;
		//store mouse position
		that.mX = e.clientX;
		that.mY = e.clientY;
	}

	return {//return ALL the Properties and Functions
		up: up,
		left: left,
		right: right,
		down: down,
		mDown: mDown,
		mX: mX,
		mY: mY,
		onKeyDown: onKeyDown,
		onKeyUp: onKeyUp,
		onMouseDown: onMouseDown,
		onMouseUp: onMouseUp,
		onMouseMove: onMouseMove
	};
};
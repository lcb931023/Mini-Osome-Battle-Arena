/**************************************************
** GAME Input CLASS
**************************************************/
var Inputs = function(up, left, right, down, mDownL, mDownM, mDownR, mDRX, mDRY, mX, mY) {
	
	var up = up || false,
		left = left || false,
		right = right || false,
		down = down || false,
		mDownL = mDownL ||false,
		mDownM = mDownM ||false,
		mDownR = mDownR || false,
		mDRX = mDRX || 0,
		mDRY = mDRY || 0,
		mX = mX || 0,
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
		var that = this,
			c = e.button;
		switch (c) {
			case 0: //left
				that.mDownL = true;
				break;
			case 1: //middle
				that.mDownM = true;
				break;
			case 2: //right
				that.mDownR = true;
				//update mdrx and mdry
				that.mDRX = that.mX;
				that.mDRY = that.mY;
				break;
		}
	}

	var onMouseUp = function(e) {
		var that = this,
			c = e.button;
		switch (c) {
			case 0: //left
				that.mDownL = false;
				break;
			case 1: //middle
				that.mDownM = false;
				break;
			case 2: //right
				that.mDownR = false;
				break;
		}
		
	}

	var onMouseMove = function(e){
		var that = this;
		//store mouse position
		that.mX = e.clientX;
		that.mY = e.clientY;
		//update mDRX and mDRY if mDownR = true
		if (that.mDownR) {
			that.mDRX = that.mX;
			that.mDRY = that.mY;
		};
	}

	return {//return ALL the Properties and Functions
		up: up,
		left: left,
		right: right,
		down: down,
		mDownL: mDownL,
		mDownM: mDownM,
		mDownR: mDownR,
		mDRX: mDRX,
		mDRY: mDRY,
		mX: mX,
		mY: mY,
		onKeyDown: onKeyDown,
		onKeyUp: onKeyUp,
		onMouseDown: onMouseDown,
		onMouseUp: onMouseUp,
		onMouseMove: onMouseMove
	};
};
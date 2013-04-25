/**************************************************
** SERVER PLAYER CLASS
**************************************************/

var Player = function(startX, startY) {
	var x = startX,
		y = startY,
		id;
	//gettars and settars for x n y	
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
	
	return {
	//colon here is used just like
	//var blugh = {myBlugha: "Derp", myBlughi: "Dirp"};
	//this is called object literal
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY,
		id: id
	}
};

//node.js has module.export, which, um, exports this class so 
//other .js files can access it by doing require. Oh the glorious node.js
exports.Player = Player;
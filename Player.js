/**************************************************
** SERVER PLAYER CLASS
**************************************************/

var Player = function(startX, startY) {
	var x = startX,
		y = startY,
		hp = 100,
		hitBox = 100,
		attackRange = 10,
		id;
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
	var getHp = function() {
		return hp;
	}
	var setHp = function(newHp) {
		hp = newHp;
	}
	
	return {
	//colon here is used just like
	//var blugh = {myBlugha: "Derp", myBlughi: "Dirp"};
	//this is called object literal
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY,
		getHp:getHp,
		setHp:setHp,
		id: id
	}
};

//node.js has module.export, which, um, exports this class so 
//other .js files can access it by doing require. Oh the glorious node.js
exports.Player = Player;
/***********SpriteSheet Data**************
 - Contains a chain of array that contains 
 	the content name of that spritesheet, that contains
 		the partitioning of spritesheet, that contains 
 			the details about how it's parted
 - an object that contains x,y,w,h of a partition of an image
****************************************/



// possible partitions in spritesheets
var tankParts = {
	ul:part(1,1,19,19),	u:part(21,1,19,19), ur:part(41,1,19,19),
	l:part(1,21,19,19),                     r:part(41,21,19,19),
	dl:part(1,41,19,19),d:part(21,41,19,19),dr:part(41,41,19,19)
}


// link object name to its partitioning data
var spriteParts = {
	tank:tankParts
}




// Part returns x,y,w,h
function part(x,y,w,h) {
	return {x:x,y:y,w:w,h:h};
}
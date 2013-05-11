//turn this to everything loader later

/*///////////Image loader////////////// 
 - Create an assiciative array that holds all the
 image urls and their name
 - create an Image object, loop through the array to 
 preload all the images
 - make the above happen when the window loads everything
**************************************/


//create the array that holds name and urls
var imageSource = {
	tank:"images/hero_sprite.gif"
};

//create the array that converts the sources into image objects,
//so that they will be preloaded and accessed by
var images = {};

var imagesLoaded = 0;
var imagesTotal = 1;

//start preloading
for (var imageName in imageSource){
	images[imageName] = new Image();
	images[imageName].src = imageSource[imageName];//returns the corresponding URL of every Name in source array
}



/****************TO DO

1. Use callback to have the loader load every resources first,
 when it ensured everything is loaded, call the callback function
 which is the init(); and animate(); right now.
 http://www.html5canvastutorials.com/tutorials/html5-canvas-image-loader/
2. Make a 'CHAIN' of associative array and object that
 registers the SpriteSheet, the partition of SpriteSheet, 
 and the detailed data about each part,
 so that drawImage can use those data to draw the spritesheet's
 different parts, and achieve animation/moving logic/etc.
 var PartitionArraysManager = {
	A:A'sPartitionAssociativeArray,
	...
 }
 var A'sPartitionAssociativeArray = {
	ul:{x:value,y:value,w:value,h:value},//{} makes those data into an object that we can use to store multiple values representing the part of spriteSheet we want to draw
	u:{...},//when the tank is facing upward
	ur:{...},//when the tank is facing upward-rightward
	l:{...},
	r:{...},
	dl:{...},
	d:{...},
	dr:{...}
 }

so, when we need to draw them:

var p = PartitionArraysManager["resourceName"][direction or other partitioning]

ctx.drawImage(images["resourceName"],p.x,p.y,p.w,p.h);

********************/


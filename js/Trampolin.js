function Trampolin(x,y,height,width,imagen){
	Kinetic.Image.call(this); // herencia constructor
	this.setWidth(width);
	this.setHeight(height);
	this.setX(x);
	this.setY(y);
	this.setImage(imagen);
}

Trampolin.prototype = Object.create(Kinetic.Image.prototype);
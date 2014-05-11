function Gema(x,y,imagen){
	
	Kinetic.Image.call(this); // herencia constructor	
	this.setWidth(40);
	this.setHeight(40);
	this.setX(x);
	this.setY(y);
	this.setImage(imagen);
}

Gema.prototype = Object.create(Kinetic.Image.prototype);
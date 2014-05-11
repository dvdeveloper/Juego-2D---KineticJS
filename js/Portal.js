function Portal(x,y,imagen){
	
	Kinetic.Image.call(this); // herencia constructor	
	this.setWidth(70);
	this.setHeight(70);
	this.setX(x);
	this.setY(y);
	this.setImage(imagen);
}

Portal.prototype = Object.create(Kinetic.Image.prototype);
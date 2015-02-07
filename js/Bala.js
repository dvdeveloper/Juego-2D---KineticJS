function Bala(x,y,obj_sprite){
	
	Kinetic.Circle.call(this); 
	
	var attackSpeed = 10;
	var b_x = obj_sprite.getX()+(obj_sprite.getWidth()/2);
	var b_y = obj_sprite.getY()+(obj_sprite.getHeight()/2);

	var targetX = x - b_x,
		targetY = y - b_y,
		distance = Math.sqrt(targetX * targetX + targetY * targetY);

	var velX = (targetX / distance) * attackSpeed;
	var velY = (targetY / distance) * attackSpeed;
	
	
	this.setX(b_x);
	this.setY(b_y); 
	this.setRadius(3);
	this.setFill('white');

	this.mover = function(){
		b_x += velX;
		b_y += velY;
		this.setAbsolutePosition(b_x, b_y);
	}
}

Bala.prototype = Object.create(Kinetic.Circle.prototype);
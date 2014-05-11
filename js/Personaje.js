function Personaje(){
	Kinetic.Rect.call(this); // herencia constructor
	
	this.setWidth(40);
	this.setHeight(70);
	
	this.vx = 15; // velocidad de x
	this.vy = 0; // velocidad de y
	this.cx = 0;

	this.limiteTope = 0;
	this.limiteDer = 0;

	this.contador = 0;
	this.setFill('red');

	this.mover = function(x,y){
		this.move(x,y);
	}

	this.caminar = function(){
		this.move(this.vx,0);
		if(this.getX() > this.limiteDer){
			this.move(this.limiteDer - this.getX(),0); //tope de la posicion
		}
	}

	this.retroceder = function(){
		this.move(-2,0);
		if(this.getX() < 0){
			this.move(-this.getX(),0);
		}
	}

	this.saltar = function(){
		if(this.vy <= 2){
			this.saltando = true;
			this.vy = -17;
			this.contador++;
		}
	}

	this.trampolin = function(){
		
			this.vy = (-17) * 1.2;
			this.contador++;
		
	}

	this.gravedad = function(gravedad,vRebote){
		this.vy += gravedad;
		this.move(0,this.vy); //caiga el persona
		if((this.getY() + this.getHeight()) > this.limiteTope){
			this.setY(this.limiteTope - this.getHeight()); 
			this.vy = 0;
			this.contador = 0;
		}
	}
}

Personaje.prototype = Object.create(Kinetic.Rect.prototype);
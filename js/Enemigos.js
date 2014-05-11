function Enemigos(x,y,imagen){
	
	Kinetic.Image.call(this); // herencia constructor	
	this.setWidth(60);
	this.setHeight(60);
	this.setX(x);
	this.setY(y);
	this.contador = 0;
	this.setImage(imagen);

	this.enemigo_der = false;
	this.enemigo_izq = true;
	
	this.aleatorio = function(inferior,superior){
		var posibilidades = superior - inferior;
		var random = Math.random() * posibilidades;
		random = Math.floor(random); //redondear
		return parseInt(inferior) + random;
	}

	this.mover = function(){
		this.contador++;
		this.setX( this.getX() + Math.sin(this.contador * Math.PI /50) * 5  );
	}

	this.mover_entre_bloque = function(plataforma){
		

		if( (this.getX() + this.getWidth()) == (plataforma.getX() + plataforma.getWidth())  ){
			this.enemigo_der = false;
			this.enemigo_izq = true;
		}

		if(this.getX() == plataforma.getX()){
			this.enemigo_der = true;
			this.enemigo_izq = false;
		}

		if(this.enemigo_izq){
			this.move(-2,0);
		}

		if(this.enemigo_der){
			this.move(2,0);	
		}
	}
}

Enemigos.prototype = Object.create(Kinetic.Image.prototype);
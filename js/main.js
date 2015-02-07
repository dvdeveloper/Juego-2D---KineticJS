var stage,fondo,grupoAssets,grupoEnemigos;
var personaje;
var grav = 1;
var val_reb = 0; //negativo
var intv;
var keyboard = {};
var juego = {};
var _jefeUno;
var disparo_jefe;

/* Disparo */
var bullets = [];
var disparando = false;

var imgFondo = new Image();
imgFondo.src = 'background.jpg';

var imgEnemigo = new Image();
imgEnemigo.src = 'enemigo.png';

var imgEnemigoDuros = new Image();
imgEnemigoDuros.src = 'imagenes/enemigo_duro.png';

var imgJefeUno = new Image();
imgJefeUno.src = 'imagenes/jefeUno.png';

var imgPortal = new Image();
imgPortal.src = 'imagenes/portal_nivel.png';

var imgCaja = new Image();
imgCaja.src = 'imagenes/caja.png';

var imgPiso = new Image();
imgPiso.src = 'imagenes/piso.png';

var imgPisoFlotante = new Image();
imgPisoFlotante.src = 'imagenes/flotante.png';

var imgBloque = new Image();
imgBloque.src = 'imagenes/bloque.png';

var imgTrampolin = new Image();
imgTrampolin.src = 'imagenes/up.png';


function configuracion(){
	grupoAssets = new Kinetic.Group({
		x : 0,
		y : 0
	});

	grupoEnemigos = new Kinetic.Group({
		x: 0,
		y: 0
	})

	stage = new Kinetic.Stage({
		container: 'plataforma',
		width: 960,
		height:500
	});


	imagenFondo = new Kinetic.Image({
		x: 0,
		y: 0,
		image: imgFondo,
		width: stage.getWidth(),
		height: stage.getHeight()
	});


	txt_gemas = new Kinetic.Text({
		text: 'Gemas: 0',
		height: 25,
		width: 100,
		x: stage.getWidth() - 100,
		y: 10,
		fill: '#fff',
		fontFammily: 'Ariel',
		fontSize: 15
	});

	txt_enemigos = new Kinetic.Text({
		text: 'Enemigos: 0',
		height: 25,
		width: 100,
		x: stage.getWidth() - 220,
		y: 10,
		fill: '#fff',
		fontFammily: 'Ariel',
		fontSize: 15
	});

	//Disparar con el personaje
	/*
	cursor = new Kinetic.Rect({
		x: 960/2,
		y: 500/2,
		width: 10,
		height: 10,
		fill: 'yellow',
		name: 'cursor',
		alwaysOnTop: true
	});
	stage.on('mousemove', function(e) {
		mouseMove(e);
	});

	stage.on('mousedown', function(e) {
		mouseDown();
	});

	stage.on('mouseup', function(e) {
		mouseUp();
	});*/
}


function PrimerNivel(){
	
	bullets = [];

	fondo = new Kinetic.Layer();

	/*puntajes*/
	juego.puntaje_gemas = 0;
	juego.puntaje_enemigos = 0;

	/* Personaje */
	personaje = new Personaje();
	personaje.setX(200);
	personaje.setY((stage.getHeight() - personaje.getHeight()) - 20 );
	personaje.limiteDer = stage.getWidth() - personaje.getWidth();
	personaje.limiteTope = stage.getHeight(); //piso

	/*Plataformas*/
	/* PISO */
	var piso = 	stage.getWidth()-261;
	grupoAssets.add(new Plataforma(0,stage.getHeight()-20,40,piso,imgPiso));
	grupoAssets.add(new Plataforma(piso + 400,stage.getHeight()-20,40,700,imgPiso));	

	/*Enemigos*/
	grupoEnemigos.add(new Enemigos(20,stage.getHeight()/1.5,imgEnemigo));
	grupoEnemigos.add(new Enemigos(690,stage.getHeight()/2,imgEnemigo));
	//grupoEnemigos.add(new Enemigos(700,400,imgEnemigo));
	//grupoEnemigos.add(new Enemigos(760,400,imgEnemigo));
	grupoEnemigos.add(new Enemigos(400,500,imgEnemigo));
	
	/*JEFE*/
	_jefeUno = new JefeUno(700,400,imgJefeUno);
	grupoEnemigos.add(_jefeUno);
	_jefeUno.bala = [];
	console.log(_jefeUno.bala.length);

	grupoEnemigos.add(new Enemigos(piso + 400,460,imgEnemigo));
	grupoEnemigos.add(new EnemigosDuros(piso + 500,460,imgEnemigoDuros));
	grupoEnemigos.add(new Enemigos(piso + 600,460,imgEnemigo));
	grupoEnemigos.add(new EnemigosDuros(piso + 700,460,imgEnemigoDuros));

	grupoEnemigos.add(new EnemigosDuros(piso + 700,stage.getHeight()/2.4,imgEnemigoDuros));
	
	/* Gema */
	grupoAssets.add(new Gema(400,80,imgCaja));
	grupoAssets.add(new Gema(350,120,imgCaja));
	grupoAssets.add(new Gema(300,160,imgCaja));
	grupoAssets.add(new Gema(250,200,imgCaja));

	grupoAssets.add(new Gema(490,210,imgCaja));
	grupoAssets.add(new Gema(530,210,imgCaja));

	grupoAssets.add(new Gema(20,280,imgCaja));
	grupoAssets.add(new Gema(60,280,imgCaja));
	grupoAssets.add(new Gema(100,280,imgCaja));

	//debajo del piso flotante
	grupoAssets.add(new Gema(piso + 700,260,imgCaja));
	grupoAssets.add(new Gema(piso + 740,260,imgCaja));
	grupoAssets.add(new Gema(piso + 780,260,imgCaja));
	grupoAssets.add(new Gema(piso + 820,260,imgCaja));
	grupoAssets.add(new Gema(piso + 880,260,imgCaja));

	//gemas trampolin
	grupoAssets.add(new Gema(piso + 503,250,imgCaja));
	grupoAssets.add(new Gema(piso + 503,210,imgCaja));
	grupoAssets.add(new Gema(piso + 503,170,imgCaja));
	grupoAssets.add(new Gema(piso + 503,130,imgCaja));
	grupoAssets.add(new Gema(piso + 503,90,imgCaja));
	grupoAssets.add(new Gema(piso + 503,50,imgCaja));

	//gemas trampolin atras
	grupoAssets.add(new Gema(piso + 300,50,imgCaja));

	

	
	//Bloques Aire
	grupoAssets.add(new Plataforma(20,stage.getHeight()/1.5,35,200,imgPisoFlotante));
	grupoAssets.add(new Plataforma(500,stage.getHeight()/2,35,250,imgPisoFlotante));
	grupoAssets.add(new Plataforma(piso + 700,stage.getHeight()/2.4,35,250,imgPisoFlotante));

	//bloque al suelo
	grupoAssets.add(new Plataforma(700,400,stage.getHeight(),200,imgBloque));

	//Trampolin
	grupoAssets.add(new Trampolin(piso + 500,300,50,50,imgTrampolin));

	//portal
	grupoAssets.add(new Portal(piso + 1200,300,imgPortal));

	fondo.add(imagenFondo);
	fondo.add(personaje);
	fondo.add(grupoAssets);
	fondo.add(grupoEnemigos);
	fondo.add(txt_gemas);
	fondo.add(txt_enemigos);
	//fondo.add(cursor);
	stage.add(fondo);


	/* DISPARO JEFE */
	disparo_jefe = setInterval(function(){
		var bala_jefe = new Bala(personaje.getX(), personaje.getY(), _jefeUno);
		grupoEnemigos.add(bala_jefe);
		fondo.add(grupoEnemigos);
		_jefeUno.bala.push(bala_jefe);
	},2000)


	intv = setInterval(frameloop,1000/20);
}

function mouseMove(e) {
	if (cursor) {
		if (e.clientX && e.clientY) {
			cursorBoundingBox(e.clientX, e.clientY);
		}
	}
}

function cursorBoundingBox(x, y) {
	cursor.setPosition(x - 480, y - 40);
}

function moverFondo(){
	
	if( (personaje.getX() > (stage.getWidth() / 2.5)) && keyboard[68]) {
		personaje.vx = 1;
		for(i in grupoAssets.children){
			var asset = grupoAssets.children[i];
			asset.move(-5,0);
		}

		for(e in grupoEnemigos.children){
			var ene = grupoEnemigos.children[e];
			ene.move(-5,0);
		}

	}else if(  keyboard[65] ){
		for(i in grupoAssets.children){
			var asset = grupoAssets.children[i];
			asset.move(5,0);
		}

		for(e in grupoEnemigos.children){
			var ene = grupoEnemigos.children[e];
			ene.move(5,0);
		}

	}else{
		personaje.vx = 10;
	}
}

function aplicarFuerzas(){
	personaje.gravedad(grav,val_reb);
}

function moverPersonaje(){
	
	if(keyboard[65]){ //flecha izquierda
		personaje.retroceder();
	}

	if(keyboard[68]){ //flecha derecha
		personaje.caminar();
	}

	if(keyboard[87] && personaje.contador == 0){ //flecha arriba /*65*/
		personaje.saltar();
	}
}

function moverEnemigo(){

	var enemigos = grupoEnemigos.children;
	var plataformas = grupoAssets.children;

	for(i in enemigos){
		var enemigo = enemigos[i];
		for(p in plataformas){
			var plataforma = plataformas[p];
			if(hit(enemigo,plataforma)){
				if(plataforma instanceof Plataforma && enemigo instanceof Enemigos){
					enemigo.setY(plataforma.getY() - enemigo.getHeight()+1);
					enemigo.mover_entre_bloque(plataforma);
				}

				if(plataforma instanceof Plataforma && enemigo instanceof EnemigosDuros){
					enemigo.setY(plataforma.getY() - enemigo.getHeight()+1);
					enemigo.mover_entre_bloque(plataforma);
				}
			}
		}	
	}
}

function detectarColPlataformas(){
	

	if(personaje.getY() == stage.getHeight()  - personaje.getHeight() ){
		//console.log('muerte');
		Perdiste();
	}

	var plataformas = grupoAssets.children; //arreglo plataforma
	for(i in plataformas){
		var plataforma = plataformas[i];
		if(hit(plataforma,personaje)){
			
			if(plataforma instanceof Plataforma && personaje.getY() < plataforma.getY() && personaje.vy >= 0){
				//comportamiento que detenga la caida
				personaje.contador = 0;
				personaje.setY(plataforma.getY() - personaje.getHeight());
				personaje.vy *= val_reb;

			}else if(plataforma instanceof Plataforma &&  personaje.contador >= 1 ){
				personaje.setY( plataforma.getHeight() + plataforma.getY());
				personaje.vy = 0;
			}else if(plataforma instanceof Gema){
				plataforma.remove();
				juego.puntaje_gemas++;
			}else if(plataforma instanceof Trampolin){
				personaje.trampolin();
			}else if(plataforma instanceof Portal){
				Ganaste();
			}
			
			if(plataforma instanceof Plataforma && personaje.getY() > plataforma.getY() && personaje.contador == 0 && keyboard[68] ){
				//personaje.move(0,0); //tope de la posicion
				//console.log(personaje.getX());
				console.log("tope");
				personaje.vy = 0;

			}
		}
	}

	var enemigos = grupoEnemigos.children;
	for(a in enemigos){
		var enemigo = enemigos[a];
		if(hit(enemigo,personaje)){
			if(enemigo instanceof Enemigos){
				if(personaje.vy > 2){
					enemigo.remove();
					juego.puntaje_enemigos++;
				}else{
					Perdiste();
					console.log("muerte");

				}
			}else if(enemigo instanceof EnemigosDuros){
				console.log("muerte ED");
				Perdiste();
			}else if(enemigo instanceof Bala){
				console.log("muerte bala");
				Perdiste();
			}
		}
	}
}


function hit(a,b){ // function colisión
	var hit = false;
	//Colsiones horizontales
	if(b.getX() + b.getWidth() >= a.getX() && b.getX() < a.getX() + a.getWidth())
	{
		//Colisiones verticales
		if(b.getY() + b.getHeight() >= a.getY() && b.getY() < a.getY() + a.getHeight())
			hit = true;
	}
	//Colisión de a con b
	if(b.getX() <= a.getX() && b.getX() + b.getWidth() >= a.getX() + a.getWidth())
	{
		if(b.getY() <= a.getY() && b.getY() + b.getHeight() >= a.getY() + a.getHeight())
			hit = true;
	}
	//Colisión b con a
	if(a.getX() <= b.getX() && a.getX() + a.getWidth() >= b.getX() + b.getWidth())
	{
		if(a.getY() <= b.getY() && a.getY() + a.getHeight() >= b.getY() + b.getHeight())
			hit = true;
	}
	return hit;
}	

function addKeyBoardEvents(){

	addEvent(document,"keydown",function(e){
		keyboard[e.keyCode] = true;
	});

	addEvent(document,"keyup",function(e){
		keyboard[e.keyCode] = false;
	});

	function addEvent(element,eventName,func){

		if(element.addEventListener){ // si retorna verdadero son todos los navegadores menos explorer
			element.addEventListener(eventName,func,false);
		}else if(element.attachEvent){ // Internet explorer
			element.attachEvent(eventName,func);
		}
	}
	
}

function actualizarPuntaje(){
	txt_gemas.setText('Gemas : ' + juego.puntaje_gemas);
	txt_enemigos.setText('Enemigos : ' + juego.puntaje_enemigos);
}



function mouseDown() {
	disparando = true;
	fireBullet();

}

function fireBullet() {
	bullet = new Bala(cursor.getX()+(cursor.getWidth()/2), cursor.getY()+(cursor.getHeight()/2),personaje);
	fondo.add(bullet);
	bullets.push(bullet);

}

function mouseUp() {
	disparando = false;
}

function Perdiste(){
	
	detenerJuego();
	var canvas = document.getElementById('plataforma');
	canvas.style.display = 'none';
	document.getElementById("lose").style.display = "block";
	HTMLPuntaje("page_puntaje");
	canvas.innerHTML = "";
	
}

function Ganaste(){
	
	detenerJuego();
	var canvas = document.getElementById('plataforma');
	canvas.style.display = 'none';
	document.getElementById("win").style.display = "block";
	HTMLPuntaje("page_puntaje_win");
	canvas.innerHTML = "";
}

function HTMLPuntaje(etiqueta){
	document.getElementById(etiqueta).innerHTML = juego.puntaje_gemas + juego.puntaje_enemigos;
}

function detenerJuego(){
	window.clearInterval(intv);
	window.clearInterval(disparo_jefe);
}

addKeyBoardEvents();
function frameloop(){
	aplicarFuerzas();
	moverFondo();
	detectarColPlataformas();
	moverPersonaje();
	moverEnemigo();
	actualizarPuntaje();

	
	if (bullets.length > 0) {
		for (var i = 0; i < bullets.length; i++) {
			bullets[i].mover();

			if(bullets[i].getX() >= stage.getWidth() || bullets[i].getY() <= 0 ){
				bullets[i].remove();
				bullets.splice(i, 1);
			}
		}
	}

	if(_jefeUno.bala.length > 0){
		for (var i = 0; i < _jefeUno.bala.length; i++) {
			_jefeUno.bala[i].mover();
			if(_jefeUno.bala[i].getX() >= stage.getWidth() || _jefeUno.bala[i].getY() <= 0 || _jefeUno.bala[i].getX() < 0 ){
				_jefeUno.bala[i].remove();
				_jefeUno.bala.splice(i, 1);
			}
		}
	}

	stage.draw();
}


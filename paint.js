var canvas = document.getElementById("canvas");
let cor = "#000000";
var ctx = canvas.getContext("2d");
let offsetX = canvas.offsetLeft;
let offsetY = canvas.offsetTop;
let espessuraPincel = 10;

const borracha = document.getElementsByClassName("borracha");
const brush = document.getElementsByClassName("brush");

const limpar = document.querySelector(".limpar");

const container = document.getElementById("container");

document.querySelector(".color-btn").value = cor;

/*****INTERVALO DE TEMPO*****/
const contaTempo = setInterval(marcaTempo, 1000);
function marcaTempo() {
	const tempo = document.createElement('img');
	tempo.src = "assets/images/icons/ampulheta.png";
	document.getElementById("contador").appendChild(tempo);
}

var intervalos = [4, 6, 8, 11];
var interAle = 2;
setTimeout(vigia, 1000*intervalos[interAle]);

function vigia() {
	if (container.className == "diolho") {
		container.className = "";
		document.getElementById("contador").innerHTML = "";
	}
	else {
		container.classList.toggle('diolho');
		document.getElementById("contador").innerHTML = "";
	}
	interAle = Math.floor(Math.random() * intervalos.length);

	console.log(intervalos[interAle]);
	setTimeout(vigia, 1000*intervalos[interAle]);
}/*****FIM*****/

/*****BACKGROUND COM A IMAGEM*****/
/*var background = new Image();
background.src = "vix.jpg";
background.onload = function() {
	ctx.drawImage(background, 0, 0);
}*/

/*****SELEÇÃO DE COR*****/
function corAtual() {
	document.querySelector(".color-btn").value = cor;
	ctx.strokeStyle = cor;
	ctx.globalCompositeOperation = "source-over";
	brush[0].setAttribute("id", "select");
	borracha[0].removeAttribute("id");
}

function attCor() {
	var paleta = document.getElementsByClassName("cor");
	Array.prototype.forEach.call(paleta, function(element) {
		element.addEventListener("click", function() {
			cor = element.getAttribute("style").split("--set-color:")[1];
			corAtual();
		});
	});
}

function colorPick() {
	cor = document.getElementById("color-picker").value;
	corAtual();
}/*****FIM*****/


/*****ESPESSURA DO PINCEL*****/
function espessura() {
	var pincel = document.getElementsByClassName("tamanho");
	Array.prototype.forEach.call(pincel, function(element) {
		if (element.hasAttribute("id")) {						// checa se o elemento está como seleciona 
			element.removeAttribute("id");						// caso esteja, seu id é removido 
		}
		else if (element.getAttribute("style").substr(11, 2) == espessuraPincel) {	// caso o elemento não esteja selecionado, é verificado se possui o mesmo valor de espessura do pincel
			element.setAttribute("id", "select");									// tendo a mesma espessura o elemento será marcado como selecionado
		}
		element.addEventListener("click", function() {
			console.log("CERTO");
			espessuraPincel = element.getAttribute("style").substr(11, 2);
			element.setAttribute("id", "select");
		});
	});
}/*****FIM*****/


/*****BORRACHA*****/
//const apagar = () => (ctx.globalCompositeOperation = "destination-out");
function apagar() {
	if (brush[0].hasAttribute("id")) {
		brush[0].removeAttribute("id");
		borracha[0].setAttribute("id", "select");
	}
	ctx.globalCompositeOperation = "destination-out";
}

/*****DESENHAR*****/
var pos = { x: 0, y: 0 }; // inicializar a posição em 0,0

function setPosition(e) {   // nova posição a partir dos movimentos do mouse
	pos.x = parseInt(e.clientX - offsetX);
	pos.y = parseInt(e.clientY - offsetY);
}

function draw(e) {
	if (e.buttons !== 1) return; // segue adiante apenas se o mouse for clicado

	ctx.beginPath(); // ponta-pé ao coaminho do desenho
	ctx.lineWidth = espessuraPincel; // espessura do traço
	ctx.lineCap = "round";
	//ctx.globalAlpha = 0.7; //opacidade do traço, se necessário
	ctx.strokeStyle = cor; // cor do traço
	ctx.moveTo(pos.x, pos.y); // da posição do cursor
	setPosition(e);
	ctx.lineTo(pos.x, pos.y); // para a posição do cursor
	ctx.closePath();
	ctx.stroke(); // imprime o traço
		
	if (container.className == "diolho") {
		if (!alert("Levanta a mão, devagar!")) {
			var url = "src/endgame.html";
			window.open(url, '_self');
		}
	}
}
/*****FIM*****/

/*****LIMPAR*****/
limpar.addEventListener("click", () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//ctx.drawImage(background, 0, 0);
});
/*****FIM*****/

/*****MUDA FOTO*****/
var raizCss = document.querySelector(':root');
const murais = ['valerio.jpg)', 'valeed.jpg)', 'samarco.jpg)', 'samarco2.jpg)'];
var contMural = 0;

function mudarMural() {
	if (contMural < 3) {
		contMural++;
	}
	else {
		contMural = 0;
	}
	raizCss.style.setProperty('--mural', 'url(assets/images/'+murais[contMural]);
	if (contMural > 1) {
		document.getElementById("localMural").innerHTML = "Samarco, Espírito Santo."
	}
	else {
		document.getElementById("localMural").innerHTML = "Escritório da Vale, Rio de Janeiro."
	}
}
/*****FIM*****/

/*****DOWNLOAD*****/                            //download não funciona, browser suspeita do arquivo e não permite baixar a imagem.
function salvar() {  // create pattern
	var ptrn = ctx.createPattern(background, 'repeat'); // Create a pattern with this image, and set it to "repeat".
	ctx.fillStyle = ptrn;
	ctx.fillRect(0, 0, ctx.width, ctx.height);
	ctx.width = 1024;
	ctx.height = 686;
	ctx.globalCompositeOperation="destination-over";
	const link = document.createElement('a');
	link.download = 'rabisco.png';
	link.href = canvas.toDataURL();
	link.click();
	link.delete;
}
/*****FIM*****/

/*****CHAMA GERAL*****/
document.addEventListener("pointermove", draw); // em substituição de mousemove
document.addEventListener("pointerdown", setPosition); // em substituição de mousedown
document.addEventListener("pointerenter", setPosition); // em substituição de mouseenter
document.addEventListener("touchmove", draw);
document.addEventListener("touchend", setPosition);
document.addEventListener("touchstart", setPosition);
document.getElementById("color-picker").addEventListener("change", colorPick);
attCor();
espessura();
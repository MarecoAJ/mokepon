var ataqueJugador, ataqueEnemigo, mascotaJugador, mascotaEnemigo, inputHipodoge, inputCapipepo,
    inputRatigueya, inputPydos, inputTucapalma, inputLangostelvis;
var victoriasEnemigo = 0;
var victoriasJugador = 0;

const sectionSeleccionarAtake = document.getElementById("seleccion-ataque");
const bttReiniciar = document.getElementById("btt-reiniciar");
const bbtMascotaJugador = document.getElementById("btt-mascota");
const sectionSeleccionarMascota = document.getElementById("seleccion-mascota");
const pMascotaJugador = document.getElementById("mascota-jugador");
const pMascotaEnemigo = document.getElementById("mascota-enemigo");
const pVictoriaEnemigo = document.getElementById("victorias-enemigo");
const pVictoriaJugador = document.getElementById("victorias-jugador");
const divMensajes = document.getElementById('mensajes');
const pMensaje = document.getElementById("resultado");
const divAtakeJugador = document.getElementById("atake-del-jugador");
const divAtakeEnemigo = document.getElementById("atake-del-enemigo");
const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const contenedorAtaques = document.getElementById("contenedor-ataques");

const sectionVerMapa = document.getElementById("ver-mapa");
const canvasMapa = document.getElementById("mapa");

var pokemones = [];
var botones = [];
var ataquesJugador = [];
var ataquesEnemigo = [];
var opcionesPokemones, ataquesPokemones;
var ataquesPokemonEnemigo;
var bttFuego, bttAgua, bttTierra;
var iAtaqueJugador;
var iAtaqueEnemigo;
var lienzo = canvasMapa.getContext("2d");
var intervalo;
var mapaBackground = new Image();
mapaBackground.src = "/assets/mokemap.png"

class pokemon {
    constructor(nombre, foto, tipo) {
        this.nombre = nombre;
        this.foto = foto;
        this.ataques = [];
        this.tipo = tipo;
        this.x = 20;
        this.y = 30;
        this.ancho = 80;
        this.alto = 80;
        this.mapaFoto = new Image();
        this.mapaFoto.src = foto;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }
}

var hipodoge = new pokemon("hipodoge", "assets/mokepons_mokepon_hipodoge_attack.png", "agua");
var capipepo = new pokemon("capipepo", "assets/mokepons_mokepon_capipepo_attack.png", "tierra");
var ratigueya = new pokemon("ratigueya", "assets/mokepons_mokepon_ratigueya_attack.png", "fuego");
var pydos = new pokemon("pydos", "assets/mokepons_mokepon_pydos_attack.png", "agua");
var tucapalma = new pokemon("tucapalma", "assets/mokepons_mokepon_tucapalma_attack.png", "tierra");
var langostelvis = new pokemon("langostelvis", "assets/mokepons_mokepon_langostelvis_attack.png", "fuego");

hipodoge.ataques.push(
    { nombre: "agua", id: "btt-agua" },
    { nombre: "agua", id: "btt-agua" },
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "agua", id: "btt-agua" },
    { nombre: "tierra", id: "btt-tierra" }
);

capipepo.ataques.push(
    { nombre: "tierra", id: "btt-tierra" },
    { nombre: "tierra", id: "btt-tierra" },
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "agua", id: "btt-agua" },
    { nombre: "tierra", id: "btt-tierra" }
);

ratigueya.ataques.push(
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "agua", id: "btt-agua" },
    { nombre: "tierra", id: "btt-tierra" }
);

pydos.ataques.push(
    { nombre: "agua", id: "btt-agua" },
    { nombre: "agua", id: "btt-agua" },
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "agua", id: "btt-agua" },
    { nombre: "tierra", id: "btt-tierra" }
);

tucapalma.ataques.push(
    { nombre: "tierra", id: "btt-tierra" },
    { nombre: "tierra", id: "btt-tierra" },
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "agua", id: "btt-agua" },
    { nombre: "tierra", id: "btt-tierra" }
);

langostelvis.ataques.push(
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "agua", id: "btt-agua" },
    { nombre: "tierra", id: "btt-tierra" }
);

pokemones.push(hipodoge, capipepo, ratigueya, pydos, tucapalma, langostelvis);

function iniciarJuego() {

    sectionSeleccionarAtake.style.display = "none";
    sectionVerMapa.style.display = "none";

    pokemones.forEach((pokemon) => {
        opcionesPokemones = `
       <input type="radio" name="mascota" id=${pokemon.nombre}>
        <label for=${pokemon.nombre} class="tarjeta-de-pokemon">
            <p>${pokemon.nombre}</p>
            <img src=${pokemon.foto} alt=${pokemon.nombre}>
        </label>
       `;
        contenedorTarjetas.innerHTML += opcionesPokemones;

        inputHipodoge = document.getElementById('hipodoge');
        inputCapipepo = document.getElementById('capipepo');
        inputRatigueya = document.getElementById('ratigueya');
        inputPydos = document.getElementById('pydos');
        inputTucapalma = document.getElementById('tucapalma');
        inputLangostelvis = document.getElementById('langostelvis');
    });
    bttReiniciar.style.display = "none";
    bbtMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
    bttReiniciar.addEventListener("click", reiniciarJuego);
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function seleccionarMascotaJugador() {

    sectionSeleccionarMascota.style.display = "none";
    // sectionSeleccionarAtake.style.display = "flex";

    sectionVerMapa.style.display = "flex";
    intervalo = setInterval(pintarCanvas, 50);

    iniciarMapa();

    if (inputHipodoge.checked) {
        mascotaJugador = inputHipodoge.id;
        pMascotaJugador.innerHTML = mascotaJugador;
    } else if (inputCapipepo.checked) {
        mascotaJugador = inputCapipepo.id;
        pMascotaJugador.innerHTML = mascotaJugador;
    } else if (inputRatigueya.checked) {
        mascotaJugador = inputRatigueya.id;
        pMascotaJugador.innerHTML = mascotaJugador;
    } else if (inputPydos.checked) {
        mascotaJugador = inputPydos.id;
        pMascotaJugador.innerHTML = mascotaJugador;
    } else if (inputTucapalma.checked) {
        mascotaJugador = inputTucapalma.id;
        pMascotaJugador.innerHTML = mascotaJugador;
    } else if (inputLangostelvis.checked) {
        mascotaJugador = inputLangostelvis.id;
        pMascotaJugador.innerHTML = mascotaJugador;
    } else {
        alert("no seleccionaste");
    }

    extraerAtaques(mascotaJugador);
    seleccionarMascotaEnemigo();
}

function extraerAtaques(mascota) {

    let ataques;

    for (let i = 0; i < pokemones.length; i++) {
        if (mascota === pokemones[i].nombre) {
            ataques = pokemones[i].ataques;
        }
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {

    ataques.forEach((ataque) => {
        ataquesPokemones = `<button id=${ataque.id} class="btt-ataque">${ataque.nombre}</button>`;
        contenedorAtaques.innerHTML += ataquesPokemones;
    });

    bttFuego = document.getElementById("btt-fuego");
    bttAgua = document.getElementById("btt-agua");
    bttTierra = document.getElementById("btt-tierra");
    botones = document.querySelectorAll(".btt-ataque");
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "fuego") {
                ataquesJugador.push("fuego");
                boton.style.background = "#A568BD";
                boton.disabled = true;
            } else if (e.target.textContent === "agua") {
                ataquesJugador.push("agua");
                boton.style.background = "#A568BD";
                boton.disabled = true;
            } else {
                ataquesJugador.push("tierra");
                boton.style.background = "#A568BD";
                boton.disabled = true;
            }
            ataqueAleatorioEnemigo();
        });
    });
}

function seleccionarMascotaEnemigo() {

    let ataqueAleatorio = aleatorio(0, pokemones.length - 1);
    mascotaEnemigo = pokemones[ataqueAleatorio].nombre;
    pMascotaEnemigo.innerHTML = mascotaEnemigo;
    ataquesPokemonEnemigo = pokemones[ataqueAleatorio].ataques;
    secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {

    switch (aleatorio(0, ataquesEnemigo.length - 1)) {
        case 0:
            ataquesEnemigo.push("fuego");
            break;
        case 1:
            ataquesEnemigo.push("agua");
            break;
        case 2:
            ataquesEnemigo.push("tierra");
            break;
        case 3:
            ataquesEnemigo.push("fuego");
            break;
        case 4:
            ataquesEnemigo.push("agua");
            break;
    }
    iniciarPelea();
}

function iniciarPelea() {
    if (ataquesJugador.length == 5) combate();
}

function indexAmbosOponentes(jugador, enemigo) {
    iAtaqueJugador = ataquesJugador[jugador];
    iAtaqueEnemigo = ataquesEnemigo[enemigo];
}

function combate() {
    let tipoMascotaJugador, tipoMascotaEnemigo;

    for (let x = 0; x < pokemones.length; x++) {
        if (mascotaJugador === pokemones[x].nombre) {
            tipoMascotaJugador = pokemones[x].tipo;
        }
        if (mascotaEnemigo === pokemones[x].nombre) {
            tipoMascotaEnemigo = pokemones[x].tipo;
        }
    }

    for (let i = 0; i < ataquesEnemigo.length; i++) {

        if (ataquesJugador[i] == ataquesEnemigo[i]) {

            if (ataquesJugador[i] === tipoMascotaJugador) {
                victoriasJugador++;

            } else if (ataquesEnemigo[i] === tipoMascotaEnemigo) {
                victoriasEnemigo++;

            }

            indexAmbosOponentes(i, i);
            crearMensaje();
        } else if (ataquesJugador[i] == "fuego" && ataquesEnemigo[i] == "tierra") {
            indexAmbosOponentes(i, i);
            crearMensaje();
            victoriasJugador++;
            pVictoriaJugador.innerHTML = victoriasJugador;
        } else if (ataquesJugador[i] == "agua" && ataquesEnemigo[i] == "fuego") {
            crearMensaje();
            victoriasJugador++;
            pVictoriaJugador.innerHTML = victoriasJugador;
        } else if (ataquesJugador[i] == "tierra" && ataquesEnemigo[i] == "agua") {
            indexAmbosOponentes(i, i);
            crearMensaje();
            victoriasJugador++;
            pVictoriaJugador.innerHTML = victoriasJugador;
        } else {
            indexAmbosOponentes(i, i);
            crearMensaje();
            victoriasEnemigo++;
            pVictoriaEnemigo.innerHTML = victoriasEnemigo;
        }
    }

    revisarVictorias();
}

function revisarVictorias() {

    if (victoriasEnemigo === victoriasJugador) {
        crearMensajeFinal("EMPATE");
    } else if (victoriasEnemigo < victoriasJugador) {
        crearMensajeFinal('GANASTE');
    } else {
        crearMensajeFinal('PERDISTE');
    }
}

function crearMensajeFinal(resultadoFinal) {

    let parrafo = document.createElement('p');
    bttReiniciar.style.display = "block";
    parrafo.innerHTML = resultadoFinal;
    divMensajes.appendChild(parrafo);
}

function crearMensaje() {

    let atakeDelJugador = document.createElement("p");
    let atakeDelEnemigo = document.createElement("p");
    atakeDelEnemigo.innerHTML = iAtaqueEnemigo;
    atakeDelJugador.innerHTML = iAtaqueJugador;
    divAtakeJugador.appendChild(atakeDelJugador);
    divAtakeEnemigo.appendChild(atakeDelEnemigo);
}

function pintarCanvas() {
    capipepo.x += capipepo.velocidadX;
    capipepo.y += capipepo.velocidadY;
    lienzo.clearRect(0, 0, canvasMapa.width, canvasMapa.height);
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
    lienzo.drawImage(capipepo.mapaFoto, capipepo.x,
        capipepo.y, capipepo.ancho, capipepo.alto);
}

function moverArriba() {
    capipepo.velocidadY = -5;
}

function moverIzquierda() {
    capipepo.velocidadX = -5;
}

function moverAbajo() {
    capipepo.velocidadY = 5;
}

function moverDerecha() {
    capipepo.velocidadX = 5;
}

function detenerMover() {
    capipepo.velocidadX = 0;
    capipepo.velocidadY = 0;
}

function sePresionoTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba();
            break;
        case "ArrowDown":
            moverAbajo();
            break;
        case "ArrowLeft":
            moverIzquierda();
            break;
        case "ArrowRight":
            moverDerecha();
            break;
    }
}

function iniciarMapa() {
    mapa.width = 320;
    mapa.height = 240;

    window.addEventListener("keydown", sePresionoTecla);
    window.addEventListener("keyup", detenerMover);
}

window.addEventListener("load", iniciarJuego);
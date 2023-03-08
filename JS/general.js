var altoMapa, anchoMapa, ataqueJugador, ataqueEnemigo, mascotaJugador, mascotaEnemigo, inputHipodoge, inputCapipepo,
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

var miMokepon;
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
mapaBackground.src = "/assets/mokemap.png";
anchoMapa = window.innerWidth - 20;
const anchoMaxMapa = 350;
var jugadorId = null;

if (anchoMapa > anchoMaxMapa) {
    anchoMapa = anchoMaxMapa - 20;
}


altoMapa = anchoMapa * 600 / 800;

mapa.width = anchoMapa;
mapa.height = altoMapa;

class Mokepon {
    constructor(nombre, foto, tipo, fotoMapa = foto, id = null) {
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.ataques = [];
        this.tipo = tipo;
        this.ancho = 40;
        this.alto = 40;
        this.x = aleatorio(0, mapa.width - this.ancho);
        this.y = aleatorio(0, mapa.height - this.alto);
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    pintarMokepon() {
        lienzo.drawImage(this.mapaFoto, this.x,
            this.y, this.ancho, this.alto);
    }
}

var hipodoge = new Mokepon("hipodoge", "assets/mokepons_mokepon_hipodoge_attack.png", "agua", "assets/hipodoge.png");
var capipepo = new Mokepon("capipepo", "assets/mokepons_mokepon_capipepo_attack.png", "tierra", "assets/capipepo.png");
var ratigueya = new Mokepon("ratigueya", "assets/mokepons_mokepon_ratigueya_attack.png", "fuego", "assets/ratigueya.png");
var pydos = new Mokepon("pydos", "assets/mokepons_mokepon_pydos_attack.png", "agua");
var tucapalma = new Mokepon("tucapalma", "assets/mokepons_mokepon_tucapalma_attack.png", "tierra");
var langostelvis = new Mokepon("langostelvis", "assets/mokepons_mokepon_langostelvis_attack.png", "fuego");


const hipodogeAtaque = [
    { nombre: "agua", id: "btt-agua" },
    { nombre: "agua", id: "btt-agua" },
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "agua", id: "btt-agua" },
    { nombre: "tierra", id: "btt-tierra" }
];

const capipepoAtaque = [
    { nombre: "tierra", id: "btt-tierra" },
    { nombre: "tierra", id: "btt-tierra" },
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "agua", id: "btt-agua" },
    { nombre: "tierra", id: "btt-tierra" }
];

const ratigueyaAtaque = [
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "agua", id: "btt-agua" },
    { nombre: "tierra", id: "btt-tierra" }
];

const pydosAtaque = [
    { nombre: "agua", id: "btt-agua" },
    { nombre: "agua", id: "btt-agua" },
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "agua", id: "btt-agua" },
    { nombre: "tierra", id: "btt-tierra" }
];

const tucapalmaAtaque = [
    { nombre: "tierra", id: "btt-tierra" },
    { nombre: "tierra", id: "btt-tierra" },
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "agua", id: "btt-agua" },
    { nombre: "tierra", id: "btt-tierra" }
];

const langostelvisAtaque = [
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "fuego", id: "btt-fuego" },
    { nombre: "agua", id: "btt-agua" },
    { nombre: "tierra", id: "btt-tierra" }
];

hipodoge.ataques.push(...hipodogeAtaque);

capipepo.ataques.push(...capipepoAtaque);

ratigueya.ataques.push(...ratigueyaAtaque);

pydos.ataques.push(...pydosAtaque);

tucapalma.ataques.push(...tucapalmaAtaque);

langostelvis.ataques.push(...langostelvisAtaque);

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

    unirseAlJuego();
}

function unirseAlJuego() {

    fetch("http://localhost:8080/unirse").then(function (res) {
        if (res.ok) {
            res.text().then(function (respuesta) {
                jugadorId = respuesta;
            })
        }
    });
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function seleccionarMascotaJugador() {

    sectionSeleccionarMascota.style.display = "none";

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

    seleccionarMokepon(mascotaJugador);

    extraerAtaques(mascotaJugador);
    sectionVerMapa.style.display = "flex";
    iniciarMapa();

}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    });

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

function seleccionarMascotaEnemigo(enemigo) {

    pMascotaEnemigo.innerHTML = enemigo.nombre;
    mascotaEnemigo = enemigo.nombre;
    ataquesPokemonEnemigo = enemigo.ataques;
    secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {

    switch (aleatorio(0, ataquesPokemonEnemigo.length - 1)) {
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

            if (tipoMascotaEnemigo !== tipoMascotaJugador) {
                if (ataquesJugador[i] === tipoMascotaJugador) {
                    victoriasJugador++;

                } else if (ataquesEnemigo[i] === tipoMascotaEnemigo) {
                    victoriasEnemigo++;

                }
            }
            indexAmbosOponentes(i, i);
            crearMensaje();
        } else if (ataquesJugador[i] == "fuego" && ataquesEnemigo[i] == "tierra") {
            indexAmbosOponentes(i, i);
            crearMensaje();
            victoriasJugador++;


        } else if (ataquesJugador[i] == "agua" && ataquesEnemigo[i] == "fuego") {
            crearMensaje();
            victoriasJugador++;


        } else if (ataquesJugador[i] == "tierra" && ataquesEnemigo[i] == "agua") {
            indexAmbosOponentes(i, i);
            crearMensaje();
            victoriasJugador++;


        } else {
            indexAmbosOponentes(i, i);
            crearMensaje();
            victoriasEnemigo++;


        }
    }

    pVictoriaJugador.innerHTML = victoriasJugador;
    pVictoriaEnemigo.innerHTML = victoriasEnemigo;

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

    miMokepon.x += miMokepon.velocidadX;
    miMokepon.y += miMokepon.velocidadY;
    lienzo.clearRect(0, 0, canvasMapa.width, canvasMapa.height);
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
    miMokepon.pintarMokepon();

    enviarPosicion(miMokepon.x, miMokepon.y);

    hipodogeEnemigo.pintarMokepon();
    capipepoEnemigo.pintarMokepon();
    ratigueyaEnemigo.pintarMokepon();

    if (miMokepon.velocidadX !== 0 || miMokepon.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo);
        revisarColision(capipepoEnemigo);
        revisarColision(ratigueyaEnemigo);
    }
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    }).then(function (res) {
        if (res.ok) {
            res.json().then(function ({ enemigos }) {
                enemigos.forEach(function (enemigo) {

                    let mokeponEnemigo = null;
                    const mokeponNombre = enemigo.Mokepon.nombre || "";
                    switch (mokeponNombre) {
                        case "hipodoge":
                            mokeponEnemigo = new Mokepon("hipodoge", "assets/mokepons_mokepon_hipodoge_attack.png", "agua", "assets/hipodoge.png");
                            break;
                        case "capipepo":
                            mokeponEnemigo = new Mokepon("capipepo", "assets/mokepons_mokepon_capipepo_attack.png", "tierra", "assets/capipepo.png");
                            break;
                        case "ratigueya":
                            mokeponEnemigo = new Mokepon("ratigueya", "assets/mokepons_mokepon_ratigueya_attack.png", "fuego", "assets/ratigueya.png");
                            break;
                        case "pydos":
                            mokeponEnemigo = new Mokepon("pydos", "assets/mokepons_mokepon_pydos_attack.png", "agua");
                            break;
                        case "tucapalma":
                            mokeponEnemigo = new Mokepon("tucapalma", "assets/mokepons_mokepon_tucapalma_attack.png", "tierra");
                            break;
                        case "langostelvis":
                            mokeponEnemigo = new Mokepon("langostelvis", "assets/mokepons_mokepon_langostelvis_attack.png", "fuego");
                            break;
                    }

                    mokeponEnemigo.x = enemigo.x;
                    mokeponEnemigo.y = enemigo.y;
                    mokeponEnemigo.pintarMokepon();

                });

            });
        }
    });
}

function moverArriba() {
    miMokepon.velocidadY = -5;
}

function moverIzquierda() {
    miMokepon.velocidadX = -5;
}

function moverAbajo() {
    miMokepon.velocidadY = 5;
}

function moverDerecha() {
    miMokepon.velocidadX = 5;
}

function detenerMover() {
    miMokepon.velocidadX = 0;
    miMokepon.velocidadY = 0;
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
    miMokepon = obtenerObjMascota(mascotaJugador);

    intervalo = setInterval(pintarCanvas, 50);

    window.addEventListener("keydown", sePresionoTecla);
    window.addEventListener("keyup", detenerMover);
}

function obtenerObjMascota(mascota) {

    for (let i = 0; i < pokemones.length; i++) {
        if (mascota === pokemones[i].nombre) {
            return pokemones[i];
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;

    const arribaMascota = miMokepon.y;
    const abajoMascota = miMokepon.y + miMokepon.alto;
    const derechaMascota = miMokepon.x + miMokepon.ancho;
    const izquierdaMascota = miMokepon.x;

    if (abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo) {
        return;
    }
    detenerMover();
    clearInterval(intervalo);
    sectionSeleccionarAtake.style.display = "flex";
    sectionVerMapa.style.display = "none";
    seleccionarMascotaEnemigo(enemigo);
}

window.addEventListener("load", iniciarJuego);
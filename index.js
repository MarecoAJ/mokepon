const EXPRESS = require("express");
const APP = EXPRESS();
const JUGADORES = [];
const CORS = require("cors");

APP.use(CORS());
APP.use(EXPRESS.json());

class Jugador {
    constructor(id) {
        this.id = id;
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon;
    }

    actualizarPosicionMapa(x, y) {
        this.x = x;
        this.y = y;
    }

    asignarAtaques(ataques){
        this.ataques = ataques;
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

APP.get("/unirse", (req, res) => {
    const ID = `${Math.random()}`;
    const JUGADOR = new Jugador(ID);
    JUGADORES.push(JUGADOR);

    res.setHeader("Acess-Control-Allow-Origin", "*");
    res.send(ID);
});

APP.post("/mokepon/:jugadorId", (req, res) => {
    const JUGADOR_ID = req.params.jugadorId || "";
    const NOMBRE_MOKEPON = req.body.mokepon || "";
    const MOKEPON = new MOKEPON(NOMBRE_MOKEPON);
    const JUGADOR_INDEX = JUGADORES.findIndex((jugador) => JUGADOR_ID === jugador.id);

    if (JUGADOR_INDEX >= 0) {
        JUGADORES[JUGADOR_INDEX].asignarMokepon(MOKEPON);
    }

    res.end();
});

APP.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const JUGADOR_ID = req.params.jugadorId || "";
    const X = req.body.x || 0;
    const Y = req.body.y || 0;
    const JUGADOR_INDEX = JUGADORES.findIndex((jugador) => JUGADOR_ID === jugador.id);

    if (JUGADOR_INDEX >= 0) { 
        
        JUGADORES[JUGADOR_INDEX].actualizarPosicionMapa(X, Y);
    }

    const ENEMIGOS = JUGADORES.filter((jugador) => JUGADOR_ID !== jugador.id);

    res.send({ enemigos: ENEMIGOS });
});

APP.post("/mokepon/:jugadorId/ataques", (req, res) => {
    const JUGADOR_ID = req.params.jugadorId || "";
    const ATAQUES_MOKEPON = req.body.ataques || [];

    const JUGADOR_INDEX = JUGADORES.findIndex((jugador) => JUGADOR_ID === jugador.id);

    if (JUGADOR_INDEX >= 0) {
        JUGADORES[JUGADOR_INDEX].asignarAtaques(ATAQUES_MOKEPON);
    }

    res.end();
});

APP.listen(8080, () => {
    console.log("servidor iniciado");
});





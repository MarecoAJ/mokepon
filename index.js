const express = require("express");
const app = express();
const jugadores = [];
const cors = require("cors");

app.use(cors());
app.use(express.json());

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
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const nombre = req.body.mokepon || "";
    const mokepon = new mokepon(nombre);
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon);
    }
    res.end();
});

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`;
    const jugador = new Jugador(id);
    jugadores.push(jugador);
    res.setHeader("Acess-Control-Allow-Origin", "*");
    res.send(id);
});

app.listen(8080, () => {
    console.log("servidor iniciado");
});

app.post("/mokepon/:jugadorID/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const x = req.body.x || 0;
    const y = req.body.y || 0;
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicionMapa(x, y);
    }

    res.end();
});



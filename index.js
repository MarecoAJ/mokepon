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

    asignarMokepon(mokepon){
        this.mokepon = mokepon;
    }
}

class Mokepon{
    constructor(nombre){
        this.nombre = nombre;
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`;

    app.post("/mokepon/:jugadorId", (req, res) => {
        const jugadorId = req.params.jugadorId || "";
        const nombre = req.body.mokepon || "";
        const mokepon = new mokepon(nombre);
        const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id);
        if(jugadorIndex >= 0){
            jugadores[jugadorIndex].asignarMokepon(mokepon);
        }
        res.end();
    });

    const jugador = new Jugador(id);
    jugadores.push(jugador);
    res.setHeader("Acess-Control-Allow-Origin", "*");
    res.send(id);
})
app.listen(8080, () => {
    console.log("servidor iniciado");
})



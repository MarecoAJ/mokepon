const express = require("express");
const app = express();

app.get("/", (req, res)=>{
    res.send("bienvenido");
})
app.listen(8080, ()=>{
    console.log("servidor iniciado");
})



const express = require('express');
const mongoose = require ('mongoose')
var cors = require('cors')
require('./models/metas')
const Meta = mongoose.model('Meta');
const app = express();
const port = 3000;
// Indica que minha aplicação está preparada para receber dados em formato json
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, X-PINGOTHER, Authorization");
    app.use(cors());
    next();
})

mongoose.connect('mongodb://db:27017/leoviana', {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!")
}).catch((err) => {
    console.log("Error: Conexão com o banco de dados não realizada!: " + err)
});

app.get("/metas", async(req, res) => {
    await Meta.find({}).then((metas)=>{
        return res.json({
            error: false,
            metas
        });
    }).catch((error) => {
        return res.status(400).json({
            error: false,
            message: "Nenhum registro encontrado"
        });
    });
});

app.post("/metas", async(req, res) => {
    await Meta.create(req.body, (err)=>{
        if (err) return res.status(400).json({ 
            error: true,
            message: "Erro: Meta não cadastrada com sucesso!" 
        });
    });
    return res.json({ 
        error: false,
        message: "Meta cadastrada com sucesso!"
    });
});

app.listen(port, function(erro){
    if (erro){
        console.log("Ocorreu um erro")
    } else {
        console.log(`Servidor iniciado com sucesso na porta: ${port}`)
    }
});
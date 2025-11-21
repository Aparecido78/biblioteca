const express = require("express")
const app = express()
const port = 4000
require("dotenv").config();

const Paginas  = require("./livros/pagina_livro")
const Livros = require("./livros/livros")
const Categoria = require("./categoria/categoria")
const Admin = require("./admin/banco_admin")
const bodypaser = require("body-parser")
const connectar = require("./database/database")
const bodyParser = require("body-parser")
const Usuario = require("./usuarios/banco_usuario")
const Emprestimo = require("./emprestimos/emprestimo")

const router_usuario = require("./usuarios/codigo_usuario") 
const rota_admin = require("./admin/codigo_admin")

connectar.sync()
.then(() => {
    console.log("tabelas criadas com sucesso")
    
}).catch((err) => {
    console.log("Erro ao criar tabelas",err)
    
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));


const session = require("express-session")

app.use(session({
    secret:"dkjddejdjdjdjjd",
    cookie:{maxAge:3600000}
}))


app.use("/",router_usuario)
app.use("/", rota_admin)
app.get("/",(req,res)=>{

    res.render("usuario/login")
})




app.listen(port,()=>{
    console.log(`porta abert http://localhost:${port}`)
})


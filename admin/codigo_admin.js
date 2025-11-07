const Sequelize = require("sequelize")
const express = require("express")
const rota = express.Router()
const Categoria = require("../categoria/categoria")
const Livros = require("../livros/livros")
const multer = require("multer")
const path = require("path")

const Paginas = require("../livros/pagina_livro")
const router = require("../usuarios/codigo_usuario")

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "public")
    },
    filename(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const imagen = multer({ storage })


rota.get("/", async (req, res) => {
    try {
        const categoriaa = await Categoria.findAll()
        res.render("admin/areae_admin", { categoria:categoriaa })
    } catch (err) {
        res.render("admin/areae_admin", { categorias: [] })
    }
})

rota.get("/pagina/inicial", async (req, res) => {
    try {
        const categoriaa = await Categoria.findAll()
        res.render("admin/areae_admin", { categoria:categoriaa })
    } catch (err) {
        res.render("admin/areae_admin", { categorias: [] })
    }
})

rota.get("/pagina/cadastro/categoria",(req,res)=>{
     res.render("admin/cadastrar_categoria")
})

rota.get("/pagina/cadastro/livro", async(req,res)=>{
   try {
        const categorias = await Categoria.findAll()
        res.render("admin/cadastrar_livros", { categoria:categorias })
    } catch (err) {
         const categorias = await Categoria.findAll()
         res.render("admin/areae_admin",{categoria:categorias})
    }
})


rota.get("/cadastrar/categoria", (req, res) => {
    res.render("admin/cadastrar_categoria")
})

rota.post("/cadastrar/categorias", async (req, res) => {
    const nome = req.body.Categoria
    try {
        await Categoria.create({ nome })
        const categorias = await Categoria.findAll()
        res.render("admin/areae_admin", { categoria:categorias })
    } catch (err) {
        res.redirect("/cadastrar/categoria")
    }
})


rota.get("/pagina/livros", async (req, res) => {
    try {
        const categorias = await Categoria.findAll()
        res.render("admin/cadastrar_livros", { categoria:categorias })
    } catch (err) {
         const categorias = await Categoria.findAll()
         res.render("admin/areae_admin",{categoria:categorias})
    }
})


rota.post("/cadastrar/livro", imagen.single('foto'), async (req, res) => {
    const { titulo, autor, descricao, data, CategoriumId } = req.body
    const foto = req.file?.filename

    try {
         const categorias = await Categoria.findAll()
        await Livros.create({ titulo, autor, data, descricao, foto, CategoriumId })
        
        res.render("admin/areae_admin",{categoria:categorias})
    } catch (err) {
        res.redirect("/pagina/livros")
    }
})



rota.post("/pegar/livro/categoria", async (req, res) => {
    const CategoriaId = req.body.CategoriaId
    try {
        const categoria = await Categoria.findAll()
        const livros_categoria = await Livros.findAll({ where: { CategoriumId: CategoriaId } })
        const CategoriaId_nome = await Categoria.findByPk(CategoriaId)

        res.render("admin/areae_admin", {
            categoria,
            livros_categoria,
            CategoriaId_nome
        })
    } catch (err) {
        res.redirect("/pagina/livros")
    }
})


rota.post("/editar/livros/:id", async (req,res)=>{
 
    const id = req.params.id

    try{

        const livro_editar = await  Livros.findByPk(id)
        console.log("produto cadastrado com sucesso!")
        res.render("admin/editar_livro",{livro_editar:livro_editar})

    }catch(err){
         res.redirect("/pagina/livros")

    }
  
})


rota.post("/salvar/alteracao/editar/livro/:id", imagen.single("foto"),  async (req,res)=>{
    const {titulo,autor,descricao,data} = req.body
    const foto =  req.file?.filename
    const id = req.params.id

    try{

        await Livros.update({titulo:titulo,autor:autor,descricao:descricao,data:data,foto:foto },
        {where:{id:id}}
    )
        const categoria = await Categoria.findAll()
        const livros_categoria = await Livros.findAll({ where: { CategoriumId: id } })
        const CategoriaId_nome = await Categoria.findByPk(id)

        res.render("admin/areae_admin", {
            categoria,
            livros_categoria,
            CategoriaId_nome
        })

    }catch(err){

        res.redirect("/pagina/livros")

    }
    
})

rota.post("/excluir/livro/:id", async(req,res)=>{
        const id = req.params.id
        
        Livros.destroy({where:{id:id}})

        const categoria = await Categoria.findAll()
        const livros_categoria = await Livros.findAll({ where: { CategoriumId: id } })
        const CategoriaId_nome = await Categoria.findByPk(id)

        res.render("admin/areae_admin", {
            categoria,
            livros_categoria,
            CategoriaId_nome
        })

   })


router.post("/pagina/cadastrar/pagina/livro",(req,res)=>{
    const LivroId = req.body.LivroId
    try{
         res.render("admin/cadastrar_pagina.ejs",{LivroId})

    }catch(err){
        res.redirect("/pagina/livros")
    }
})

router.post("/cadastrar/pagina/livro", async (req,res)=>{
    const {texto,LivroId} = req.body
    try{
        Paginas.create({texto:texto, LivroId:LivroId})
        
        console.log("pagina cadastrada com sucesso")
        res.redirect("/pagina/inicial")
    }catch(err){
        res.redirect("/pagina/livros")
        console.log("erro ao cadastrar pagina de livro",err)

    }
})
router.get("/voltar/pagina/inicial",(req,res)=>{

    res.redirect("/pagina/inicial")

})


module.exports = rota






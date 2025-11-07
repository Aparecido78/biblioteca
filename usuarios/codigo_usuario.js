const Usuario = require("./banco_usuario");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");

const Admin = require("../admin/banco_admin");
const Categoria = require("../categoria/categoria");
const Livros = require("../livros/livros");
const Emprestimo = require("../emprestimos/emprestimo");
const Paginas = require("../livros/pagina_livro");

router.get("/", (req, res) => {
  res.render("usuario/login");
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });
    if (admin) {
      if (senha === admin.senha) {
        req.session.usuario = { 
          id: admin.id,        
          nome: admin.nome, 
          email: admin.email, 
          role: "admin" 
        };

        const categoria = await Categoria.findAll();
        return res.render("admin/areae_admin", { categoria });
      } else {
        return res.render("usuario/login", { erro: "Senha incorreta" });
      }
    }

    const usuario = await Usuario.findOne({ where: { email } });
    if (usuario) {
      const senha_correta = bcrypt.compareSync(senha, usuario.senha);
      if (senha_correta) {
        req.session.usuario = { 
          id: usuario.id,      
          nome: usuario.nome, 
          email: usuario.email, 
          role: "user" 
        };

        const Categorias = await Categoria.findAll();
        const Livro = await Livros.findAll();

        return res.render("admin/pagina_inicial", {
          Categorias,
          livro: Livro
        });
      } else {
        return res.render("usuario/login", { erro: "Senha incorreta" });
      }
    }

    return res.render("usuario/login", { erro: "Email não cadastrado" });

  } catch (err) {
    console.log("Erro no login:", err);
    return res.render("usuario/login", { erro: "Erro no servidor" });
  }
});

router.get("/pagina/cadastro", (req, res) => {
  res.render("usuario/cadastro");
});

router.post("/cadastrar/usuario", (req, res) => {
  const { nome, email, senha } = req.body;

  var sal = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(senha, sal);

  try {
    Usuario.create({ nome, email, senha: hash });
    res.redirect("/");
  } catch (err) {
    console.log("erro no cadastro:", err);
    res.redirect("/pagina/cadastro");
  }
});

router.get("/pagina/inicial/usuario", async (req, res) => {
  try {
    const Categorias = await Categoria.findAll();
    const Livro = await Livros.findAll();
    
    return res.render("admin/pagina_inicial", { 
      Categorias,
      livro: Livro
    });
  } catch (err) {
    console.log("Erro ao carregar página inicial:", err);
    res.send("deu algum erro");
  }
});

router.post("/usuario/pegar/livro/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const livro_cate = await Livros.findAll({ where: { CategoriumId: id } });
    const Categorias = await Categoria.findAll();

    res.render("admin/pagina_inicial", { 
      livro_cate, 
      Categorias
    });
  } catch (err) {
    console.log("erro:", err);
    res.redirect("/pagina/inicial/usuario");
  }
});

router.post("/ver/mais/sobre/produto/:id", async (req,res)=>{
  const id = req.params.id;
  try{
    const livros_ver_mais = await Livros.findOne({where:{id}});
    const Categorias = await Categoria.findAll();
    const Livro = await Livros.findAll();

    return res.render("admin/pagina_inicial", {
      Categorias,
      livro: Livro,
      livros_ver_mais
    });

  }catch(err){
    res.redirect("/pagina/inicial/usuario");
  }
});

router.post("/faze/emprestimo/:id", async (req, res) => {
  const LivroId = req.params.id;
  const UsuarioId = req.session.usuario.id;

  try {
    const emprestimo_existir = await Emprestimo.findOne({ where: { LivroId, UsuarioId } });
    if (emprestimo_existir) {
      return res.redirect("/pagina/inicial/usuario");
    }

    const emprestimo_quantidade = await Emprestimo.count({ where: { UsuarioId } });
    if (emprestimo_quantidade >= 3) {
      return res.redirect("/pagina/inicial/usuario");
    }

    await Emprestimo.create({ LivroId, UsuarioId, quantidade: 1 });

    return res.redirect("/pagina/inicial/usuario");

  } catch (err) {
    console.log("erro ao fazer empréstimo", err);
    return res.redirect("/pagina/inicial/usuario");
  }
});

router.get("/meus/emprestimos", async(req,res)=>{
  const usuarioId = req.session.usuario.id;
  const emprestimos_usuario = await Emprestimo.findAll({where:{UsuarioId:usuarioId}, include: [{ model: Livros }]});
  res.render("usuario/emprestimos",{emprestimos_usuario});
});

router.post("/ler_livro_butao", async(req,res)=>{
  const LivroId = req.body.LivroId;
  try{
    const Livro = await Livros.findOne({where:{id:LivroId}});
    const paginas_livros = await Paginas.findAll({where:{LivroId}});
    res.render("usuario/ler_livro",{paginas_livros, Livro});
  }catch(err){
    res.redirect("/meus/emprestimos");
  }
});

router.get("/sair", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.redirect("/pagina/inicial/usuario");
        res.redirect("/");
    });
});

router.get("/usuario/home",(req,res)=>{
  res.redirect("/pagina/inicial/usuario");
});

module.exports = router;

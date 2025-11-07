
function autenticar(req,next,res){
    if(req.session.user){
      next()
    }else{
        res.redirect("/")
    }

}

module.exports = autenticar()
const Sequelize = require("sequelize")
const connectar = new Sequelize("biblioteca_express","root","478432",{

    host:"localhost",
    dialect:"mysql"

})


async function testar(){


try{
    await connectar.authenticate()
    console.log("banco connectado com sucesso")

}catch(err){
    console.log("erro, algo deu errado na connecção com o banco",err)

}
}

module.exports = connectar
const {Sequelize} = require("sequelize")

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect:"postgres",
    protocol:"postgres",
    dialectOptions:{
        sal:{
            require:true,
             rejectUnauthorized:false
        }
    }
})
async function testarConexão(params) {
try{
    await sequelize.authenticate()
    console.log("banco connectado com sucesso no render")

}catch(err){
    console.log("erro, algo deu errado na connecção com o banco",err)

}
    
}



module.exports = sequelize
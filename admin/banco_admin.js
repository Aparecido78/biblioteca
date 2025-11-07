const Sequelize = require("sequelize")
const connectar = require("../database/database.js")
const Admin = connectar.define("Admin",{

        nome:{
            type: Sequelize.STRING,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false
        },
        senha:{
            type:Sequelize.STRING,
            allowNull: false
        },
        foto:{
            type: Sequelize.STRING,
        }

})



module.exports = Admin



















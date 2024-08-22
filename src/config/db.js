const sequelize = require('sequelize');
//configurações da base de dados
const database = new sequelize('ets_control_challenge', 'ClassJs', 'senha123456789',
{
    dialect: 'mssql', host:'localhost', port: 1433
});
database.sync();
module.exports = database;
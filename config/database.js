const { Sequelize } = require('sequelize');

// Configuración de la conexión a MySQL
const sequelize = new Sequelize('bdbiblioteca', 'root', 'admin123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;

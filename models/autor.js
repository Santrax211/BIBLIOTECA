const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Autor = sequelize.define('Autor', {
  IDAutor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Nombre: { type: DataTypes.STRING },
  Apellido: { type: DataTypes.STRING }
}, {
  tableName: 'Autor',
  timestamps: false
});

module.exports = Autor;

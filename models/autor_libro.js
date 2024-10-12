const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Autor = require('./autor');
const Libro = require('./libro');

const Autor_Libro = sequelize.define('Autor_Libro', {
  IDAutor: { type: DataTypes.INTEGER, primaryKey: true, references: { model: Autor, key: 'IDAutor' } },
  IDLibro: { type: DataTypes.INTEGER, primaryKey: true, references: { model: Libro, key: 'IDLibro' } }
}, {
  tableName: 'Autor_Libro',
  timestamps: false
});

Autor.belongsToMany(Libro, { through: Autor_Libro, foreignKey: 'IDAutor' });
Libro.belongsToMany(Autor, { through: Autor_Libro, foreignKey: 'IDLibro' });

module.exports = Autor_Libro;

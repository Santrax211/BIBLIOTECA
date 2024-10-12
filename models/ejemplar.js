const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Libro = require('./libro');

const Ejemplar = sequelize.define('Ejemplar', {
  IDEjemplar: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  IDLibro: { type: DataTypes.INTEGER, allowNull: false, references: { model: Libro, key: 'IDLibro' } },
  Localizacion: { type: DataTypes.STRING },
  Disponibilidad: { type: DataTypes.ENUM('Disponible', 'Prestado'), defaultValue: 'Disponible' },
  Condicion: { type: DataTypes.ENUM('Bueno', 'Dañado', 'Perdido'), defaultValue: 'Bueno' }
}, {
  tableName: 'Ejemplar',
  timestamps: false
});

Ejemplar.belongsTo(Libro, { foreignKey: 'IDLibro' });

module.exports = Ejemplar;

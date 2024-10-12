const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Edicion = require('./edicion');

const Libro = sequelize.define('Libro', {
  IDLibro: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  IDEdicion: { type: DataTypes.INTEGER, allowNull: false, references: { model: Edicion, key: 'IDEdicion' } },
  ISBN: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  Cantidad: { type: DataTypes.INTEGER, defaultValue: 1 },
  Localizacion: { type: DataTypes.STRING }
}, {
  tableName: 'Libro',
  timestamps: false
});

Libro.belongsTo(Edicion, { foreignKey: 'IDEdicion' });

module.exports = Libro;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario');
const Ejemplar = require('./ejemplar');

const Prestamos = sequelize.define('Prestamos', {
  IDPrestamos: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  IDEjemplar: { type: DataTypes.INTEGER, references: { model: Ejemplar, key: 'IDEjemplar' } },
  IDUsuario: { type: DataTypes.INTEGER, references: { model: Usuario, key: 'IDUsuario' } },
  Fecha_Prestamo: { type: DataTypes.DATE },
  Fecha_Devolucion: { type: DataTypes.DATE },
  Estado: { type: DataTypes.ENUM('Pendiente', 'Devuelto'), defaultValue: 'Pendiente' }
}, {
  tableName: 'Prestamos',
  timestamps: false
});

Prestamos.belongsTo(Usuario, { foreignKey: 'IDUsuario' });
Prestamos.belongsTo(Ejemplar, { foreignKey: 'IDEjemplar' });

module.exports = Prestamos;

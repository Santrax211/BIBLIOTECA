const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Edicion = sequelize.define('Edicion', {
  IDEdicion: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Titulo: { type: DataTypes.STRING, allowNull: false },
  Editorial: { type: DataTypes.STRING },
  Año: { type: DataTypes.INTEGER },
}, {
  tableName: 'Edicion',
  timestamps: false,
  uniqueKeys: {
    edicion_unique: {
      fields: ['Titulo', 'Editorial', 'Año']
    }
  }
});

module.exports = Edicion;

// models/devoluciones.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que la conexión a la base de datos está correcta

const Devoluciones = sequelize.define('Devoluciones', {
    IDDevoluciones: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    IDPrestamos: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Fecha_Devolucion_Real: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Multa: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    timestamps: false
});

// Exportar el modelo
module.exports = Devoluciones;


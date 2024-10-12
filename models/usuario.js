// models/usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Rol = require('./rol');

const Usuario = sequelize.define('Usuario', {
    IDUsuario: {
        type: DataTypes.INTEGER, // Cambia INT a INTEGER
        primaryKey: true,
        autoIncrement: true
    },
    IDRol: {
        type: DataTypes.INTEGER, // Cambia INT a INTEGER
        references: {
            model: Rol,
            key: 'IDRol'
        }
    },
    Nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Apellido: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Telefono: {
        type: DataTypes.STRING(20)
    },
    Direccion: {
        type: DataTypes.STRING(255)
    },
    Correo: {
        type: DataTypes.STRING(100)
    },
    Contrasena: {
        type: DataTypes.STRING(100)
    },
    Estado: {
        type: DataTypes.ENUM('Activo', 'Inactivo'),
        defaultValue: 'Activo'
    }
}, {
    tableName: 'Usuario', // nombre de la tabla en la base de datos
    timestamps: false
});

// Definir relaciones (si es necesario)
Usuario.belongsTo(Rol, { foreignKey: 'IDRol' });

module.exports = Usuario;


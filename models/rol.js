// models/rol.js
const { DataTypes } = require('sequelize'); // Asegúrate de que esta línea esté correcta
const sequelize = require('../config/database'); // Importa correctamente la conexión a la base de datos

const Rol = sequelize.define('Rol', {
    IDRol: {
        type: DataTypes.INTEGER, // Asegúrate de que este tipo esté escrito correctamente
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_rol: {
        type: DataTypes.STRING(50), // Asegúrate de que este tipo esté correcto
        allowNull: false
    }
}, {
    tableName: 'Rol', // Nombre de la tabla en la base de datos
    timestamps: false // Si no usas createdAt y updatedAt
});

// Exporta el modelo
module.exports = Rol;


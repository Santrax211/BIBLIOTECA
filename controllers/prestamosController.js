// controllers/prestamosController.js
const Prestamos = require('../models/prestamos');
const Ejemplar = require('../models/ejemplar');
const Usuario = require('../models/usuario');

// Crear un préstamo
exports.createPrestamo = async (req, res) => {
    try {
        const { IDEjemplar, IDUsuario, Fecha_Prestamo } = req.body;

        // Verificar si el ejemplar está disponible
        const ejemplar = await Ejemplar.findOne({ where: { IDEjemplar } });
        if (!ejemplar || ejemplar.Disponibilidad !== 'Disponible') {
            return res.status(400).json({ message: 'Ejemplar no disponible' });
        }

        // Crear el préstamo
        const prestamo = await Prestamos.create({ IDEjemplar, IDUsuario, Fecha_Prestamo });

        // Actualizar disponibilidad del ejemplar
        ejemplar.Disponibilidad = 'Prestado';
        await ejemplar.save();

        return res.status(201).json(prestamo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear el préstamo' });
    }
};

// Aquí puedes agregar otros métodos para manejar devoluciones y listar préstamos, etc.

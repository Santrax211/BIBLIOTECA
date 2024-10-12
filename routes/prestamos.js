const express = require('express');
const Usuario = require('../models/usuario'); // Asegúrate de que la ruta sea correcta
const Prestamos = require('../models/prestamos');
const Ejemplar = require('../models/ejemplar');
const Devoluciones = require('../models/devoluciones');
const Joi = require('joi');
const router = express.Router();

// Definir esquema de validación para préstamos
const prestamoSchema = Joi.object({
  IDUsuario: Joi.number().integer().required(),
  IDEjemplar: Joi.number().integer().required(),
  Fecha_Prestamo: Joi.date().required(),
  Fecha_Devolucion: Joi.date().required(),
});

// Renderizar vista de registro
router.get('/registrar', (req, res) => {
  res.render('registrar'); // Asegúrate de que exista un archivo registrar.ejs en views
});

// Renderizar vista de devolución
router.get('/devolver', (req, res) => {
  res.render('devolver'); // Asegúrate de que exista un archivo devolver.ejs en views
});

// Renderizar vista de historial
router.get('/historial', async (req, res) => {
  try {
    const prestamos = await Prestamos.findAll(); // Obtener préstamos
    const devoluciones = await Devoluciones.findAll(); // Obtener devoluciones
    res.render('historial', { prestamos, devoluciones }); // Asegúrate de que exista un archivo historial.ejs en views
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el historial' });
  }
});

// Registrar un préstamo
router.post('/registrar', async (req, res) => {
  try {
    // Validar los datos de entrada
    const { error } = prestamoSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { IDUsuario, IDEjemplar, Fecha_Prestamo, Fecha_Devolucion } = req.body;
    const ejemplar = await Ejemplar.findByPk(IDEjemplar);

    if (ejemplar && ejemplar.Disponibilidad === 'Disponible') {
      await Prestamos.create({
        IDUsuario,
        IDEjemplar,
        Fecha_Prestamo,
        Fecha_Devolucion,
        Estado: 'Pendiente' // Asignar el estado "Pendiente" al préstamo
      });
      ejemplar.Disponibilidad = 'Prestado';
      await ejemplar.save();
      res.status(201).json({ message: 'Préstamo registrado correctamente' });
    } else {
      res.status(400).json({ message: 'Ejemplar no disponible' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el préstamo' });
  }
});

// Registrar una devolución
router.post('/devolver', async (req, res) => {
  try {
    const { IDPrestamos, Fecha_Devolucion_Real, Multa } = req.body;

    // Validar los datos de entrada para la devolución
    const devolucionSchema = Joi.object({
      IDPrestamos: Joi.number().integer().required(),
      Fecha_Devolucion_Real: Joi.date().required(),
      Multa: Joi.number().precision(2).required(), // Multa como número decimal
    });
    
    const { error } = devolucionSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const prestamo = await Prestamos.findByPk(IDPrestamos);
    if (!prestamo) {
      return res.status(404).json({ message: 'Préstamo no encontrado' });
    }

    const ejemplar = await Ejemplar.findByPk(prestamo.IDEjemplar);

    if (prestamo.Estado === 'Pendiente') {
      prestamo.Estado = 'Devuelto';
      await prestamo.save();

      ejemplar.Disponibilidad = 'Disponible';
      await ejemplar.save();

      await Devoluciones.create({
        IDPrestamos,
        Fecha_Devolucion_Real,
        Multa
      });

      res.status(200).json({ message: 'Devolución registrada correctamente' });
    } else {
      res.status(400).json({ message: 'Préstamo ya devuelto' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar la devolución' });
  }
});

// Listar todos los préstamos
router.get('/', async (req, res) => {
  try {
    const prestamos = await Prestamos.findAll({
      include: [
        { model: Ejemplar }, // Incluye detalles del ejemplar
        { model: Usuario } // Incluye detalles del usuario
      ]
    });
    res.status(200).json(prestamos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los préstamos' });
  }
});

// Listar todas las devoluciones
router.get('/devoluciones', async (req, res) => {
  try {
    const devoluciones = await Devoluciones.findAll({
      include: [
        { model: Prestamos, include: [Ejemplar, Usuario] } // Incluye detalles de los préstamos
      ]
    });
    res.status(200).json(devoluciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error' });
  }
});

module.exports = router;

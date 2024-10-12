const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const prestamosRoutes = require('./routes/prestamos');
const errorHandler = require('./middleware/errorHandler'); // Asegúrate de que este archivo exista
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); 

// Sincroniza la base de datos con Sequelize
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada');
}).catch((error) => {
  console.error('Error al sincronizar la base de datos', error);
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar express-ejs-layouts
app.use(expressLayouts); // Usar el middleware
app.set('layout', 'layout'); // Establecer el layout por defecto

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/prestamos', prestamosRoutes);
app.get('/registrar', (req, res)=>{
  res.render('registrar');
});
app.get('/', (req, res) => {
  res.render('index'); // Asegúrate de que exista un archivo index.ejs en views
});

// Usar el middleware de manejo de errores
app.use(errorHandler); // Debe estar antes de app.listen

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

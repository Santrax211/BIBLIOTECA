// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Ha ocurrido un error' });
  };
  
  module.exports = errorHandler;
  
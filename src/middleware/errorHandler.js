const errorHandler = (err, req, res, next) => {
  console.error('Erreur:', err.stack);

  // Erreur par défaut
  let error = {
    success: false,
    message: 'Erreur interne du serveur',
    error: err.message,
  };

  // Erreur Supabase
  if (err.code) {
    error.message = 'Erreur de base de données';
    error.code = err.code;
  }

  // Erreur de validation
  if (err.name === 'ValidationError') {
    error.message = 'Erreur de validation';
    error.status = 400;
  }

  const status = error.status || 500;
  res.status(status).json(error);
};

module.exports = errorHandler; 
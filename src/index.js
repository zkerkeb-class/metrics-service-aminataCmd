require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const metricsRoutes = require('./routes/metrics');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de sécurité
app.use(helmet());

// Middleware CORS
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour parser les données URL-encoded
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/metrics', metricsRoutes);

// Route de santé
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Service de métriques opérationnel',
    timestamp: new Date().toISOString(),
  });
});

// Route par défaut
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Service de métriques Supabase',
    version: '1.0.0',
    endpoints: {
      metrics: '/api/metrics',
      health: '/health',
    },
  });
});

// Middleware de gestion d'erreurs
app.use(errorHandler);

// Gestion des routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📊 API disponible sur http://localhost:${PORT}/api/metrics`);
  console.log(`🏥 Health check sur http://localhost:${PORT}/health`);
});

module.exports = app; 
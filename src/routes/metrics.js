const express = require('express');
const metricsService = require('../services/metricsService');

const router = express.Router();

/**
 * GET /metrics
 * Récupère toutes les métriques
 */
router.get('/', async (req, res) => {
  try {
    const metrics = await metricsService.getAllMetrics();
    res.json({
      success: true,
      data: metrics,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des métriques:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des métriques',
      error: error.message,
    });
  }
});

/**
 * GET /metrics/monthly-change/:table
 * Teste le calcul du changement mensuel pour une table
 */
router.get('/monthly-change/:table', async (req, res) => {
  try {
    const { table } = req.params;
    const { status, dateColumn } = req.query;
    
    const filters = status ? { status } : {};
    const change = await metricsService.calculateMonthlyChange(
      table, 
      filters, 
      dateColumn || 'created_at'
    );
    
    res.json({
      success: true,
      data: {
        table,
        filters,
        change,
      },
    });
  } catch (error) {
    console.error('Erreur lors du calcul du changement mensuel:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du calcul du changement mensuel',
      error: error.message,
    });
  }
});

/**
 * GET /metrics/tournois
 * Récupère les métriques des tournois actifs
 */
router.get('/tournois', async (req, res) => {
  try {
    const result = await metricsService.getTournoisActifs();
    console.log("result tournois actifs  ", result);
    res.json({
      success: true,
      data: {
        title: 'Tournois actifs',
        value: result.value,
        change: result.change,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des tournois:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des tournois',
      error: error.message,
    });
  }
});

/**
 * GET /metrics/equipes
 * Récupère les métriques des équipes inscrites
 */
router.get('/equipes', async (req, res) => {
  try {
    const result = await metricsService.getEquipesInscrites();
    res.json({
      success: true,
      data: {
        title: 'Équipes inscrites',
        value: result.value,
        change: result.change,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des équipes:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des équipes',
      error: error.message,
    });
  }
});

/**
 * GET /metrics/plannings
 * Récupère les métriques des plannings générés
 */
router.get('/plannings', async (req, res) => {
  try {
    const result = await metricsService.getPlanningsGeneres();
    res.json({
      success: true,
      data: {
        title: 'Plannings générés',
        value: result.value,
        change: result.change,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des plannings:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des plannings',
      error: error.message,
    });
  }
});

/**
 * GET /metrics/participation
 * Récupère les métriques du taux de participation
 */
router.get('/participation', async (req, res) => {
  try {
    const result = await metricsService.getTauxParticipation();
    res.json({
      success: true,
      data: {
        title: 'Taux de participation',
        value: result.value,
        change: result.change,
      },
    });
  } catch (error) {
    console.error('Erreur lors du calcul du taux de participation:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du calcul du taux de participation',
      error: error.message,
    });
  }
});

module.exports = router; 
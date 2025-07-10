# Service de Métriques Supabase

Un service Express.js qui se connecte à Supabase pour récupérer des métriques liées aux tournois, équipes, plannings et taux de participation.

## 🚀 Fonctionnalités

- **Tournois actifs** : Nombre de tournois en cours
- **Équipes inscrites** : Nombre d'équipes enregistrées
- **Plannings générés** : Nombre de plannings créés
- **Taux de participation** : Pourcentage de participation des équipes

## 📋 Prérequis

- Node.js >= 18.0.0
- Un compte Supabase
- Base de données configurée avec les tables appropriées

## 🛠️ Installation

1. Clonez le projet :
```bash
git clone <url-du-repo>
cd metrics-service
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez vos variables d'environnement :
```bash
cp .env.example .env
```

4. Éditez le fichier `.env` avec vos clés Supabase :
```env
SUPABASE_URL=votre_url_supabase
SUPABASE_KEY=votre_cle_anon_supabase
SUPABASE_SERVICE_KEY=votre_cle_service_supabase
PORT=3000
```

## 📊 Structure de la Base de Données

Le service s'attend à ce que votre base de données Supabase ait les tables suivantes :

### Table `tournaments`
- `id` (uuid, primary key)
- `status` (text) - 'active' pour les tournois actifs
- Autres champs selon vos besoins

### Table `teams`
- `id` (uuid, primary key)
- `status` (text) - 'registered' pour les équipes inscrites
- `participating` (boolean) - true pour les équipes participantes
- Autres champs selon vos besoins

### Table `schedules`
- `id` (uuid, primary key)
- `status` (text) - 'generated' pour les plannings générés
- Autres champs selon vos besoins

## 🎯 Utilisation

### Démarrer le serveur

```bash
# Mode développement
npm run dev

# Mode production
npm start
```

### Endpoints disponibles

#### GET `/`
Informations générales sur le service

#### GET `/health`
Vérification de l'état du service

#### GET `/api/metrics`
Récupère toutes les métriques

**Réponse exemple :**
```json
{
  "success": true,
  "data": {
    "tournoissActifs": {
      "title": "Tournois actifs",
      "value": 3,
      "change": { "value": "+1 ce mois", "trend": "up" }
    },
    "equipesInscrites": {
      "title": "Équipes inscrites",
      "value": 24,
      "change": { "value": "+8 cette semaine", "trend": "up" }
    },
    "planningsGeneres": {
      "title": "Plannings générés",
      "value": 12,
      "change": { "value": "+3 aujourd'hui", "trend": "up" }
    },
    "tauxParticipation": {
      "title": "Taux de participation",
      "value": "92%",
      "change": { "value": "+5% vs. mois dernier", "trend": "up" }
    }
  }
}
```

#### GET `/api/metrics/tournois`
Récupère uniquement les métriques des tournois actifs

#### GET `/api/metrics/equipes`
Récupère uniquement les métriques des équipes inscrites

#### GET `/api/metrics/plannings`
Récupère uniquement les métriques des plannings générés

#### GET `/api/metrics/participation`
Récupère uniquement les métriques du taux de participation

#### GET `/api/metrics/monthly-change/:table`
Teste le calcul du changement mensuel pour une table spécifique

**Paramètres :**
- `table` : Nom de la table (ex: tournament, team, ai_tournament_planning)
- `status` (query param) : Filtrer par statut (ex: ?status=active)
- `dateColumn` (query param) : Colonne de date à utiliser (défaut: created_at)

**Exemple :**
```
GET /api/metrics/monthly-change/tournament?status=active
```

## 🔧 Scripts disponibles

- `npm start` - Démarre le serveur en mode production
- `npm run dev` - Démarre le serveur en mode développement avec nodemon
- `npm run lint` - Vérifie le code avec ESLint
- `npm run lint:fix` - Corrige automatiquement les erreurs ESLint
- `npm run format` - Formate le code avec Prettier
- `npm run format:check` - Vérifie le formatage avec Prettier
- `npm test` - Exécute les tests de la fonction calculateMonthlyChange

## 🛡️ Sécurité

Le service utilise :
- **Helmet** pour les en-têtes de sécurité
- **CORS** pour gérer les requêtes cross-origin
- **Validation** des variables d'environnement
- **Gestion d'erreurs** centralisée

## 📝 Développement

Le code est organisé comme suit :
- `src/index.js` - Point d'entrée principal
- `src/config/supabase.js` - Configuration Supabase
- `src/services/metricsService.js` - Logique métier
- `src/routes/metrics.js` - Définition des routes
- `src/middleware/errorHandler.js` - Gestion des erreurs

## 🔄 Gestion des Erreurs

Le service inclut une gestion d'erreurs robuste :
- Retour de données par défaut en cas d'erreur de connexion
- Logging détaillé des erreurs
- Réponses HTTP appropriées

## 📊 Calcul du Changement Mensuel

### Fonction `calculateMonthlyChange(tableName, filters, dateColumn)`

Cette fonction calcule automatiquement le changement mensuel pour n'importe quelle table :

```javascript
const change = await metricsService.calculateMonthlyChange(
  'tournament',           // Nom de la table
  { status: 'active' },   // Filtres optionnels
  'created_at'            // Colonne de date (optionnel)
);
```

**Retourne :**
```javascript
{
  value: '+3 ce mois',     // Texte du changement
  trend: 'up',             // Tendance: 'up', 'down', 'stable'
  thisMonth: 5,            // Nombre ce mois
  lastMonth: 2,            // Nombre le mois dernier
  difference: 3            // Différence absolue
}
```

### Test de la fonctionnalité

Pour tester la fonction de calcul mensuel :

```bash
# Lancer le script de test
npm test

# Ou tester via l'API
curl http://localhost:3000/api/metrics/monthly-change/tournament?status=active
```

## 🚨 Notes importantes

- Le service retourne des données par défaut si la connexion à Supabase échoue
- Les calculs de changement sont actuellement simulés
- Adaptez les noms de tables et colonnes selon votre schéma de base de données

## 📄 Licence

ISC 
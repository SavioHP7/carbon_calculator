/**
 * Dados de rotas e deslocamentos pré-configurados
 * Armazena rotas mais frequentes para facilitar o cálculo
 */

const ROUTES_DATA = {
  // Rotas de exemplo para São Paulo
  samples: [
    {
      id: 'route_001',
      name: 'Casa → Trabalho (Vila Madalena)',
      distance: 12.5,
      modes: ['car', 'bus', 'motorcycle'],
      frequency: 'diária'
    },
    {
      id: 'route_002',
      name: 'São Paulo → Rio de Janeiro',
      distance: 430,
      modes: ['car', 'bus', 'plane', 'train'],
      frequency: 'mensal'
    },
    {
      id: 'route_003',
      name: 'Supermercado (próximo)',
      distance: 2.8,
      modes: ['bicycle', 'walking', 'car', 'bus'],
      frequency: 'semanal'
    },
    {
      id: 'route_004',
      name: 'Parque (Ibirapuera)',
      distance: 8.3,
      modes: ['car', 'bus', 'bicycle'],
      frequency: 'semanal'
    }
  ],

  /**
   * Distâncias entre principais cidades brasileiras (em km)
   */
  distances: {
    'São Paulo → Rio de Janeiro': 430,
    'São Paulo → Belo Horizonte': 586,
    'São Paulo → Brasília': 1020,
    'São Paulo → Salvador': 2100,
    'Rio de Janeiro → Brasília': 1150,
    'Rio de Janeiro → Belo Horizonte': 450,
    'Belo Horizonte → Brasília': 738,
    'Salvador → Brasília': 1810,
    'Brasília → Manaus': 2200
  },

  /**
   * Rotas salvas pelo usuário
   */
  userRoutes: [],

  /**
   * Estatísticas de rotas mais usadas
   */
  statistics: {
    totalRoutesCalculated: 0,
    mostUsedTransport: null,
    averageDistance: 0,
    totalEmissions: 0
  }
};

/**
 * Função para adicionar uma rota personalizada
 */
function addUserRoute(name, distance, modes) {
  const newRoute = {
    id: `route_${Date.now()}`,
    name: name,
    distance: parseFloat(distance),
    modes: Array.isArray(modes) ? modes : [modes],
    frequency: 'personalizada',
    createdAt: new Date().toISOString()
  };
  
  ROUTES_DATA.userRoutes.push(newRoute);
  return newRoute;
}

/**
 * Função para obter todas as rotas (exemplo + usuário)
 */
function getAllRoutes() {
  return [...ROUTES_DATA.samples, ...ROUTES_DATA.userRoutes];
}

/**
 * Função para calcular distância entre cidades
 */
function getDistanceBetweenCities(city1, city2) {
  const key = `${city1} → ${city2}`;
  const reverseKey = `${city2} → ${city1}`;
  
  return ROUTES_DATA.distances[key] || ROUTES_DATA.distances[reverseKey] || null;
}

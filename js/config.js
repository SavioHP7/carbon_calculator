/**
 * Configuração de constantes de CO2 para diferentes modos de transporte
 * Todos os valores em kg de CO2 por km
 */

const CO2_CONFIG = {
  // Transporte terrestre
  car: {
    name: 'Carro',
    co2PerKm: 0.192, // kg CO2/km (média de carro de passageiro)
    icon: '🚗'
  },
  
  bus: {
    name: 'Ônibus',
    co2PerKm: 0.089, // kg CO2/km (por passageiro)
    icon: '🚌'
  },
  
  motorcycle: {
    name: 'Motocicleta',
    co2PerKm: 0.110, // kg CO2/km
    icon: '🏍️'
  },
  
  truck: {
    name: 'Caminhão',
    co2PerKm: 0.780, // kg CO2/km
    icon: '🚚'
  },
  
  // Transporte ferroviário
  train: {
    name: 'Trem',
    co2PerKm: 0.041, // kg CO2/km (por passageiro)
    icon: '🚆'
  },
  
  // Transporte aéreo
  plane: {
    name: 'Avião',
    co2PerKm: 0.255, // kg CO2/km (por passageiro)
    icon: '✈️'
  },
  
  // Outros
  bicycle: {
    name: 'Bicicleta',
    co2PerKm: 0, // kg CO2/km
    icon: '🚴'
  },
  
  walking: {
    name: 'Caminhada',
    co2PerKm: 0, // kg CO2/km
    icon: '🚶'
  }
};

/**
 * Fatores de emissão para energia
 */
const ENERGY_CONFIG = {
  electricity: {
    name: 'Eletricidade',
    co2PerKwh: 0.484, // kg CO2/kWh (Brasil - média nacional)
    icon: '⚡'
  },
  
  gas: {
    name: 'Gás Natural',
    co2PerM3: 1.890, // kg CO2/m³
    icon: '🔥'
  },
  
  coal: {
    name: 'Carvão',
    co2PerKg: 2.400, // kg CO2/kg
    icon: '⚫'
  }
};

/**
 * Fatores de emissão para alimentação
 */
const FOOD_CONFIG = {
  beef: {
    name: 'Carne Vermelha',
    co2PerKg: 27.0, // kg CO2/kg
    icon: '🥩'
  },
  
  chicken: {
    name: 'Frango',
    co2PerKg: 6.9, // kg CO2/kg
    icon: '🍗'
  },
  
  fish: {
    name: 'Peixe',
    co2PerKg: 12.0, // kg CO2/kg
    icon: '🐟'
  },
  
  dairy: {
    name: 'Produtos Lácteos',
    co2PerKg: 1.9, // kg CO2/kg
    icon: '🥛'
  },
  
  vegetables: {
    name: 'Vegetais',
    co2PerKg: 0.5, // kg CO2/kg
    icon: '🥬'
  }
};

/**
 * Metas e referências de emissão
 */
const EMISSION_TARGETS = {
  worldwide_average: 4.0, // toneladas de CO2/ano
  developed_country: 8.0, // toneladas de CO2/ano
  sustainable: 2.3, // toneladas de CO2/ano (meta 2030)
  paris_agreement: 1.6 // toneladas de CO2/ano (limite 1.5°C)
};

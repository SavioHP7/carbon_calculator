/**
 * Lógica de cálculos de emissão de carbono
 * Funções globais para calcular CO2 em diferentes categorias
 */

/**
 * Calcula emissão de CO2 para transporte
 * @param {number} distance - Distância em km
 * @param {string} transportMode - Modo de transporte (car, bus, plane, etc)
 * @returns {object} Objeto com emissão em kg e toneladas
 */
function calculateTransportEmission(distance, transportMode) {
  if (!distance || distance <= 0) {
    return {
      distance: 0,
      mode: transportMode,
      co2Kg: 0,
      co2Tons: 0,
      error: 'Distância inválida'
    };
  }

  const transport = CO2_CONFIG[transportMode];
  
  if (!transport) {
    return {
      distance: distance,
      mode: transportMode,
      co2Kg: 0,
      co2Tons: 0,
      error: `Modo de transporte '${transportMode}' não encontrado`
    };
  }

  const co2Kg = distance * transport.co2PerKm;
  const co2Tons = co2Kg / 1000;

  return {
    distance: distance,
    mode: transportMode,
    name: transport.name,
    icon: transport.icon,
    co2PerKm: transport.co2PerKm,
    co2Kg: parseFloat(co2Kg.toFixed(3)),
    co2Tons: parseFloat(co2Tons.toFixed(6)),
    timestamp: new Date().toISOString()
  };
}

/**
 * Calcula emissão de CO2 para energia (eletricidade, gás, carvão)
 * @param {number} consumption - Consumo em kWh, m³ ou kg
 * @param {string} energyType - Tipo de energia (electricity, gas, coal)
 * @returns {object} Objeto com emissão em kg e toneladas
 */
function calculateEnergyEmission(consumption, energyType) {
  if (!consumption || consumption <= 0) {
    return {
      consumption: 0,
      type: energyType,
      co2Kg: 0,
      co2Tons: 0,
      error: 'Consumo inválido'
    };
  }

  const energy = ENERGY_CONFIG[energyType];
  
  if (!energy) {
    return {
      consumption: consumption,
      type: energyType,
      co2Kg: 0,
      co2Tons: 0,
      error: `Tipo de energia '${energyType}' não encontrado`
    };
  }

  let co2Kg = 0;
  const unit = energyType === 'electricity' ? 'kWh' : (energyType === 'gas' ? 'm³' : 'kg');
  const factor = energyType === 'electricity' ? energy.co2PerKwh : 
                 (energyType === 'gas' ? energy.co2PerM3 : energy.co2PerKg);

  co2Kg = consumption * factor;
  const co2Tons = co2Kg / 1000;

  return {
    consumption: consumption,
    unit: unit,
    type: energyType,
    name: energy.name,
    icon: energy.icon,
    co2Factor: factor,
    co2Kg: parseFloat(co2Kg.toFixed(3)),
    co2Tons: parseFloat(co2Tons.toFixed(6)),
    timestamp: new Date().toISOString()
  };
}

/**
 * Calcula emissão de CO2 para alimentação
 * @param {number} quantity - Quantidade em kg
 * @param {string} foodType - Tipo de alimento (beef, chicken, fish, etc)
 * @returns {object} Objeto com emissão em kg e toneladas
 */
function calculateFoodEmission(quantity, foodType) {
  if (!quantity || quantity <= 0) {
    return {
      quantity: 0,
      type: foodType,
      co2Kg: 0,
      co2Tons: 0,
      error: 'Quantidade inválida'
    };
  }

  const food = FOOD_CONFIG[foodType];
  
  if (!food) {
    return {
      quantity: quantity,
      type: foodType,
      co2Kg: 0,
      co2Tons: 0,
      error: `Tipo de alimento '${foodType}' não encontrado`
    };
  }

  const co2Kg = quantity * food.co2PerKg;
  const co2Tons = co2Kg / 1000;

  return {
    quantity: quantity,
    unit: 'kg',
    type: foodType,
    name: food.name,
    icon: food.icon,
    co2PerKg: food.co2PerKg,
    co2Kg: parseFloat(co2Kg.toFixed(3)),
    co2Tons: parseFloat(co2Tons.toFixed(6)),
    timestamp: new Date().toISOString()
  };
}

/**
 * Calcula emissões para múltiplos itens
 * @param {array} items - Array com objetos contendo: {type, value, category}
 * @returns {object} Objeto com emissões totais
 */
function calculateMultipleEmissions(items) {
  let totalCo2Kg = 0;
  let totalCo2Tons = 0;
  const results = [];

  items.forEach(item => {
    let emission = {};
    
    switch(item.category) {
      case 'transport':
        emission = calculateTransportEmission(item.value, item.type);
        break;
      case 'energy':
        emission = calculateEnergyEmission(item.value, item.type);
        break;
      case 'food':
        emission = calculateFoodEmission(item.value, item.type);
        break;
      default:
        emission = { error: 'Categoria inválida' };
    }

    if (!emission.error) {
      totalCo2Kg += emission.co2Kg;
      totalCo2Tons += emission.co2Tons;
    }
    
    results.push(emission);
  });

  return {
    itemsCount: results.length,
    details: results,
    totalCo2Kg: parseFloat(totalCo2Kg.toFixed(3)),
    totalCo2Tons: parseFloat(totalCo2Tons.toFixed(6)),
    timestamp: new Date().toISOString()
  };
}

/**
 * Compara emissão do usuário com metas de sustentabilidade
 * @param {number} co2Tons - Emissão em toneladas
 * @returns {object} Comparação com metas
 */
function compareWithTargets(co2Tons) {
  const comparison = {
    userEmission: co2Tons,
    targets: {},
    status: []
  };

  Object.entries(EMISSION_TARGETS).forEach(([key, value]) => {
    comparison.targets[key] = value;
    
    if (co2Tons > value) {
      comparison.status.push({
        target: key,
        value: value,
        difference: parseFloat((co2Tons - value).toFixed(3)),
        message: `Acima da meta de ${value} ton - Excesso de ${parseFloat((co2Tons - value).toFixed(3))} ton`
      });
    } else {
      comparison.status.push({
        target: key,
        value: value,
        difference: parseFloat((value - co2Tons).toFixed(3)),
        message: `Abaixo da meta de ${value} ton - ${parseFloat((value - co2Tons).toFixed(3))} ton para reduzir`
      });
    }
  });

  return comparison;
}

/**
 * Estima redução de emissão possível
 * @param {object} currentEmission - Emissão atual em kg
 * @param {number} percentageReduction - Percentual de redução (ex: 20 para 20%)
 * @returns {object} Estimativa de redução
 */
function estimateReductionTarget(currentEmission, percentageReduction) {
  const reductionKg = currentEmission * (percentageReduction / 100);
  const newEmissionKg = currentEmission - reductionKg;
  const newEmissionTons = newEmissionKg / 1000;

  return {
    current: parseFloat(currentEmission.toFixed(3)),
    reductionPercentage: percentageReduction,
    reductionKg: parseFloat(reductionKg.toFixed(3)),
    newEmissionKg: parseFloat(newEmissionKg.toFixed(3)),
    newEmissionTons: parseFloat(newEmissionTons.toFixed(6)),
    savingsPerYear: parseFloat((reductionKg * 365).toFixed(3))
  };
}

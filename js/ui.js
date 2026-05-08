/**
 * Manipulação do DOM e interface do usuário
 * Funções globais para atualizar a UI
 */

/**
 * Renderiza resultado de emissão de CO2
 * @param {object} emission - Objeto com dados de emissão
 * @param {string} containerId - ID do elemento container
 */
function renderEmissionResult(emission, containerId = 'result-container') {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`Container com ID '${containerId}' não encontrado`);
    return;
  }

  if (emission.error) {
    container.innerHTML = `
      <div class="alert alert-error">
        <span class="icon">⚠️</span>
        <p>${emission.error}</p>
      </div>
    `;
    return;
  }

  const html = `
    <div class="emission-result">
      <div class="result-header">
        <span class="icon">${emission.icon || '📊'}</span>
        <h3>${emission.name || 'Resultado'}</h3>
      </div>
      
      <div class="result-body">
        <div class="result-item">
          <span class="label">Emissão:</span>
          <span class="value">${emission.co2Kg} kg CO₂</span>
        </div>
        
        ${emission.co2Tons ? `
          <div class="result-item">
            <span class="label">Equivalente:</span>
            <span class="value">${emission.co2Tons} ton CO₂</span>
          </div>
        ` : ''}
        
        ${emission.distance ? `
          <div class="result-item">
            <span class="label">Distância:</span>
            <span class="value">${emission.distance} km</span>
          </div>
        ` : ''}
        
        ${emission.consumption ? `
          <div class="result-item">
            <span class="label">Consumo:</span>
            <span class="value">${emission.consumption} ${emission.unit}</span>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  container.innerHTML = html;
}

/**
 * Renderiza múltiplos resultados de emissão
 * @param {object} results - Objeto com array de resultados
 * @param {string} containerId - ID do elemento container
 */
function renderMultipleResults(results, containerId = 'results-container') {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`Container com ID '${containerId}' não encontrado`);
    return;
  }

  let itemsHtml = '';
  
  results.details.forEach((item, index) => {
    if (!item.error) {
      itemsHtml += `
        <div class="result-item">
          <span class="icon">${item.icon || '📍'}</span>
          <span class="name">${item.name || item.type}</span>
          <span class="value">${item.co2Kg} kg</span>
        </div>
      `;
    }
  });

  const html = `
    <div class="multiple-results">
      <h3>Detalhamento de Emissões</h3>
      <div class="items-list">
        ${itemsHtml}
      </div>
      
      <div class="total-summary">
        <div class="total-item">
          <span class="label">Total em kg:</span>
          <span class="value">${results.totalCo2Kg} kg CO₂</span>
        </div>
        <div class="total-item">
          <span class="label">Total em toneladas:</span>
          <span class="value">${results.totalCo2Tons} ton CO₂</span>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

/**
 * Renderiza comparação com metas de sustentabilidade
 * @param {object} comparison - Objeto com comparação
 * @param {string} containerId - ID do elemento container
 */
function renderTargetsComparison(comparison, containerId = 'targets-container') {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`Container com ID '${containerId}' não encontrado`);
    return;
  }

  let statusHtml = '';
  
  comparison.status.forEach(item => {
    const isAbove = item.difference > 0;
    const statusClass = isAbove ? 'above-target' : 'below-target';
    const statusIcon = isAbove ? '⚠️' : '✅';
    
    statusHtml += `
      <div class="status-item ${statusClass}">
        <span class="icon">${statusIcon}</span>
        <div class="status-info">
          <span class="target-name">${item.target}</span>
          <span class="status-message">${item.message}</span>
        </div>
      </div>
    `;
  });

  const html = `
    <div class="targets-comparison">
      <h3>Comparação com Metas Globais</h3>
      <div class="user-emission">
        <p>Sua emissão: <strong>${comparison.userEmission} ton CO₂/ano</strong></p>
      </div>
      <div class="status-list">
        ${statusHtml}
      </div>
    </div>
  `;

  container.innerHTML = html;
}

/**
 * Renderiza rotas disponíveis em um select
 * @param {array} routes - Array de rotas
 * @param {string} selectId - ID do elemento select
 */
function renderRoutesSelect(routes, selectId = 'routes-select') {
  const select = document.getElementById(selectId);
  
  if (!select) {
    console.error(`Select com ID '${selectId}' não encontrado`);
    return;
  }

  let optionsHtml = '<option value="">Selecione uma rota...</option>';
  
  routes.forEach(route => {
    optionsHtml += `
      <option value="${route.id}" data-distance="${route.distance}">
        ${route.name} (${route.distance} km)
      </option>
    `;
  });

  select.innerHTML = optionsHtml;
}

/**
 * Renderiza opções de modo de transporte
 * @param {string} containerId - ID do elemento container
 */
function renderTransportModes(containerId = 'transport-modes') {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`Container com ID '${containerId}' não encontrado`);
    return;
  }

  let modesHtml = '';
  
  Object.entries(CO2_CONFIG).forEach(([key, transport]) => {
    modesHtml += `
      <button class="transport-mode-btn" data-mode="${key}" title="${transport.name}">
        <span class="mode-icon">${transport.icon}</span>
        <span class="mode-name">${transport.name}</span>
        <span class="mode-emission">${transport.co2PerKm} kg/km</span>
      </button>
    `;
  });

  container.innerHTML = `<div class="modes-grid">${modesHtml}</div>`;
}

/**
 * Renderiza opções de tipo de energia
 * @param {string} containerId - ID do elemento container
 */
function renderEnergyTypes(containerId = 'energy-types') {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`Container com ID '${containerId}' não encontrado`);
    return;
  }

  let typesHtml = '';
  
  Object.entries(ENERGY_CONFIG).forEach(([key, energy]) => {
    const factor = key === 'electricity' ? energy.co2PerKwh : 
                   (key === 'gas' ? energy.co2PerM3 : energy.co2PerKg);
    const unit = key === 'electricity' ? 'kWh' : (key === 'gas' ? 'm³' : 'kg');
    
    typesHtml += `
      <button class="energy-type-btn" data-type="${key}" title="${energy.name}">
        <span class="type-icon">${energy.icon}</span>
        <span class="type-name">${energy.name}</span>
        <span class="type-emission">${factor} kg/${unit}</span>
      </button>
    `;
  });

  container.innerHTML = `<div class="types-grid">${typesHtml}</div>`;
}

/**
 * Renderiza opções de tipo de alimento
 * @param {string} containerId - ID do elemento container
 */
function renderFoodTypes(containerId = 'food-types') {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`Container com ID '${containerId}' não encontrado`);
    return;
  }

  let foodsHtml = '';
  
  Object.entries(FOOD_CONFIG).forEach(([key, food]) => {
    foodsHtml += `
      <button class="food-type-btn" data-type="${key}" title="${food.name}">
        <span class="food-icon">${food.icon}</span>
        <span class="food-name">${food.name}</span>
        <span class="food-emission">${food.co2PerKg} kg/kg</span>
      </button>
    `;
  });

  container.innerHTML = `<div class="foods-grid">${foodsHtml}</div>`;
}

/**
 * Limpa um container
 * @param {string} containerId - ID do elemento container
 */
function clearContainer(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '';
  }
}

/**
 * Exibe mensagem de sucesso
 * @param {string} message - Mensagem a exibir
 * @param {string} containerId - ID do elemento container (opcional)
 */
function showSuccessMessage(message, containerId = 'message-container') {
  const container = document.getElementById(containerId);
  
  if (container) {
    container.innerHTML = `
      <div class="alert alert-success">
        <span class="icon">✅</span>
        <p>${message}</p>
      </div>
    `;
  }
}

/**
 * Exibe mensagem de erro
 * @param {string} message - Mensagem a exibir
 * @param {string} containerId - ID do elemento container (opcional)
 */
function showErrorMessage(message, containerId = 'message-container') {
  const container = document.getElementById(containerId);
  
  if (container) {
    container.innerHTML = `
      <div class="alert alert-error">
        <span class="icon">❌</span>
        <p>${message}</p>
      </div>
    `;
  }
}

/**
 * Obter valor de um input
 * @param {string} inputId - ID do input
 * @returns {string} Valor do input
 */
function getInputValue(inputId) {
  const input = document.getElementById(inputId);
  return input ? input.value.trim() : '';
}

/**
 * Definir valor de um input
 * @param {string} inputId - ID do input
 * @param {string} value - Valor a definir
 */
function setInputValue(inputId, value) {
  const input = document.getElementById(inputId);
  if (input) {
    input.value = value;
  }
}

/**
 * Inicialização da aplicação e gerenciamento de eventos
 */

// Estado global da aplicação
const APP_STATE = {
  selectedCategory: null,
  selectedMode: null,
  calculations: [],
  userRoutes: []
};

/**
 * Inicializa a aplicação
 */
function initApp() {
  console.log('🌍 Inicializando Calculadora de Carbono...');
  
  // Carrega rotas do usuário do localStorage
  loadUserRoutesFromStorage();
  
  // Configura event listeners
  setupEventListeners();
  
  // Renderiza opções iniciais
  renderInitialUI();
  
  console.log('✅ Aplicação iniciada com sucesso');
}

/**
 * Configura todos os event listeners
 */
function setupEventListeners() {
  // Event listeners para abas/categorias
  const categoryButtons = document.querySelectorAll('[data-category]');
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', handleCategoryChange);
  });

  // Event listeners para modo de transporte
  document.addEventListener('click', (e) => {
    if (e.target.closest('.transport-mode-btn')) {
      handleTransportModeSelect(e);
    }
  });

  // Event listeners para tipo de energia
  document.addEventListener('click', (e) => {
    if (e.target.closest('.energy-type-btn')) {
      handleEnergyTypeSelect(e);
    }
  });

  // Event listeners para tipo de alimento
  document.addEventListener('click', (e) => {
    if (e.target.closest('.food-type-btn')) {
      handleFoodTypeSelect(e);
    }
  });

  // Event listeners para botões de cálculo
  const calcButtons = document.querySelectorAll('[data-action="calculate"]');
  calcButtons.forEach(btn => {
    btn.addEventListener('click', handleCalculate);
  });

  // Event listeners para botões de salvar
  const saveButtons = document.querySelectorAll('[data-action="save"]');
  saveButtons.forEach(btn => {
    btn.addEventListener('click', handleSaveRoute);
  });

  // Event listeners para botões de limpar
  const clearButtons = document.querySelectorAll('[data-action="clear"]');
  clearButtons.forEach(btn => {
    btn.addEventListener('click', handleClear);
  });

  console.log('✓ Event listeners configurados');
}

/**
 * Renderiza UI inicial
 */
function renderInitialUI() {
  // Renderiza modos de transporte
  renderTransportModes('transport-modes');
  
  // Renderiza tipos de energia
  renderEnergyTypes('energy-types');
  
  // Renderiza tipos de alimento
  renderFoodTypes('food-types');
  
  // Renderiza rotas salvass
  const allRoutes = getAllRoutes();
  renderRoutesSelect(allRoutes, 'routes-select');
  
  console.log('✓ UI inicial renderizada');
}

/**
 * Handler para mudança de categoria
 */
function handleCategoryChange(e) {
  const category = e.target.dataset.category;
  APP_STATE.selectedCategory = category;
  
  console.log(`📂 Categoria selecionada: ${category}`);
  
  // Remove ativo de todos os botões
  document.querySelectorAll('[data-category]').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Adiciona ativo ao botão clicado
  e.target.classList.add('active');
  
  // Mostra/esconde sections apropriadas
  showCategorySection(category);
}

/**
 * Mostra section apropriada para a categoria
 */
function showCategorySection(category) {
  document.querySelectorAll('[data-section]').forEach(section => {
    section.classList.remove('active');
  });
  
  const sectionId = `${category}-section`;
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.add('active');
  }
}

/**
 * Handler para seleção de modo de transporte
 */
function handleTransportModeSelect(e) {
  const button = e.target.closest('.transport-mode-btn');
  const mode = button.dataset.mode;
  
  APP_STATE.selectedMode = mode;
  
  // Remove ativo de todos os botões
  document.querySelectorAll('.transport-mode-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Adiciona ativo ao botão clicado
  button.classList.add('active');
  
  console.log(`🚗 Modo de transporte selecionado: ${mode}`);
}

/**
 * Handler para seleção de tipo de energia
 */
function handleEnergyTypeSelect(e) {
  const button = e.target.closest('.energy-type-btn');
  const type = button.dataset.type;
  
  APP_STATE.selectedMode = type;
  
  // Remove ativo de todos os botões
  document.querySelectorAll('.energy-type-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Adiciona ativo ao botão clicado
  button.classList.add('active');
  
  console.log(`⚡ Tipo de energia selecionado: ${type}`);
}

/**
 * Handler para seleção de tipo de alimento
 */
function handleFoodTypeSelect(e) {
  const button = e.target.closest('.food-type-btn');
  const type = button.dataset.type;
  
  APP_STATE.selectedMode = type;
  
  // Remove ativo de todos os botões
  document.querySelectorAll('.food-type-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Adiciona ativo ao botão clicado
  button.classList.add('active');
  
  console.log(`🍔 Tipo de alimento selecionado: ${type}`);
}

/**
 * Handler para cálculo
 */
function handleCalculate(e) {
  const section = e.target.closest('[data-section]');
  const category = APP_STATE.selectedCategory;
  
  let result = null;
  
  try {
    if (category === 'transport') {
      const distance = parseFloat(getInputValue('transport-distance'));
      const mode = APP_STATE.selectedMode;
      
      if (!distance || !mode) {
        showErrorMessage('Por favor, insira a distância e selecione um modo de transporte');
        return;
      }
      
      result = calculateTransportEmission(distance, mode);
      
    } else if (category === 'energy') {
      const consumption = parseFloat(getInputValue('energy-consumption'));
      const type = APP_STATE.selectedMode;
      
      if (!consumption || !type) {
        showErrorMessage('Por favor, insira o consumo e selecione um tipo de energia');
        return;
      }
      
      result = calculateEnergyEmission(consumption, type);
      
    } else if (category === 'food') {
      const quantity = parseFloat(getInputValue('food-quantity'));
      const type = APP_STATE.selectedMode;
      
      if (!quantity || !type) {
        showErrorMessage('Por favor, insira a quantidade e selecione um tipo de alimento');
        return;
      }
      
      result = calculateFoodEmission(quantity, type);
    }
    
    if (result && !result.error) {
      renderEmissionResult(result, 'result-container');
      APP_STATE.calculations.push(result);
      saveCalculationsToStorage();
      showSuccessMessage('Cálculo realizado com sucesso!');
    } else {
      showErrorMessage(result?.error || 'Erro ao calcular emissão');
    }
    
  } catch (error) {
    console.error('Erro ao calcular:', error);
    showErrorMessage('Erro ao processar o cálculo');
  }
}

/**
 * Handler para salvar rota
 */
function handleSaveRoute(e) {
  const routeName = getInputValue('route-name');
  const distance = parseFloat(getInputValue('transport-distance'));
  
  if (!routeName || !distance) {
    showErrorMessage('Por favor, insira o nome da rota e a distância');
    return;
  }
  
  const newRoute = addUserRoute(routeName, distance, [APP_STATE.selectedMode]);
  APP_STATE.userRoutes.push(newRoute);
  
  saveUserRoutesToStorage();
  
  // Atualiza o select de rotas
  const allRoutes = getAllRoutes();
  renderRoutesSelect(allRoutes, 'routes-select');
  
  showSuccessMessage(`Rota "${routeName}" salva com sucesso!`);
  
  // Limpa inputs
  setInputValue('route-name', '');
  setInputValue('transport-distance', '');
}

/**
 * Handler para limpar
 */
function handleClear(e) {
  const section = e.target.closest('[data-section]');
  const category = APP_STATE.selectedCategory;
  
  if (category === 'transport') {
    setInputValue('transport-distance', '');
    setInputValue('route-name', '');
  } else if (category === 'energy') {
    setInputValue('energy-consumption', '');
  } else if (category === 'food') {
    setInputValue('food-quantity', '');
  }
  
  clearContainer('result-container');
  APP_STATE.selectedMode = null;
  
  document.querySelectorAll('.transport-mode-btn, .energy-type-btn, .food-type-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  showSuccessMessage('Formulário limpo');
}

/**
 * Salva cálculos no localStorage
 */
function saveCalculationsToStorage() {
  try {
    localStorage.setItem('carbon_calculations', JSON.stringify(APP_STATE.calculations));
  } catch (error) {
    console.warn('Erro ao salvar cálculos:', error);
  }
}

/**
 * Carrega cálculos do localStorage
 */
function loadCalculationsFromStorage() {
  try {
    const saved = localStorage.getItem('carbon_calculations');
    if (saved) {
      APP_STATE.calculations = JSON.parse(saved);
      console.log(`✓ ${APP_STATE.calculations.length} cálculos carregados`);
    }
  } catch (error) {
    console.warn('Erro ao carregar cálculos:', error);
  }
}

/**
 * Salva rotas do usuário no localStorage
 */
function saveUserRoutesToStorage() {
  try {
    localStorage.setItem('user_routes', JSON.stringify(ROUTES_DATA.userRoutes));
  } catch (error) {
    console.warn('Erro ao salvar rotas:', error);
  }
}

/**
 * Carrega rotas do usuário do localStorage
 */
function loadUserRoutesFromStorage() {
  try {
    const saved = localStorage.getItem('user_routes');
    if (saved) {
      ROUTES_DATA.userRoutes = JSON.parse(saved);
      console.log(`✓ ${ROUTES_DATA.userRoutes.length} rotas do usuário carregadas`);
    }
  } catch (error) {
    console.warn('Erro ao carregar rotas:', error);
  }
}

/**
 * Retorna histórico de cálculos
 */
function getCalculationHistory() {
  return APP_STATE.calculations;
}

/**
 * Limpa histórico de cálculos
 */
function clearCalculationHistory() {
  APP_STATE.calculations = [];
  localStorage.removeItem('carbon_calculations');
  showSuccessMessage('Histórico limpo');
}

// Inicializa a app quando o DOM está pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

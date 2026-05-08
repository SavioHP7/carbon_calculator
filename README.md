# 🌍 Calculadora de Carbono

Uma aplicação web moderna e intuitiva para calcular e analisar sua pegada de carbono, ajudando na estimativa de emissões e impacto ambiental.

## 📋 Características

- **Calculadora de Transporte** 🚗
  - Calcule emissões para diferentes modos de transporte
  - Suporta: carro, ônibus, motocicleta, caminhão, trem, avião, bicicleta e caminhada
  - Salve rotas para reutilização rápida

- **Calculadora de Energia** ⚡
  - Calcule emissões por consumo de energia
  - Suporta: eletricidade, gás natural e carvão
  - Fatores de emissão atualizados para o Brasil

- **Calculadora de Alimentação** 🍔
  - Estime emissões pela sua alimentação
  - Inclui: carne vermelha, frango, peixe, laticínios e vegetais
  - Compare o impacto de diferentes alimentos

- **Histórico de Cálculos** 📊
  - Acompanhe todos os seus cálculos
  - Exporte histórico como JSON
  - Sincronização com localStorage

- **Comparação com Metas** 🎯
  - Compare sua pegada com metas globais
  - Metas incluem: média mundial, países desenvolvidos, sustentável (2030) e Acordo de Paris

## 🚀 Como Usar

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/SavioHP7/carbon_calculator.git
cd carbon_calculator
```

2. Abra o arquivo `index.html` no seu navegador:
```bash
# Opção 1: Abrir diretamente
open index.html

# Opção 2: Usar um servidor local (Python 3)
python -m http.server 8000

# Opção 3: Usar um servidor local (Node.js)
npx http-server
```

3. Pronto! A aplicação está rodando em `http://localhost:8000`

### Uso da Aplicação

#### 1. Calcular Emissões por Transporte
1. Clique na aba **"🚗 Transporte"**
2. Selecione um modo de transporte clicando no ícone
3. Insira a distância em km
4. Clique em **"✓ Calcular Emissão"**
5. (Opcional) Salve a rota para uso futuro

#### 2. Calcular Emissões por Energia
1. Clique na aba **"⚡ Energia"**
2. Selecione um tipo de energia
3. Insira o consumo (kWh, m³ ou kg)
4. Clique em **"✓ Calcular Emissão"**

#### 3. Calcular Emissões por Alimentação
1. Clique na aba **"🍔 Alimentação"**
2. Selecione um tipo de alimento
3. Insira a quantidade em kg
4. Clique em **"✓ Calcular Emissão"**

#### 4. Visualizar Histórico
1. Clique na aba **"📊 Histórico"**
2. Veja todos os seus cálculos anteriores
3. Exporte como JSON ou limpe o histórico

## 📁 Estrutura do Projeto

```
carbon-calculator/
├── index.html              # Página principal com toda a estrutura
├── CSS/
│   └── style.css          # Estilos completos e responsivos
├── js/
│   ├── config.js          # Configuração de constantes de CO2
│   ├── calculator.js      # Lógica de cálculos de emissão
│   ├── ui.js              # Manipulação do DOM e interface
│   ├── routes-data.js     # Dados de rotas pré-configuradas
│   └── app.js             # Inicialização e gerenciamento de eventos
└── README.md              # Este arquivo
```

## 🧮 Fatores de Emissão Utilizados

### Transporte (kg CO₂/km por passageiro)
- **Carro**: 0.192
- **Ônibus**: 0.089
- **Motocicleta**: 0.110
- **Caminhão**: 0.780
- **Trem**: 0.041
- **Avião**: 0.255
- **Bicicleta**: 0 (zero emissões)
- **Caminhada**: 0 (zero emissões)

### Energia
- **Eletricidade**: 0.484 kg CO₂/kWh (Brasil)
- **Gás Natural**: 1.890 kg CO₂/m³
- **Carvão**: 2.400 kg CO₂/kg

### Alimentação (kg CO₂/kg)
- **Carne Vermelha**: 27.0
- **Frango**: 6.9
- **Peixe**: 12.0
- **Produtos Lácteos**: 1.9
- **Vegetais**: 0.5

## 🎯 Metas Globais de Emissão

A aplicação compara suas emissões anuais com:
- **Média Mundial**: 4.0 ton CO₂/ano
- **Países Desenvolvidos**: 8.0 ton CO₂/ano
- **Meta Sustentável (2030)**: 2.3 ton CO₂/ano
- **Limite do Acordo de Paris (1.5°C)**: 1.6 ton CO₂/ano

## 💻 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos responsivos com variáveis CSS
- **JavaScript Vanilla** - Lógica e interatividade
- **LocalStorage** - Persistência de dados no navegador

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona perfeitamente em:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (até 480px)

## 🌟 Funcionalidades Destacadas

### Armazenamento Local
- Todos os cálculos são salvos no localStorage
- Rotas personalizadas são persistidas
- Histórico é mantido entre sessões

### Interface Intuitiva
- Design moderno e limpo
- Cores temáticas relacionadas à sustentabilidade
- Ícones emoji para identificação rápida
- Animações suaves e feedback visual

### Cálculos Precisos
- Fatores de emissão baseados em dados reais
- Suporte para múltiplas unidades
- Precisão de até 6 casas decimais

## 🔧 Desenvolvimento

### Adicionar Novo Modo de Transporte

1. Abra `js/config.js`
2. Adicione um novo modo ao objeto `CO2_CONFIG`:

```javascript
CO2_CONFIG.novo_modo = {
  name: 'Nome do Modo',
  co2PerKm: 0.123, // kg CO2/km
  icon: '🚀'
};
```

### Modificar Fatores de Emissão

1. Abra `js/config.js`
2. Atualize os valores em `CO2_CONFIG`, `ENERGY_CONFIG` ou `FOOD_CONFIG`

### Adicionar Novas Rotas

1. Abra `js/routes-data.js`
2. Adicione à array `ROUTES_DATA.samples`:

```javascript
{
  id: 'route_xxx',
  name: 'Nome da Rota',
  distance: 100,
  modes: ['car', 'bus'],
  frequency: 'diária'
}
```

## 🐛 Troubleshooting

### Scripts não carregam
- Verifique se todos os arquivos estão no lugar correto
- Abra o console do navegador (F12) para verificar erros

### Histórico não persiste
- Verifique se o localStorage está habilitado
- Limpe o cache do navegador e recarregue

### Cálculos incorretos
- Revise os valores de entrada
- Confirme que os fatores de emissão estão atualizados em `config.js`

## 📊 Exemplos de Uso

### Exemplo 1: Viagem de Carro
- Modo: Carro
- Distância: 150 km
- Emissão: 150 × 0.192 = **28.8 kg CO₂**

### Exemplo 2: Consumo de Eletricidade
- Tipo: Eletricidade
- Consumo: 300 kWh
- Emissão: 300 × 0.484 = **145.2 kg CO₂**

### Exemplo 3: Consumo de Carne
- Tipo: Carne Vermelha
- Quantidade: 10 kg
- Emissão: 10 × 27.0 = **270 kg CO₂**

## 🌱 Dicas para Reduzir sua Pegada de Carbono

1. **Transporte**
   - Prefira transportes públicos
   - Use bicicleta para distâncias curtas
   - Carona com amigos

2. **Energia**
   - Use lâmpadas LED
   - Desligue aparelhos em standby
   - Invista em energia renovável

3. **Alimentação**
   - Reduza consumo de carne vermelha
   - Compre alimentos locais
   - Minimize desperdício de comida

## 📝 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

- GitHub: [@SavioHP7](https://github.com/SavioHP7)
- Email: saviofelipe10@gmail.com

## 🙏 Agradecimentos

- Dados de fatores de emissão baseados em estudos científicos
- Inspiração em calculadoras de carbono globais
- Comunidade open-source

---

**Desenvolvido com ❤️ para um planeta mais sustentável** 🌍🌱

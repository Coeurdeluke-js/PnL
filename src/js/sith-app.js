// ===== APLICACIÓN SITH - IMPERIO DEL TRADING =====

// Importaciones
import { EXCHANGES } from './config.js';
import { DataProcessor } from '../utils/DataProcessor.js';
import { UIUpdater } from '../utils/UIUpdater.js';

// Variables globales del Imperio
let selectedExchange = null;
let tradesData = [];
let currentChart = null;
const dataProcessor = new DataProcessor();
const uiUpdater = new UIUpdater();

// ===== INICIALIZACIÓN DEL IMPERIO =====
document.addEventListener('DOMContentLoaded', () => {
    initializeSithApp();
});

function initializeSithApp() {
    console.log('🔴 Iniciando Imperio del Trading...');
    
    // Configurar eventos
    setupEventListeners();
    
    // Mostrar mensaje de bienvenida
    showWelcomeSection();
    
    console.log('⚡ Imperio del Trading iniciado correctamente');
}

// ===== CONFIGURACIÓN DE EVENTOS =====
function setupEventListeners() {
    // Botón de carga
    const uploadButton = document.getElementById('uploadButton');
    const fileInput = document.getElementById('csvFile');
    
    console.log('🔍 Configurando eventos...', { uploadButton, fileInput });
    
    if (uploadButton) {
        uploadButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🔴 Botón de carga clickeado');
            showExchangeModal();
        });
        console.log('✅ Event listener del botón configurado');
    } else {
        console.error('❌ No se encontró el botón uploadButton');
    }
    
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
        console.log('✅ Event listener del input configurado');
    } else {
        console.error('❌ No se encontró el input csvFile');
    }
    
    // Opciones de exchange
    const exchangeOptions = document.querySelectorAll('.exchange-option');
    console.log('🔍 Exchange options encontradas:', exchangeOptions.length);
    
    exchangeOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const exchange = option.dataset.exchange;
            console.log('🔴 Exchange seleccionado:', exchange);
            selectExchange(exchange);
        });
    });
    
    // Navegación de tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const tabName = tab.dataset.tab;
            showTab(tabName);
        });
    });
    
    // Cerrar modales
    setupModalCloseEvents();
}

// ===== GESTIÓN DE MODALES =====
function showExchangeModal() {
    console.log('🔴 Mostrando modal de exchange...');
    const modal = document.getElementById('exchangeModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('✅ Modal de exchange mostrado');
    } else {
        console.error('❌ No se encontró el modal exchangeModal');
    }
}

function hideExchangeModal() {
    const modal = document.getElementById('exchangeModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('✅ Modal de exchange ocultado');
    }
}

function showErrorModal(message) {
    const modal = document.getElementById('errorModal');
    const messageElement = document.getElementById('errorMessage');
    
    if (modal && messageElement) {
        messageElement.textContent = message;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('❌ Modal de error mostrado:', message);
    }
}

function hideErrorModal() {
    const modal = document.getElementById('errorModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function setupModalCloseEvents() {
    // Cerrar modal de exchange
    const exchangeCloseBtn = document.querySelector('#exchangeModal .modal-close');
    const exchangeOverlay = document.querySelector('#exchangeModal .modal-overlay');
    
    if (exchangeCloseBtn) {
        exchangeCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            hideExchangeModal();
        });
    }
    
    if (exchangeOverlay) {
        exchangeOverlay.addEventListener('click', (e) => {
            if (e.target === exchangeOverlay) {
                hideExchangeModal();
            }
        });
    }
    
    // Cerrar modal de error
    const errorCloseBtn = document.getElementById('closeErrorModal');
    const errorOverlay = document.querySelector('#errorModal .modal-overlay');
    
    if (errorCloseBtn) {
        errorCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            hideErrorModal();
        });
    }
    
    if (errorOverlay) {
        errorOverlay.addEventListener('click', (e) => {
            if (e.target === errorOverlay) {
                hideErrorModal();
            }
        });
    }
}

// ===== SELECCIÓN DE EXCHANGE =====
function selectExchange(exchange) {
    selectedExchange = exchange;
    console.log(`🔴 Exchange seleccionado: ${exchange}`);
    
    hideExchangeModal();
    
    // Activar input de archivo
    const fileInput = document.getElementById('csvFile');
    if (fileInput) {
        console.log('🔴 Abriendo selector de archivos...');
        fileInput.click();
    } else {
        console.error('❌ No se encontró el input de archivo');
        showErrorModal('Error: No se puede abrir el selector de archivos');
    }
}

// ===== MANEJO DE ARCHIVOS =====
async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) {
        console.log('🔍 No se seleccionó archivo');
        return;
    }
    
    if (!selectedExchange) {
        showErrorModal('Debes seleccionar un exchange primero');
        return;
    }
    
    console.log(`🔴 Procesando archivo: ${file.name}`);
    
    try {
        // Mostrar indicador de carga
        showLoadingState();
        
        // Leer archivo
        const fileContent = await readFile(file);
        console.log('📄 Archivo leído correctamente');
        
        // Procesar datos
        const trades = await dataProcessor.processFile(fileContent, selectedExchange);
        
        if (trades && trades.length > 0) {
            tradesData = trades;
            console.log(`⚡ ${trades.length} trades procesados correctamente`);
            
            // Actualizar UI
            updateDashboard(trades);
            showDashboard();
        } else {
            throw new Error('No se encontraron datos válidos en el archivo');
        }
        
    } catch (error) {
        console.error('❌ Error procesando archivo:', error);
        showErrorModal(`Error al procesar el archivo: ${error.message}`);
    } finally {
        hideLoadingState();
        // Limpiar input
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

// ===== NAVEGACIÓN DE TABS =====
function showTab(tabName) {
    console.log('🔄 Cambiando a tab:', tabName);
    
    // Ocultar todos los paneles
    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    // Desactivar todos los tabs
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Mostrar panel activo
    const activePanel = document.getElementById(tabName);
    if (activePanel) {
        activePanel.classList.add('active');
        console.log('✅ Panel activado:', tabName);
    } else {
        console.warn('⚠️ No se encontró el panel:', tabName);
    }
    
    // Activar tab
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
        console.log('✅ Tab activado:', tabName);
    } else {
        console.warn('⚠️ No se encontró el tab:', tabName);
    }
}

// ===== ESTADOS DE UI =====
function showWelcomeSection() {
    const welcomeSection = document.getElementById('welcomeSection');
    const dashboard = document.getElementById('dashboard');
    
    if (welcomeSection) {
        welcomeSection.style.display = 'block';
        console.log('✅ Sección de bienvenida mostrada');
    }
    if (dashboard) {
        dashboard.style.display = 'none';
    }
}

function showDashboard() {
    const welcomeSection = document.getElementById('welcomeSection');
    const dashboard = document.getElementById('dashboard');
    
    if (welcomeSection) {
        welcomeSection.style.display = 'none';
    }
    if (dashboard) {
        dashboard.style.display = 'block';
        console.log('✅ Dashboard mostrado');
    } else {
        console.warn('⚠️ No se encontró el elemento dashboard');
    }
}

function showLoadingState() {
    const uploadButton = document.getElementById('uploadButton');
    if (uploadButton) {
        uploadButton.innerHTML = '<span class="button-text">PROCESANDO...</span>';
        uploadButton.disabled = true;
        console.log('🔄 Estado de carga activado');
    }
}

function hideLoadingState() {
    const uploadButton = document.getElementById('uploadButton');
    if (uploadButton) {
        uploadButton.innerHTML = '<span class="button-glow"></span><span class="button-text">CARGAR DATOS DEL IMPERIO</span>';
        uploadButton.disabled = false;
        console.log('✅ Estado de carga desactivado');
    }
}

// ===== ACTUALIZACIÓN DE UI =====
function updateDashboard(trades) {
    console.log('🔄 Actualizando dashboard con', trades.length, 'trades');
    
    // Guardar datos globalmente
    tradesData = trades;
    
    // Usar UIUpdater para actualizar la interfaz
    uiUpdater.updateUI(trades);
    
    // Calcular métricas adicionales
    const metrics = calculateMetrics(trades);
    console.log('📊 Métricas calculadas:', metrics);
    
    // Actualizar profit factor que no está en UIUpdater
    const profitFactorElement = document.getElementById('profitFactor');
    if (profitFactorElement) {
        const profitFactor = calculateProfitFactor(trades);
        profitFactorElement.textContent = profitFactor.toFixed(2);
    }
}

function calculateMetrics(trades) {
    const totalPnl = trades.reduce((sum, trade) => sum + (parseFloat(trade.pnl) || 0), 0);
    const winningTrades = trades.filter(trade => (parseFloat(trade.pnl) || 0) > 0);
    const winRate = trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0;
    
    return {
        totalTrades: trades.length,
        totalPnL: totalPnl,
        winRate: winRate.toFixed(2),
        winningTrades: winningTrades.length,
        losingTrades: trades.length - winningTrades.length
    };
}

function calculateProfitFactor(trades) {
    const winningTrades = trades.filter(trade => (parseFloat(trade.pnl) || 0) > 0);
    const losingTrades = trades.filter(trade => (parseFloat(trade.pnl) || 0) < 0);
    
    const totalWins = winningTrades.reduce((sum, trade) => sum + (parseFloat(trade.pnl) || 0), 0);
    const totalLosses = Math.abs(losingTrades.reduce((sum, trade) => sum + (parseFloat(trade.pnl) || 0), 0));
    
    return totalLosses > 0 ? totalWins / totalLosses : totalWins > 0 ? 999 : 0;
}

// ===== EXPORTACIÓN GLOBAL =====
window.SithApp = {
    // Funciones principales
    selectExchange,
    showTab,
    
    // Modales
    showExchangeModal,
    hideExchangeModal,
    showErrorModal,
    hideErrorModal,
    
    // Estados
    showWelcomeSection,
    showDashboard,
    showLoadingState,
    hideLoadingState,
    
    // Datos
    getSelectedExchange: () => selectedExchange,
    getTradesData: () => tradesData,
    
    // Métricas
    updateDashboard,
    calculateMetrics
};

console.log('🔴 Imperio del Trading - Aplicación Sith cargada correctamente');
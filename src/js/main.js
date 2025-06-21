import { setSelectedExchange, getSelectedExchange, handleFileSelect } from './file-handler.js';
import { showTab } from './ui-manager.js';
import { setupModalEvents, showExchangeModal, hideExchangeModal } from './modal-manager.js';
import { setSelectedExchange, handleFileSelect } from './file-handler.js';

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const uploadBtn = document.getElementById('uploadButton');
    const fileInput = document.getElementById('csvFile');
    const exchangeOptions = document.querySelectorAll('.exchange-option');
    const tabs = document.querySelectorAll('.tab');
    
    // Event Listeners
    uploadBtn.addEventListener('click', () => showExchangeModal());
    
    exchangeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const exchange = option.dataset.exchange;
            setSelectedExchange(exchange);
            hideExchangeModal();
            fileInput.click();
        });
    });
    
    fileInput.addEventListener('change', handleFileSelect);
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            showTab(tabName);
        });
    });
    
    // Configurar eventos de modales
    setupModalEvents();
});

// Función global para compatibilidad
window.showTab = (tabName) => {
    showTab(tabName);
};
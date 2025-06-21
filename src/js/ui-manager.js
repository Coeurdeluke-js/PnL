import { MetricsCalculator } from './metrics/metrics-calculator.js';
import { DOMUpdater } from './ui/dom-updater.js';
import { TabManager } from './tabs/tab-manager.js';
import { updateSymbolChart } from './chart-manager.js';

export function updateUI(trades) {
    if (trades.length === 0) return;

    // Mostrar el contenido cuando se cargan datos
    showContent();

    // Calcular métricas básicas y avanzadas
    const basicMetrics = MetricsCalculator.calculateBasicMetrics(trades);
    const advancedMetrics = MetricsCalculator.calculateAdvancedMetrics(trades);
    const combinedMetrics = { ...basicMetrics, ...advancedMetrics };

    // Actualizar métricas en el DOM
    DOMUpdater.updateMetrics(combinedMetrics);

    // Calcular y actualizar resumen por símbolo
    const summaryData = MetricsCalculator.calculateSymbolSummary(trades);
    DOMUpdater.updateSymbolSummaryTable(summaryData);
    
    // Actualizar tabla de todas las operaciones
    DOMUpdater.updateAllTradesTable(trades);
    
    // Actualizar gráfico
    updateSymbolChart(summaryData);
}

export function showContent() {
    const container = document.querySelector('.container');
    container.classList.remove('content-hidden');
    container.classList.add('content-visible');
}

export function hideContent() {
    const container = document.querySelector('.container');
    container.classList.remove('content-visible');
    container.classList.add('content-hidden');
}

export function showTab(tabName) {
    TabManager.showTab(tabName);
}
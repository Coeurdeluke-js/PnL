import { ChartConfig } from './charts/chart-config.js';
import { ChartDataProcessor } from './charts/chart-data-processor.js';

let symbolChart = null;

export function updateSymbolChart(summaryData) {
    destroyExistingChart();
    
    const canvas = getChartCanvas();
    if (!canvas || !isDataValid(summaryData)) return;
    
    const chartData = ChartDataProcessor.processSymbolData(summaryData);
    const config = ChartConfig.getPieChartConfig(chartData, summaryData);
    
    createChart(canvas, config);
}

function destroyExistingChart() {
    if (symbolChart) {
        symbolChart.destroy();
        symbolChart = null;
    }
}

function getChartCanvas() {
    const canvas = document.getElementById('symbolPnlChart');
    if (!canvas) {
        console.warn('Canvas element not found');
        return null;
    }
    return canvas;
}

function isDataValid(summaryData) {
    const symbols = Object.keys(summaryData);
    if (symbols.length === 0) {
        console.warn('No symbol data available');
        return false;
    }
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return false;
    }
    
    return true;
}

function createChart(canvas, config) {
    const ctx = canvas.getContext('2d');
    symbolChart = new Chart(ctx, config);
}

export function destroyChart() {
    destroyExistingChart();
}

export function clearChart() {
    const canvas = getChartCanvas();
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    destroyExistingChart();
}
import { updateSymbolChart } from '../chart-manager.js';
import { AnalysisContentGenerator } from './analysis-content.js';
import { StrategyContentGenerator } from './strategy-content.js';

export class TabManager {
    static showTab(tabName) {
        // Ocultar todos los tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
            tab.style.display = 'none';
        });
        document.querySelectorAll('.tab').forEach(tab => 
            tab.classList.remove('active')
        );
        
        // Mostrar el tab seleccionado
        const targetTab = document.getElementById(tabName);
        const targetButton = document.querySelector(`[data-tab="${tabName}"]`);
        
        if (targetTab && targetButton) {
            targetTab.classList.add('active');
            targetTab.style.display = 'block';
            targetButton.classList.add('active');
            
            // Cargar contenido específico según el tab
            this.loadTabContent(tabName);
        }
    }

    static loadTabContent(tabName) {
        switch(tabName) {
            case 'grafico':
                this.loadChartContent();
                break;
            case 'analisis':
                AnalysisContentGenerator.loadContent();
                break;
            case 'estrategias':
                StrategyContentGenerator.loadContent();
                break;
        }
    }

    static loadChartContent() {
        const summaryData = this.getCurrentSummaryData();
        if (summaryData && Object.keys(summaryData).length > 0) {
            setTimeout(() => updateSymbolChart(summaryData), 100);
        }
    }

    static getCurrentSummaryData() {
        const summaryTable = document.querySelector('#symbolSummary tbody');
        if (!summaryTable || summaryTable.children.length === 0) return null;
        
        const summary = {};
        Array.from(summaryTable.children).forEach(row => {
            const cells = row.children;
            const symbol = cells[0].textContent;
            const totalPnL = parseFloat(cells[2].textContent);
            summary[symbol] = { totalPnL };
        });
        
        return summary;
    }
}
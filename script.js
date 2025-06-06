// Datos del CSV
const rawData = `Contracts,Closing Direction,Qty,Entry Price,Exit Price,Closed P&L,Exit Type,Trade Time(UTC+0),Order No.,Create Time
OPUSDT,Close Long,793.7,0.6299,0.6331,2.01880767,Trade,2025-06-05 10:05:40,9871b976,2025-06-05 10:05:40
TRXUSDT,Close Long,1190,0.27301,0.27194,-1.54566602,Trade,2025-06-05 10:05:40,cb74bb46,2025-06-05 10:05:40
XRPUSDT,Close Long,340,2.1998,2.2052,1.206966,Trade,2025-06-05 09:52:54,eadf3cd3,2025-06-05 09:52:54
THETAUSDT,Close Long,660.6,0.7568,0.7586,0.68268788,Trade,2025-06-05 08:55:23,645548d2,2025-06-05 08:55:23
OPUSDT,Close Long,793.6,0.6299,0.6370,5.11229342,Trade,2025-06-05 08:55:20,d06a2193,2025-06-05 08:55:20
MANTAUSDT,Close Long,4149.3,0.2410,0.2450,15.52183597,Trade,2025-06-04 21:55:18,62022390,2025-06-04 21:55:18
OPUSDT,Close Long,1589,0.6292,0.6292,-0.83983102,Trade,2025-06-04 22:27:47,1f82729a,2025-06-04 21:32:55
MANTAUSDT,Close Long,4149.4,0.2410,0.2412,1.40677282,Trade,2025-06-05 05:30:26,32e04bc1,2025-06-04 20:45:48
MANTAUSDT,Close Long,4118.6,0.2429,0.2394,-15.19615493,Trade,2025-06-04 20:22:45,d7f6fb75,2025-06-04 19:58:54
MANTAUSDT,Close Long,5137.7,0.2449,0.2427,-12.33920818,Trade,2025-06-04 19:55:58,aee4aad8,2025-06-04 19:45:59
MANTAUSDT,Close Long,7994.2,0.2502,0.2434,-55.35797785,Trade,2025-06-04 19:15:06,f0e35789,2025-06-04 04:20:19
THETAUSDT,Close Long,160.6,0.7784,0.7802,0.18585068,Trade,2025-06-03 23:24:15,322a6888,2025-06-03 23:24:15
BTCUSDT,Close Long,0.014,105531.00,105687.00,0.94203816,Trade,2025-06-03 22:58:41,dd8c4cad,2025-06-03 22:58:41
THETAUSDT,Close Long,160.5,0.7784,0.7827,0.58681646,Trade,2025-06-03 22:57:39,4f31c35e,2025-06-03 22:57:39
BTCUSDT,Close Long,0.009,105531.00,105535.00,-0.76182948,Trade,2025-06-03 23:19:14,fc71684c,2025-06-03 21:36:35
FORMUSDT,Close Short,84,2.9289,2.9268,-0.02609085,Trade,2025-06-03 19:27:11,8e2aeef8,2025-06-03 19:27:11
BTCUSDT,Close Short,0.024,105861.60,105603.00,4.07483683,Trade,2025-06-03 18:11:29,477af26c,2025-06-03 18:11:29
BTCUSDT,Close Short,0.009,105861.60,105858.60,-0.77330236,Trade,2025-06-03 18:39:23,3437fc6a,2025-06-03 17:05:36
BTCUSDT,Close Short,0.032,106376.10,106044.70,7.74986444,Trade,2025-06-03 16:54:39,48cae183,2025-06-03 16:54:39
BTCUSDT,Close Short,0.032,106428.40,106379.66,-1.30034028,Trade,2025-06-03 16:32:05,2c388830,2025-06-03 16:32:05
FORMUSDT,Close Short,33,2.9660,2.9484,0.49902632,Trade,2025-06-03 15:58:18,e710b477,2025-06-03 15:58:18
THETAUSDT,Close Long,280.8,0.7566,0.7949,10.44601049,Trade,2025-06-03 15:57:38,2418ee19,2025-06-03 15:57:38
XRPUSDT,Close Long,113,2.0945,2.2650,18.94740447,Trade,2025-06-03 15:57:35,6104770e,2025-06-03 15:57:35
XRPUSDT,Close Long,12,2.0945,2.2594,1.94494198,Trade,2025-06-03 15:44:54,80eb0fad,2025-06-03 15:44:54
FORMUSDT,Close Long,2,2.7178,2.8694,0.29850674,Trade,2025-06-03 15:25:04,96104442,2025-06-03 15:25:04
FORMUSDT,Close Long,1,2.7178,2.8209,0.10077375,Trade,2025-06-03 15:23:57,76180b60,2025-06-03 15:23:57
FORMUSDT,Close Long,6,2.7178,2.7501,0.18002088,Trade,2025-06-03 15:17:43,f2a9ddc4,2025-06-03 15:17:43
FORMUSDT,Close Long,27,2.7178,2.7273,0.19475256,Trade,2025-06-03 15:16:39,0a5bb211,2025-06-03 15:16:39
FORMUSDT,Close Long,6,2.6948,2.7283,0.18733378,Trade,2025-06-03 15:12:22,041f49f2,2025-06-03 15:12:22
FORMUSDT,Close Long,34,2.6948,2.7144,0.58915662,Trade,2025-06-03 14:59:43,0d1f2764,2025-06-03 14:59:43
FORMUSDT,Close Long,6,2.6948,2.7000,0.0176051,Trade,2025-06-03 15:14:12,22ea94f7,2025-06-03 14:02:08
HNTUSDT,Close Long,75.68,3.304,3.325,1.24728861,Trade,2025-06-03 02:33:27,44221f97,2025-06-03 02:33:27
BCHUSDT,Close Long,0.15,401.00,405.80,0.67013851,Trade,2025-06-03 02:33:21,e423b16a,2025-06-03 02:33:21
XRPUSDT,Close Long,375,2.0945,2.2048,40.24631473,Trade,2025-06-03 02:33:12,2f0451d7,2025-06-03 02:33:12
THETAUSDT,Close Long,842.4,0.7566,0.8004,35.88031935,Trade,2025-06-03 02:32:39,17e56cdb,2025-06-03 02:32:39
UNIUSDT,Close Long,13,6.196,6.133,-0.9151662,Trade,2025-06-01 09:17:52,2a03dc57,2025-06-01 08:45:15`;

let trades = [];
let symbolSummary = {};
let dailyAnalysis = {};

// Función para parsear CSV con manejo de errores
function parseCSV(csvText) {
    try {
        const lines = csvText.trim().split('\n');
        if (lines.length < 2) throw new Error('CSV vacío o inválido');
        
        const headers = lines[0].split(',');
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length !== headers.length) {
                console.warn(`Línea ${i + 1} tiene un número incorrecto de valores`);
                continue;
            }
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index];
            });
            data.push(row);
        }
        return data;
    } catch (error) {
        console.error('Error al procesar CSV:', error);
        return [];
    }
}

// Función para calcular métricas principales
function calculateMetrics() {
    trades = parseCSV(rawData);
    
    if (trades.length === 0) {
        console.error('No se pudieron cargar los datos');
        return;
    }
    
    // Calcular métricas principales
    const totalPnL = trades.reduce((sum, trade) => sum + parseFloat(trade['Closed P&L']), 0);
    const winningTrades = trades.filter(trade => parseFloat(trade['Closed P&L']) > 0);
    const losingTrades = trades.filter(trade => parseFloat(trade['Closed P&L']) < 0);
    const winRate = (winningTrades.length / trades.length) * 100;
    const avgPnL = totalPnL / trades.length;
    const bestTrade = Math.max(...trades.map(trade => parseFloat(trade['Closed P&L'])));
    const worstTrade = Math.min(...trades.map(trade => parseFloat(trade['Closed P&L'])));

    // Actualizar métricas en el DOM
    document.getElementById('totalPnL').textContent = `$${totalPnL.toFixed(2)}`;
    document.getElementById('totalPnL').className = `metric-value ${totalPnL >= 0 ? 'positive' : 'negative'}`;
    
    document.getElementById('winRate').textContent = `${winRate.toFixed(1)}%`;
    document.getElementById('totalTrades').textContent = trades.length;
    document.getElementById('avgPnL').textContent = `$${avgPnL.toFixed(2)}`;
    document.getElementById('avgPnL').className = `metric-value ${avgPnL >= 0 ? 'positive' : 'negative'}`;
    
    document.getElementById('bestTrade').textContent = `$${bestTrade.toFixed(2)}`;
    document.getElementById('bestTrade').className = 'metric-value positive';
    
    document.getElementById('worstTrade').textContent = `$${worstTrade.toFixed(2)}`;
    document.getElementById('worstTrade').className = 'metric-value negative';

    // Calcular resumen por símbolo
    calculateSymbolSummary();
    
    // Calcular análisis avanzado
    calculateAdvancedMetrics();
    
    // Calcular análisis diario
    calculateDailyAnalysis();
    
    // Poblar tabla de operaciones
    populateTradesTable();
    
    // Generar recomendaciones
    generateRecommendations();
}

// Función para calcular resumen por símbolo
function calculateSymbolSummary() {
    symbolSummary = {};
    
    trades.forEach(trade => {
        const symbol = trade.Contracts;
        const pnl = parseFloat(trade['Closed P&L']);
        
        if (!symbolSummary[symbol]) {
            symbolSummary[symbol] = {
                trades: 0,
                totalPnL: 0,
                wins: 0,
                losses: 0,
                bestTrade: -Infinity,
                worstTrade: Infinity
            };
        }
        
        symbolSummary[symbol].trades++;
        symbolSummary[symbol].totalPnL += pnl;
        
        if (pnl > 0) {
            symbolSummary[symbol].wins++;
        } else if (pnl < 0) {
            symbolSummary[symbol].losses++;
        }
        
        symbolSummary[symbol].bestTrade = Math.max(symbolSummary[symbol].bestTrade, pnl);
        symbolSummary[symbol].worstTrade = Math.min(symbolSummary[symbol].worstTrade, pnl);
    });

    // Actualizar tabla de resumen por símbolo
    const tbody = document.querySelector('#symbolSummary tbody');
    tbody.innerHTML = '';
    
    Object.entries(symbolSummary).forEach(([symbol, data]) => {
        const row = tbody.insertRow();
        const winRate = (data.wins / data.trades) * 100;
        const avgPnL = data.totalPnL / data.trades;
        
        row.innerHTML = `
            <td><strong>${symbol}</strong></td>
            <td>${data.trades}</td>
            <td class="${data.totalPnL >= 0 ? 'positive' : 'negative'}">$${data.totalPnL.toFixed(2)}</td>
            <td class="${avgPnL >= 0 ? 'positive' : 'negative'}">$${avgPnL.toFixed(2)}</td>
            <td>${winRate.toFixed(1)}%</td>
            <td class="positive">$${data.bestTrade.toFixed(2)}</td>
            <td class="negative">$${data.worstTrade.toFixed(2)}</td>
        `;
    });
}

// Función para calcular métricas avanzadas
function calculateAdvancedMetrics() {
    const pnlValues = trades.map(trade => parseFloat(trade['Closed P&L']));
    const winningTrades = pnlValues.filter(pnl => pnl > 0);
    const losingTrades = pnlValues.filter(pnl => pnl < 0);
    
    // Calcular drawdown máximo
    let cumulativePnL = 0;
    let maxCumulative = 0;
    let maxDrawdown = 0;
    
    pnlValues.forEach(pnl => {
        cumulativePnL += pnl;
        maxCumulative = Math.max(maxCumulative, cumulativePnL);
        const drawdown = maxCumulative > 0 ? ((maxCumulative - cumulativePnL) / maxCumulative) * 100 : 0;
        maxDrawdown = Math.max(maxDrawdown, drawdown);
    });

    // Factor de beneficio
    const totalWins = winningTrades.reduce((sum, win) => sum + win, 0);
    const totalLosses = Math.abs(losingTrades.reduce((sum, loss) => sum + loss, 0));
    const profitFactor = totalLosses > 0 ? totalWins / totalLosses : 0;

    // Promedio de ganancias y pérdidas
    const avgWin = winningTrades.length > 0 ? totalWins / winningTrades.length : 0;
    const avgLoss = losingTrades.length > 0 ? totalLosses / losingTrades.length : 0;
    
    // Ratio riesgo/beneficio
    const riskReward = avgLoss > 0 ? avgWin / avgLoss : 0;

    // Ratio Sharpe simplificado
    const avgReturn = pnlValues.reduce((sum, pnl) => sum + pnl, 0) / pnlValues.length;
    const variance = pnlValues.reduce((sum, pnl) => sum + Math.pow(pnl - avgReturn, 2), 0) / pnlValues.length;
    const stdDev = Math.sqrt(variance);
    const sharpeRatio = stdDev > 0 ? avgReturn / stdDev : 0;

    // Actualizar métricas avanzadas en el DOM
    document.getElementById('maxDrawdown').textContent = `${maxDrawdown.toFixed(2)}%`;
    document.getElementById('maxDrawdown').className = 'metric-value negative';
    
    document.getElementById('sharpeRatio').textContent = sharpeRatio.toFixed(2);
    document.getElementById('sharpeRatio').className = `metric-value ${sharpeRatio >= 0 ? 'positive' : 'negative'}`;
    
    document.getElementById('profitFactor').textContent = profitFactor.toFixed(2);
    document.getElementById('profitFactor').className = `metric-value ${profitFactor >= 1 ? 'positive' : 'negative'}`;
    
    document.getElementById('avgWin').textContent = `$${avgWin.toFixed(2)}`;
    document.getElementById('avgWin').className = 'metric-value positive';
    
    document.getElementById('avgLoss').textContent = `$${avgLoss.toFixed(2)}`;
    document.getElementById('avgLoss').className = 'metric-value negative';
    
    document.getElementById('riskReward').textContent = riskReward.toFixed(2);
    document.getElementById('riskReward').className = `metric-value ${riskReward >= 1 ? 'positive' : 'negative'}`;
}

// Función para calcular análisis diario
function calculateDailyAnalysis() {
    dailyAnalysis = {};
    
    trades.forEach(trade => {
        const date = trade['Trade Time(UTC+0)'].split(' ')[0];
        const pnl = parseFloat(trade['Closed P&L']);
        
        if (!dailyAnalysis[date]) {
            dailyAnalysis[date] = {
                trades: 0,
                totalPnL: 0,
                wins: 0,
                losses: 0
            };
        }
        
        dailyAnalysis[date].trades++;
        dailyAnalysis[date].totalPnL += pnl;
        
        if (pnl > 0) {
            dailyAnalysis[date].wins++;
        } else if (pnl < 0) {
            dailyAnalysis[date].losses++;
        }
    });

    // Actualizar tabla de análisis diario
    const tbody = document.querySelector('#dailyAnalysis tbody');
    tbody.innerHTML = '';
    
    let cumulativePnL = 0;
    const sortedDates = Object.keys(dailyAnalysis).sort();
    
    sortedDates.forEach(date => {
        const data = dailyAnalysis[date];
        cumulativePnL += data.totalPnL;
        const winRate = (data.wins / data.trades) * 100;
        
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${date}</td>
            <td>${data.trades}</td>
            <td class="${data.totalPnL >= 0 ? 'positive' : 'negative'}">$${data.totalPnL.toFixed(2)}</td>
            <td class="${cumulativePnL >= 0 ? 'positive' : 'negative'}">$${cumulativePnL.toFixed(2)}</td>
            <td>${winRate.toFixed(1)}%</td>
        `;
    });
}

// Función para poblar la tabla de operaciones
function populateTradesTable() {
    const tbody = document.querySelector('#allTrades tbody');
    tbody.innerHTML = '';
    
    trades.forEach(trade => {
        const row = tbody.insertRow();
        const pnl = parseFloat(trade['Closed P&L']);
        const entryPrice = parseFloat(trade['Entry Price']);
        const exitPrice = parseFloat(trade['Exit Price']);
        const qty = parseFloat(trade.Qty);
        
        // Calcular rendimiento porcentual
        const returnPct = ((exitPrice - entryPrice) / entryPrice) * 100;
        const direction = trade['Closing Direction'].includes('Long') ? 'Long' : 'Short';
        
        row.innerHTML = `
            <td>${trade['Trade Time(UTC+0)'].split(' ')[0]}</td>
            <td><strong>${trade.Contracts}</strong></td>
            <td>${direction}</td>
            <td>${qty.toFixed(2)}</td>
            <td>$${entryPrice.toFixed(4)}</td>
            <td>$${exitPrice.toFixed(4)}</td>
            <td class="${pnl >= 0 ? 'positive' : 'negative'}">$${pnl.toFixed(2)}</td>
            <td class="${returnPct >= 0 ? 'positive' : 'negative'}">${returnPct.toFixed(2)}%</td>
        `;
    });
}

// Función para generar recomendaciones
function generateRecommendations() {
    const recommendations = [];
    const totalPnL = trades.reduce((sum, trade) => sum + parseFloat(trade['Closed P&L']), 0);
    const winRate = (trades.filter(trade => parseFloat(trade['Closed P&L']) > 0).length / trades.length) * 100;
    
    // Análisis de rendimiento general
    if (totalPnL > 0) {
        recommendations.push(`✅ Rendimiento positivo de $${totalPnL.toFixed(2)} - Mantener estrategia actual`);
    } else {
        recommendations.push(`⚠️ Rendimiento negativo de $${totalPnL.toFixed(2)} - Revisar estrategia de entrada y salida`);
    }
    
    // Análisis de tasa de éxito
    if (winRate > 60) {
        recommendations.push(`✅ Excelente tasa de éxito del ${winRate.toFixed(1)}% - Considerar aumentar tamaño de posición`);
    } else if (winRate > 40) {
        recommendations.push(`📊 Tasa de éxito moderada del ${winRate.toFixed(1)}% - Optimizar puntos de entrada`);
    } else {
        recommendations.push(`❌ Baja tasa de éxito del ${winRate.toFixed(1)}% - Revisar criterios de selección de operaciones`);
    }
    
    // Análisis por símbolo
    const bestSymbol = Object.entries(symbolSummary).reduce((best, [symbol, data]) => 
        data.totalPnL > (best.data?.totalPnL || -Infinity) ? {symbol, data} : best, {});
    
    if (bestSymbol.symbol) {
        recommendations.push(`🎯 ${bestSymbol.symbol} es tu mejor activo con $${bestSymbol.data.totalPnL.toFixed(2)} - Considerar aumentar exposición`);
    }
    
    const worstSymbol = Object.entries(symbolSummary).reduce((worst, [symbol, data]) => 
        data.totalPnL < (worst.data?.totalPnL || Infinity) ? {symbol, data} : worst, {});
    
    if (worstSymbol.symbol && worstSymbol.data.totalPnL < 0) {
        recommendations.push(`🔍 ${worstSymbol.symbol} genera pérdidas de $${Math.abs(worstSymbol.data.totalPnL).toFixed(2)} - Revisar estrategia o evitar temporalmente`);
    }
    
    // Análisis de gestión de riesgo
    const avgWin = trades.filter(t => parseFloat(t['Closed P&L']) > 0)
        .reduce((sum, t) => sum + parseFloat(t['Closed P&L']), 0) / 
        trades.filter(t => parseFloat(t['Closed P&L']) > 0).length;
    
    const avgLoss = Math.abs(trades.filter(t => parseFloat(t['Closed P&L']) < 0)
        .reduce((sum, t) => sum + parseFloat(t['Closed P&L']), 0)) / 
        trades.filter(t => parseFloat(t['Closed P&L']) < 0).length;
    
    const riskReward = avgLoss > 0 ? avgWin / avgLoss : 0;
    
    if (riskReward > 2) {
        recommendations.push(`✅ Excelente ratio riesgo/beneficio de ${riskReward.toFixed(2)} - Mantener disciplina actual`);
    } else if (riskReward > 1) {
        recommendations.push(`📊 Ratio riesgo/beneficio aceptable de ${riskReward.toFixed(2)} - Considerar optimizar stop-loss`);
    } else {
        recommendations.push(`⚠️ Ratio riesgo/beneficio bajo de ${riskReward.toFixed(2)} - Revisar estrategia de stop-loss y take-profit`);
    }
    
    // Actualizar recomendaciones en el DOM
    const recommendationsList = document.getElementById('strategicRecommendations');
    recommendationsList.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');
    
    // Actualizar tabla de análisis de riesgo
    updateRiskAnalysisTable(winRate, riskReward, totalPnL);
}

// Función para actualizar tabla de análisis de riesgo
function updateRiskAnalysisTable(winRate, riskReward, totalPnL) {
    const tbody = document.querySelector('#riskAnalysis tbody');
    tbody.innerHTML = '';
    
    const riskMetrics = [
        {
            metric: 'Tasa de Éxito',
            current: `${winRate.toFixed(1)}%`,
            recommended: '> 50%',
            status: winRate > 50 ? '✅ Bueno' : '⚠️ Mejorar',
            action: winRate > 50 ? 'Mantener' : 'Optimizar entradas'
        },
        {
            metric: 'Ratio Riesgo/Beneficio',
            current: riskReward.toFixed(2),
            recommended: '> 1.5',
            status: riskReward > 1.5 ? '✅ Bueno' : '⚠️ Mejorar',
            action: riskReward > 1.5 ? 'Mantener' : 'Ajustar SL/TP'
        },
        {
            metric: 'P&L Total',
            current: `$${totalPnL.toFixed(2)}`,
            recommended: '> $0',
            status: totalPnL > 0 ? '✅ Positivo' : '❌ Negativo',
            action: totalPnL > 0 ? 'Continuar' : 'Revisar estrategia'
        }
    ];
    
    riskMetrics.forEach(metric => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td><strong>${metric.metric}</strong></td>
            <td>${metric.current}</td>
            <td>${metric.recommended}</td>
            <td>${metric.status}</td>
            <td>${metric.action}</td>
        `;
    });
}

// Función para cambiar tabs
function showTab(tabName) {
    // Ocultar todos los contenidos de tab
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remover clase active de todos los tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Mostrar el contenido seleccionado
    document.getElementById(tabName).classList.add('active');
    
    // Activar el tab seleccionado
    event.target.classList.add('active');
}

// Función para descargar Excel
function downloadExcel() {
    try {
        // Crear un nuevo workbook
        const wb = XLSX.utils.book_new();
        
        // Hoja 1: Resumen general
        const summaryData = [
            ['Métrica', 'Valor'],
            ['P&L Total', `$${trades.reduce((sum, trade) => sum + parseFloat(trade['Closed P&L']), 0).toFixed(2)}`],
            ['Total Operaciones', trades.length],
            ['Tasa de Éxito', `${((trades.filter(trade => parseFloat(trade['Closed P&L']) > 0).length / trades.length) * 100).toFixed(1)}%`],
            ['Mejor Operación', `$${Math.max(...trades.map(trade => parseFloat(trade['Closed P&L']))).toFixed(2)}`],
            ['Peor Operación', `$${Math.min(...trades.map(trade => parseFloat(trade['Closed P&L']))).toFixed(2)}`]
        ];
        
        const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
        XLSX.utils.book_append_sheet(wb, summaryWs, 'Resumen');
        
        // Hoja 2: Todas las operaciones
        const tradesWs = XLSX.utils.json_to_sheet(trades);
        XLSX.utils.book_append_sheet(wb, tradesWs, 'Operaciones');
        
        // Hoja 3: Resumen por símbolo
        const symbolData = Object.entries(symbolSummary).map(([symbol, data]) => ({
            Símbolo: symbol,
            Operaciones: data.trades,
            'P&L Total': data.totalPnL.toFixed(2),
            'P&L Promedio': (data.totalPnL / data.trades).toFixed(2),
            'Tasa Éxito %': ((data.wins / data.trades) * 100).toFixed(1),
            'Mejor Operación': data.bestTrade.toFixed(2),
      'Peor Operación': data.worstTrade.toFixed(2)
        }));
        
        const symbolWs = XLSX.utils.json_to_sheet(symbolData);
        XLSX.utils.book_append_sheet(wb, symbolWs, 'Resumen por Símbolo');
        
        // Hoja 4: Análisis diario
        const dailyData = Object.entries(dailyAnalysis).map(([date, data]) => ({
            Fecha: date,
            Operaciones: data.trades,
            'P&L Diario': data.totalPnL.toFixed(2),
            'Tasa Éxito %': ((data.wins / data.trades) * 100).toFixed(1)
        }));
        
        const dailyWs = XLSX.utils.json_to_sheet(dailyData);
        XLSX.utils.book_append_sheet(wb, dailyWs, 'Análisis Diario');
        
        // Hoja 5: Métricas avanzadas
        const pnlValues = trades.map(trade => parseFloat(trade['Closed P&L']));
        const winningTrades = pnlValues.filter(pnl => pnl > 0);
        const losingTrades = pnlValues.filter(pnl => pnl < 0);
        
        const totalWins = winningTrades.reduce((sum, win) => sum + win, 0);
        const totalLosses = Math.abs(losingTrades.reduce((sum, loss) => sum + loss, 0));
        const avgWin = winningTrades.length > 0 ? totalWins / winningTrades.length : 0;
        const avgLoss = losingTrades.length > 0 ? totalLosses / losingTrades.length : 0;
        const profitFactor = totalLosses > 0 ? totalWins / totalLosses : 0;
        const riskReward = avgLoss > 0 ? avgWin / avgLoss : 0;
        
        // Calcular drawdown máximo
        let cumulativePnL = 0;
        let maxCumulative = 0;
        let maxDrawdown = 0;
        
        pnlValues.forEach(pnl => {
            cumulativePnL += pnl;
            maxCumulative = Math.max(maxCumulative, cumulativePnL);
            const drawdown = maxCumulative > 0 ? ((maxCumulative - cumulativePnL) / maxCumulative) * 100 : 0;
            maxDrawdown = Math.max(maxDrawdown, drawdown);
        });
        
        const advancedData = [
            ['Métrica Avanzada', 'Valor'],
            ['Drawdown Máximo', `${maxDrawdown.toFixed(2)}%`],
            ['Factor de Beneficio', profitFactor.toFixed(2)],
            ['Ganancia Promedio', `$${avgWin.toFixed(2)}`],
            ['Pérdida Promedio', `$${avgLoss.toFixed(2)}`],
            ['Ratio Riesgo/Beneficio', riskReward.toFixed(2)],
            ['Total Operaciones Ganadoras', winningTrades.length],
            ['Total Operaciones Perdedoras', losingTrades.length],
            ['Beneficio Total de Ganadoras', `$${totalWins.toFixed(2)}`],
            ['Pérdida Total de Perdedoras', `$${totalLosses.toFixed(2)}`]
        ];
        
        const advancedWs = XLSX.utils.aoa_to_sheet(advancedData);
        XLSX.utils.book_append_sheet(wb, advancedWs, 'Métricas Avanzadas');
        
        // Hoja 6: Recomendaciones estratégicas
        const recommendations = document.querySelectorAll('#strategicRecommendations li');
        const recommendationData = [['Recomendaciones Estratégicas']];
        recommendations.forEach((rec, index) => {
            recommendationData.push([`${index + 1}. ${rec.textContent}`]);
        });
        
        const recommendationWs = XLSX.utils.aoa_to_sheet(recommendationData);
        XLSX.utils.book_append_sheet(wb, recommendationWs, 'Recomendaciones');
        
        // Generar y descargar el archivo
        const fileName = `Analisis_Trading_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
        
        // Mostrar mensaje de éxito
        showNotification('✅ Archivo Excel descargado exitosamente', 'success');
        
    } catch (error) {
        console.error('Error al generar Excel:', error);
        showNotification('❌ Error al generar el archivo Excel', 'error');
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Colores según el tipo
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        case 'warning':
            notification.style.background = '#f59e0b';
            break;
        default:
            notification.style.background = '#6366f1';
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar animación
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Función para formatear números con separadores de miles
function formatNumber(num, decimals = 2) {
    return new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num);
}

// Función para formatear moneda
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
    }).format(amount);
}

// Función para calcular correlaciones entre símbolos
function calculateSymbolCorrelations() {
    const correlations = {};
    const symbols = Object.keys(symbolSummary);
    
    // Agrupar operaciones por fecha y símbolo
    const dailyReturns = {};
    
    trades.forEach(trade => {
        const date = trade['Trade Time(UTC+0)'].split(' ')[0];
        const symbol = trade.Contracts;
        const entryPrice = parseFloat(trade['Entry Price']);
        const exitPrice = parseFloat(trade['Exit Price']);
        const returnPct = ((exitPrice - entryPrice) / entryPrice) * 100;
        
        if (!dailyReturns[date]) {
            dailyReturns[date] = {};
        }
        
        if (!dailyReturns[date][symbol]) {
            dailyReturns[date][symbol] = [];
        }
        
        dailyReturns[date][symbol].push(returnPct);
    });
    
    // Calcular rendimientos promedio diarios por símbolo
    const symbolDailyReturns = {};
    Object.keys(dailyReturns).forEach(date => {
        Object.keys(dailyReturns[date]).forEach(symbol => {
            if (!symbolDailyReturns[symbol]) {
                symbolDailyReturns[symbol] = [];
            }
            const avgReturn = dailyReturns[date][symbol].reduce((sum, ret) => sum + ret, 0) / dailyReturns[date][symbol].length;
            symbolDailyReturns[symbol].push(avgReturn);
        });
    });
    
    return symbolDailyReturns;
}

// Función para calcular estadísticas de volatilidad
function calculateVolatilityStats() {
    const volatilityStats = {};
    
    Object.entries(symbolSummary).forEach(([symbol, data]) => {
        const symbolTrades = trades.filter(trade => trade.Contracts === symbol);
        const returns = symbolTrades.map(trade => {
            const entryPrice = parseFloat(trade['Entry Price']);
            const exitPrice = parseFloat(trade['Exit Price']);
            return ((exitPrice - entryPrice) / entryPrice) * 100;
        });
        
        if (returns.length > 1) {
            const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
            const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / (returns.length - 1);
            const volatility = Math.sqrt(variance);
            
            volatilityStats[symbol] = {
                volatility: volatility.toFixed(2),
                avgReturn: avgReturn.toFixed(2),
                trades: returns.length
            };
        }
    });
    
    return volatilityStats;
}

// Función para exportar datos como JSON
function exportAsJSON() {
    const exportData = {
        summary: {
            totalPnL: trades.reduce((sum, trade) => sum + parseFloat(trade['Closed P&L']), 0),
            totalTrades: trades.length,
            winRate: (trades.filter(trade => parseFloat(trade['Closed P&L']) > 0).length / trades.length) * 100,
            bestTrade: Math.max(...trades.map(trade => parseFloat(trade['Closed P&L']))),
            worstTrade: Math.min(...trades.map(trade => parseFloat(trade['Closed P&L'])))
        },
        trades: trades,
        symbolSummary: symbolSummary,
        dailyAnalysis: dailyAnalysis,
        volatilityStats: calculateVolatilityStats(),
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `trading_analysis_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('📄 Datos exportados como JSON', 'success');
}

// Función para resetear y recargar datos
function resetData() {
    trades = [];
    symbolSummary = {};
    dailyAnalysis = {};
    
    // Limpiar todas las tablas
    document.querySelector('#symbolSummary tbody').innerHTML = '';
    document.querySelector('#allTrades tbody').innerHTML = '';
    document.querySelector('#dailyAnalysis tbody').innerHTML = '';
    document.querySelector('#riskAnalysis tbody').innerHTML = '';
    
    // Resetear métricas
    const metrics = ['totalPnL', 'winRate', 'totalTrades', 'avgPnL', 'bestTrade', 'worstTrade', 
                    'maxDrawdown', 'sharpeRatio', 'profitFactor', 'avgWin', 'avgLoss', 'riskReward'];
    
    metrics.forEach(metric => {
        const element = document.getElementById(metric);
        if (element) {
            element.textContent = metric.includes('Rate') || metric.includes('Drawdown') ? '0%' : 
                                 metric.includes('Ratio') || metric === 'profitFactor' || metric === 'riskReward' ? '0.00' : '$0.00';
            element.className = 'metric-value';
        }
    });
    
    document.getElementById('strategicRecommendations').innerHTML = '<li>No hay datos para analizar</li>';
    
    showNotification('🔄 Datos reseteados', 'info');
}

// Función para validar datos antes del análisis
function validateData() {
    if (!trades || trades.length === 0) {
        showNotification('⚠️ No hay datos de trading para analizar', 'warning');
        return false;
    }
    
    const invalidTrades = trades.filter(trade => 
        !trade['Closed P&L'] || 
        !trade['Entry Price'] || 
        !trade['Exit Price'] || 
        !trade.Contracts ||
        isNaN(parseFloat(trade['Closed P&L']))
    );
    
    if (invalidTrades.length > 0) {
        showNotification(`⚠️ Se encontraron ${invalidTrades.length} operaciones con datos inválidos`, 'warning');
        console.warn('Operaciones inválidas:', invalidTrades);
    }
    
    return true;
}

// Función para manejar errores globales
function handleError(error, context = 'Aplicación') {
    console.error(`Error en ${context}:`, error);
    showNotification(`❌ Error en ${context}: ${error.message}`, 'error');
}

// Event listeners y inicialización
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Mostrar mensaje de carga
        showNotification('📊 Cargando análisis de trading...', 'info');
        
        // Validar y calcular métricas
        if (validateData()) {
            calculateMetrics();
            showNotification('✅ Análisis completado exitosamente', 'success');
        }
        
        // Agregar event listeners para funcionalidades adicionales
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + E para exportar Excel
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                downloadExcel();
            }
            
            // Ctrl/Cmd + J para exportar JSON
            if ((e.ctrlKey || e.metaKey) && e.key === 'j') {
                e.preventDefault();
                exportAsJSON();
            }
            
            // Ctrl/Cmd + R para resetear (prevenir recarga de página)
            if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
                e.preventDefault();
                resetData();
                calculateMetrics();
            }
        });
        
    } catch (error) {
        handleError(error, 'Inicialización');
    }
});

// Exponer funciones globales necesarias
window.showTab = showTab;
window.downloadExcel = downloadExcel;
window.exportAsJSON = exportAsJSON;
window.resetData = resetData;
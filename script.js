document.addEventListener('DOMContentLoaded', () => {

    const EXCHANGES = {
        zoomex: {
            name: 'ZoomEx',
            columns: ['Side', 'Quantity', 'Avg. Entry Price', 'Avg. Exit Price', 'Realised P&L', 'Created Time']
        },
        libertex: {
            name: 'Libertex',
            // Nombres de columna como aparecen en la fila 5 del archivo
            columns: ['Instrumento', 'Dirección', 'Monto ($)', 'Precio de apertura', 'Precio de cierre', 'Fecha de cierre', 'Beneficio ($)']
        },
        bitget: {
            name: 'Bitget',
            columns: ['side', 'dealAvgPrice', 'pnl', 'size', 'openPrice', 'closePrice', 'ctime']
        }
    };

    // --- Estado y DOM Elements (sin cambios) ---
    let selectedExchange = null;
    const uploadBtn = document.getElementById('uploadButton');
    const fileInput = document.getElementById('csvFile');
    const exchangeModal = document.getElementById('exchangeModal');
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    const errorModalCloseBtn = document.getElementById('errorModalCloseBtn');
    let symbolChart = null; // Variable para la instancia del gráfico

    // --- Event Listeners (sin cambios) ---
    uploadBtn.addEventListener('click', () => exchangeModal.style.display = 'block');
    document.querySelectorAll('.exchange-option').forEach(option => {
        option.addEventListener('click', () => {
            selectedExchange = option.dataset.exchange;
            exchangeModal.style.display = 'none';
            fileInput.click();
        });
    });
    fileInput.addEventListener('change', handleFileSelect);
    errorModalCloseBtn.addEventListener('click', () => errorModal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === exchangeModal) exchangeModal.style.display = 'none';
        if (e.target === errorModal) errorModal.style.display = 'none';
    });

    // --- Lógica Principal ---
    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            let fileContent = e.target.result;
            
            // Pre-procesamiento especial para Libertex
            if (selectedExchange === 'libertex') {
                fileContent = preprocessLibertexText(fileContent);
            }

            Papa.parse(fileContent, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    // PapaParse puede generar un último objeto vacío si hay una línea en blanco al final
                    const cleanData = results.data.filter(row => Object.values(row).some(val => val !== ''));
                    processCSVData(cleanData, results.meta.fields);
                },
                error: (err) => showError(`Error al parsear el archivo: ${err.message}`)
            });
        };
        reader.readAsText(file);
        fileInput.value = '';
    }

    function preprocessLibertexText(text) {
        const lines = text.split('\n');
        let dataStarted = false;
        const processedLines = [];

        // Encuentra la línea de encabezado y la procesa
        const headerLineIndex = lines.findIndex(line => line.trim().startsWith('Instrumento'));
        if (headerLineIndex === -1) {
            throw new Error('No se encontró la fila de encabezado "Instrumento".');
        }
        
        const header = lines[headerLineIndex].trim().replace(/\s{2,}/g, ',');
        processedLines.push(header);

        // Procesa las líneas de datos
        for (let i = headerLineIndex + 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.length === 0 || line.startsWith('Total:') || line.startsWith('Póngalo claro')) continue;
            
            // Reemplaza 2 o más espacios con una coma
            const csvLine = line.replace(/\s{2,}/g, ',');
            processedLines.push(csvLine);
        }

        return processedLines.join('\n');
    }

    function validateHeaders(headers) {
        const required = EXCHANGES[selectedExchange].columns;
        const fileHeaders = headers.map(h => h.trim().toLowerCase());

        const missing = required.filter(col => !fileHeaders.includes(col.toLowerCase()));

        if (missing.length > 0) {
            showError(`El archivo no es válido para ${EXCHANGES[selectedExchange].name}.\n\nFaltan las columnas: ${missing.join(', ')}`);
            return false;
        }
        return true;
    }

    function standardizeTrade(row, exchange) {
        try {
            if (exchange === 'libertex') {
                // Asegúrate de que los nombres de las propiedades coincidan con los encabezados del CSV pre-procesado
                const pnl = parseFloat(row['Beneficio ($)'].replace(',', '.')) || 0;
                return {
                    symbol: row['Instrumento'].split('-')[0].trim(),
                    direction: row['Dirección'],
                    quantity: parseFloat(row['Monto ($)'].replace(',', '.')) || 0,
                    entryPrice: parseFloat(row['Precio de apertura'].replace(',', '.')) || 0,
                    exitPrice: parseFloat(row['Precio de cierre'].replace(',', '.')) || 0,
                    pnl: pnl,
                    timestamp: row['Fecha de cierre']
                };
            }
            // Aquí puedes añadir la lógica para 'zoomex' y 'bitget' cuando estés listo
            if (exchange === 'zoomex') {
                // Lógica de ejemplo para ZoomEx
                return { /* ... datos estandarizados para zoomex ... */ };
            }
            if (exchange === 'bitget') {
                // Lógica de ejemplo para Bitget
                return { /* ... datos estandarizados para bitget ... */ };
            }
        } catch (e) {
            console.error('Error standardizing trade:', row, e);
            // Devuelve un objeto vacío o nulo para que pueda ser filtrado más tarde
            return null;
        }
        return null;
    }

    function processCSVData(data, headers) {
        if (!selectedExchange) return showError('No se ha seleccionado exchange.');
        if (!validateHeaders(headers)) return;

        try {
            const trades = data.map(row => standardizeTrade(row, selectedExchange)).filter(t => t !== null);
            if(data.length > 0 && trades.length === 0) {
                showError('Se procesaron los datos pero no se pudo estandarizar ninguna operación. Revisa la consola para más detalles.');
                return;
            }
            updateUI(trades);
        } catch (error) {
            showError(`Error al procesar los datos: ${error.message}`);
        }
    }

    function updateUI(trades) {
        if (trades.length === 0) return;

        // Cálculos básicos
        const totalTrades = trades.length;
        const winningTrades = trades.filter(t => t.pnl > 0);
        const losingTrades = trades.filter(t => t.pnl <= 0);
        const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
        const winRate = totalTrades > 0 ? (winningTrades.length / totalTrades) * 100 : 0;

        // Cálculos avanzados
        const grossProfit = winningTrades.reduce((sum, t) => sum + t.pnl, 0);
        const grossLoss = Math.abs(losingTrades.reduce((sum, t) => sum + t.pnl, 0));
        const profitFactor = grossLoss > 0 ? (grossProfit / grossLoss) : Infinity;
        const bestTrade = Math.max(...trades.map(t => t.pnl));
        const worstTrade = Math.min(...trades.map(t => t.pnl));

        // Actualizar tarjetas de métricas
        document.getElementById('totalPnL').textContent = `$${totalPnL.toFixed(2)}`;
        document.getElementById('winRate').textContent = `${winRate.toFixed(1)}%`;
        document.getElementById('totalTrades').textContent = totalTrades;
        document.getElementById('winningTrades').textContent = winningTrades.length;
        document.getElementById('losingTrades').textContent = losingTrades.length;
        document.getElementById('bestTrade').textContent = `$${bestTrade.toFixed(2)}`;
        document.getElementById('worstTrade').textContent = `$${worstTrade.toFixed(2)}`;
        document.getElementById('profitFactor').textContent = profitFactor.toFixed(2);

        // Llenar la tabla de resumen por símbolo
        updateSymbolSummary(trades);

        // Llenar la tabla de operaciones (sin cambios)
        const allTradesBody = document.querySelector('#allTrades tbody');
        allTradesBody.innerHTML = ''; // Limpiar tabla
        trades.forEach(trade => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${trade.symbol}</td>
                <td>${trade.direction}</td>
                <td>${trade.quantity.toFixed(2)}</td>
                <td>${trade.entryPrice.toFixed(4)}</td>
                <td>${trade.exitPrice.toFixed(4)}</td>
                <td class="${trade.pnl >= 0 ? 'positive' : 'negative'}">${trade.pnl.toFixed(2)}</td>
                <td>${trade.timestamp}</td>
            `;
            allTradesBody.appendChild(row);
        });
    }

    function updateSymbolSummary(trades) {
        const summary = {}; // Objeto para agrupar trades por símbolo

        trades.forEach(trade => {
            if (!summary[trade.symbol]) {
                summary[trade.symbol] = { trades: [], pnl: 0, wins: 0 };
            }
            summary[trade.symbol].trades.push(trade);
            summary[trade.symbol].pnl += trade.pnl;
            if (trade.pnl > 0) summary[trade.symbol].wins++;
        });

        const summaryBody = document.querySelector('#symbolSummary tbody');
        summaryBody.innerHTML = '';

        for (const symbol in summary) {
            const data = summary[symbol];
            const total = data.trades.length;
            const winRate = total > 0 ? (data.wins / total) * 100 : 0;
            const best = Math.max(...data.trades.map(t => t.pnl));
            const worst = Math.min(...data.trades.map(t => t.pnl));

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${symbol}</td>
                <td>${total}</td>
                <td class="${data.pnl >= 0 ? 'positive' : 'negative'}">${data.pnl.toFixed(2)}</td>
                <td>${(data.pnl / total).toFixed(2)}</td>
                <td>${winRate.toFixed(1)}%</td>
                <td class="positive">${best.toFixed(2)}</td>
                <td class="negative">${worst.toFixed(2)}</td>
            `;
            summaryBody.appendChild(row);
        }
        return summary; // Devolver los datos para la gráfica
    }

    function updateSymbolChart(summaryData) {
        const ctx = document.getElementById('symbolPnlChart').getContext('2d');
        const labels = Object.keys(summaryData);
        const data = labels.map(label => summaryData[label].pnl);

        // Destruir la instancia anterior si existe
        if (symbolChart) {
            symbolChart.destroy();
        }

        symbolChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'P&L por Símbolo',
                    data: data,
                    backgroundColor: [
                        '#ec4d58', '#4ade80', '#3b82f6', '#f97316', 
                        '#a855f7', '#facc15', '#22d3ee', '#d946ef'
                    ],
                    borderColor: '#1e1e1e',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#fafafa'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const symbolData = summaryData[label];
                                const numTrades = symbolData ? symbolData.trades.length : 0;
                                return `${label}: $${value.toFixed(2)} (${numTrades} trades)`;
                            }
                        }
                    }
                }
            }
        });
    }

    function showError(message) {
        errorMessage.innerText = message;
        errorModal.style.display = 'block';
    }
});

function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`.tab[onclick="showTab('${tabName}')"]`).classList.add('active');
}
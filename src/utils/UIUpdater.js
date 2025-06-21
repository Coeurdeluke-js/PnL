export class UIUpdater {
    updateUI(trades) {
        this.showDashboard();
        this.updateMetrics(trades);
        this.updateTables(trades);
        this.updateChart(trades);
    }

    showDashboard() {
        const heroSection = document.querySelector('.hero-section');
        const dashboard = document.getElementById('dashboard');
        
        if (heroSection) heroSection.style.display = 'none';
        if (dashboard) dashboard.style.display = 'block';
    }

    updateMetrics(trades) {
        console.log('🔄 Actualizando métricas con trades:', trades);
        
        const totalPnl = trades.reduce((sum, trade) => {
            const pnl = parseFloat(trade.pnl) || 0;
            console.log('Trade PnL:', pnl, 'from:', trade.pnl);
            return sum + pnl;
        }, 0);
        
        const winningTrades = trades.filter(trade => (parseFloat(trade.pnl) || 0) > 0);
        const losingTrades = trades.filter(trade => (parseFloat(trade.pnl) || 0) < 0);
        const totalTrades = trades.length;
        const winRate = totalTrades > 0 ? (winningTrades.length / totalTrades * 100) : 0;

        // Actualizar elementos con verificación de existencia
        const totalPnlEl = document.getElementById('totalPnl');
        const totalTradesEl = document.getElementById('totalTrades');
        const winRateEl = document.getElementById('winRate');
        const winningTradesEl = document.getElementById('winningTrades');
        const losingTradesEl = document.getElementById('losingTrades');
        
        if (totalPnlEl) {
            totalPnlEl.textContent = `$${totalPnl.toFixed(2)}`;
            // Cambiar color según ganancia/pérdida
            totalPnlEl.style.color = totalPnl >= 0 ? '#4ade80' : '#ef4444';
        }
        if (totalTradesEl) totalTradesEl.textContent = totalTrades;
        if (winRateEl) winRateEl.textContent = `${winRate.toFixed(1)}%`;
        if (winningTradesEl) winningTradesEl.textContent = winningTrades.length;
        if (losingTradesEl) losingTradesEl.textContent = losingTrades.length;
        
        console.log('✅ Métricas actualizadas:', { 
            totalPnl: totalPnl.toFixed(2), 
            totalTrades, 
            winRate: winRate.toFixed(1),
            winning: winningTrades.length,
            losing: losingTrades.length
        });
    }

    updateTables(trades) {
        console.log('📋 Actualizando tabla con', trades.length, 'trades');
        
        const tableBody = document.querySelector('#tradesTable tbody');
        if (!tableBody) {
            console.warn('❌ No se encontró el tbody de la tabla');
            return;
        }
        
        // Limpiar tabla existente
        tableBody.innerHTML = '';
        
        // Agregar cada trade a la tabla
        trades.forEach((trade, index) => {
            const row = document.createElement('tr');
            const pnl = parseFloat(trade.pnl) || 0;
            const pnlClass = pnl >= 0 ? 'profit' : 'loss';
            
            row.innerHTML = `
                <td>${trade.symbol || 'N/A'}</td>
                <td><span class="direction ${trade.direction?.toLowerCase()}">${trade.direction || 'N/A'}</span></td>
                <td>${trade.quantity || 'N/A'}</td>
                <td>$${(parseFloat(trade.entryPrice) || 0).toFixed(4)}</td>
                <td>$${(parseFloat(trade.exitPrice) || 0).toFixed(4)}</td>
                <td class="${pnlClass}">$${pnl.toFixed(2)}</td>
                <td>${this.formatDate(trade.tradeTime || trade.createTime)}</td>
            `;
            
            tableBody.appendChild(row);
        });
        
        console.log('✅ Tabla actualizada con', trades.length, 'filas');
    }
    
    formatDate(dateString) {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES') + ' ' + date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
            return dateString;
        }
    }

    updateChart(trades) {
        console.log('📈 Actualizando gráficos con', trades.length, 'trades');
        // Implementar lógica de gráficos más adelante
    }
}
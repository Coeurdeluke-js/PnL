export class DOMUpdater {
    static updateMetrics(metrics) {
        const elements = {
            totalPnL: document.getElementById('totalPnL'),
            winRate: document.getElementById('winRate'),
            totalTrades: document.getElementById('totalTrades'),
            winningTrades: document.getElementById('winningTrades'),
            losingTrades: document.getElementById('losingTrades'),
            bestTrade: document.getElementById('bestTrade'),
            worstTrade: document.getElementById('worstTrade'),
            profitFactor: document.getElementById('profitFactor')
        };

        if (elements.totalPnL) elements.totalPnL.textContent = `$${metrics.totalPnL.toFixed(2)}`;
        if (elements.winRate) elements.winRate.textContent = `${metrics.winRate.toFixed(1)}%`;
        if (elements.totalTrades) elements.totalTrades.textContent = metrics.totalTrades;
        if (elements.winningTrades) elements.winningTrades.textContent = metrics.winningTrades;
        if (elements.losingTrades) elements.losingTrades.textContent = metrics.losingTrades;
        if (elements.bestTrade) elements.bestTrade.textContent = `$${metrics.bestTrade.toFixed(2)}`;
        if (elements.worstTrade) elements.worstTrade.textContent = `$${metrics.worstTrade.toFixed(2)}`;
        if (elements.profitFactor) {
            elements.profitFactor.textContent = metrics.profitFactor === Infinity ? '∞' : metrics.profitFactor.toFixed(2);
        }
    }

    static updateSymbolSummaryTable(summary) {
        const summaryBody = document.querySelector('#symbolSummary tbody');
        if (!summaryBody) return;
        
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
    }

    static updateAllTradesTable(trades) {
        const allTradesBody = document.querySelector('#allTrades tbody');
        if (!allTradesBody) return;
        
        allTradesBody.innerHTML = '';
        
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
}
export class MetricsCalculator {
    static calculateBasicMetrics(trades) {
        const totalTrades = trades.length;
        const winningTrades = trades.filter(t => t.pnl > 0);
        const losingTrades = trades.filter(t => t.pnl <= 0);
        const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
        const winRate = totalTrades > 0 ? (winningTrades.length / totalTrades) * 100 : 0;

        return {
            totalTrades,
            winningTrades: winningTrades.length,
            losingTrades: losingTrades.length,
            totalPnL,
            winRate
        };
    }

    static calculateAdvancedMetrics(trades) {
        const winningTrades = trades.filter(t => t.pnl > 0);
        const losingTrades = trades.filter(t => t.pnl <= 0);
        
        const grossProfit = winningTrades.reduce((sum, t) => sum + t.pnl, 0);
        const grossLoss = Math.abs(losingTrades.reduce((sum, t) => sum + t.pnl, 0));
        const profitFactor = grossLoss > 0 ? (grossProfit / grossLoss) : Infinity;
        const bestTrade = Math.max(...trades.map(t => t.pnl));
        const worstTrade = Math.min(...trades.map(t => t.pnl));

        return {
            grossProfit,
            grossLoss,
            profitFactor,
            bestTrade,
            worstTrade
        };
    }

    static calculateSymbolSummary(trades) {
        const summary = {};

        trades.forEach(trade => {
            if (!summary[trade.symbol]) {
                summary[trade.symbol] = { trades: [], pnl: 0, wins: 0 };
            }
            summary[trade.symbol].trades.push(trade);
            summary[trade.symbol].pnl += trade.pnl;
            if (trade.pnl > 0) summary[trade.symbol].wins++;
        });

        return summary;
    }
}
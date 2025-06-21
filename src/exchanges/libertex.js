export class LibertexParser {
    parse(csvText) {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');
        const trades = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length !== headers.length) continue;

            const trade = {};
            headers.forEach((header, index) => {
                trade[header] = values[index];
            });

            trades.push(this.standardizeTradeData(trade));
        }

        return trades;
    }

    standardizeTradeData(trade) {
        return {
            symbol: trade['Symbol'],
            direction: trade['Type'] === 'SELL' ? 'Close Long' : 'Close Short',
            quantity: parseFloat(trade['Volume']),
            entryPrice: parseFloat(trade['Open Price']),
            exitPrice: parseFloat(trade['Close Price']),
            pnl: parseFloat(trade['Profit']),
            exitType: 'Trade',
            tradeTime: trade['Close Time'],
            orderId: trade['Order ID'],
            createTime: trade['Open Time']
        };
    }
}
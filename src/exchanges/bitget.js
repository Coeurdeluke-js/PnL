export class BitgetParser {
    static columns = [
        'symbol',
        'side', 
        'size',
        'openPrice',
        'closePrice',
        'pnl',
        'ctime',
        'orderId'
    ];

    static parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');
        
        if (!this.validateHeaders(headers)) {
            throw new Error('Formato de CSV de Bitget inválido');
        }

        return lines.slice(1).map(line => {
            const values = line.split(',');
            return this.createTradeObject(headers, values);
        });
    }

    static validateHeaders(headers) {
        return this.columns.some(col => 
            headers.some(header => 
                header.toLowerCase().includes(col.toLowerCase())
            )
        );
    }

    static createTradeObject(headers, values) {
        const trade = {};
        headers.forEach((header, index) => {
            trade[header] = values[index];
        });
        return trade;
    }

    static standardizeTradeData(trade) {
        return {
            symbol: trade['symbol'] || trade['Symbol'],
            direction: trade['side'] || trade['Side'],
            quantity: parseFloat(trade['size'] || trade['Size']) || 0,
            entryPrice: parseFloat(trade['openPrice'] || trade['Open Price']) || 0,
            exitPrice: parseFloat(trade['closePrice'] || trade['Close Price']) || 0,
            pnl: parseFloat(trade['pnl'] || trade['PnL']) || 0,
            exitType: 'Trade',
            tradeTime: trade['ctime'] || trade['Time'],
            orderId: trade['orderId'] || trade['Order ID'],
            createTime: trade['ctime'] || trade['Create Time']
        };
    }
}
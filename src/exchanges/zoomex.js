export class ZoomExParser {
    static columns = [
        'Contracts',
        'Closing Direction',
        'Qty',
        'Entry Price',
        'Exit Price',
        'Closed P&L',
        'Exit Type',
        'Trade Time(UTC+0)',
        'Order No.',
        'Create Time'
    ];

    static parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');
        
        // Validar columnas requeridas
        if (!this.validateHeaders(headers)) {
            throw new Error('Formato de CSV de ZoomEx inválido');
        }

        return lines.slice(1).map(line => {
            const values = line.split(',');
            return this.createTradeObject(headers, values);
        });
    }

    static validateHeaders(headers) {
        return this.columns.every(col => headers.includes(col));
    }

    static createTradeObject(headers, values) {
        const trade = {};
        headers.forEach((header, index) => {
            trade[header] = values[index];
        });
        return trade;
    }
}
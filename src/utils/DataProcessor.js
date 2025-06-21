import { ZoomExParser } from '../exchanges/zoomex.js';
import { LibertexParser } from '../exchanges/libertex.js';
import { BitgetParser } from '../exchanges/bitget.js';

export class DataProcessor {
    constructor() {
        this.supportedExchanges = ['zoomex', 'libertex', 'bitget'];
    }

    async processFile(fileContent, exchange) {
        if (!this.supportedExchanges.includes(exchange)) {
            throw new Error(`Exchange no soportado: ${exchange}`);
        }

        const lines = fileContent.split('\n').filter(line => line.trim());
        if (lines.length < 2) {
            throw new Error('El archivo debe contener al menos una línea de encabezados y una de datos');
        }

        // Para Libertex, buscar la línea que contiene los encabezados
        let headerLineIndex = -1;
        let headers = [];
        
        if (exchange === 'libertex') {
            // Buscar la línea que contiene "Instrumento"
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes('Instrumento')) {
                    headerLineIndex = i;
                    headers = this.parseCSVLine(lines[i]);
                    break;
                }
            }
        } else {
            headers = this.parseCSVLine(lines[0]);
            headerLineIndex = 0;
        }

        if (headerLineIndex === -1) {
            throw new Error('No se encontraron encabezados válidos en el archivo');
        }

        const data = [];

        for (let i = headerLineIndex + 1; i < lines.length; i++) {
            try {
                const row = this.parseCSVLine(lines[i]);
                if (row.length >= headers.length - 1) {
                    const trade = this.parseTradeData(row, headers, exchange);
                    if (trade && trade.pnl !== undefined && !isNaN(trade.pnl)) {
                        data.push(trade);
                    }
                }
            } catch (error) {
                console.warn(`Error procesando línea ${i + 1}:`, error.message);
            }
        }

        if (data.length === 0) {
            throw new Error('No se encontraron datos válidos en el archivo');
        }

        return data;
    }

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if ((char === ',' || char === '\t') && !inQuotes) {
                result.push(current.trim().replace(/^"|"$/g, ''));
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current.trim().replace(/^"|"$/g, ''));
        return result;
    }

    parseTradeData(row, headers, exchange) {
        const headerMap = {};
        headers.forEach((header, index) => {
            headerMap[header.toLowerCase().trim()] = index;
        });
    
        console.log('🔍 Headers disponibles:', headers);
        console.log('🔍 Datos de la fila:', row);

        try {
            switch (exchange) {
                case 'zoomex':
                    return this.parseZoomExTrade(row, headerMap);
                case 'libertex':
                    return this.parseLibertexTrade(row, headerMap);
                case 'bitget':
                    return this.parseBitgetTrade(row, headerMap);
                default:
                    throw new Error(`Parser no implementado para ${exchange}`);
            }
        } catch (error) {
            console.warn('Error parseando trade:', error);
            return null;
        }
    }

    parseLibertexTrade(row, headerMap) {
        // Mapeo específico para Libertex basado en el formato real
        const symbol = this.getValue(row, headerMap, 'instrumento') || row[0] || 'N/A';
        const direction = this.getValue(row, headerMap, 'dirección') || row[2] || 'N/A';
        const amount = this.getValue(row, headerMap, 'monto ($)') || row[7] || '0';
        const entryPrice = this.getValue(row, headerMap, 'precio de apertura') || row[4] || '0';
        const exitPrice = this.getValue(row, headerMap, 'precio de cierre') || row[6] || '0';
        const profit = this.getValue(row, headerMap, 'beneficio ($)') || row[10] || '0';
        const orderId = this.getValue(row, headerMap, 'número de operación') || row[1] || `LTX_${Date.now()}`;
        const openDate = this.getValue(row, headerMap, 'fecha de apertura') || row[3] || 'N/A';
        const closeDate = this.getValue(row, headerMap, 'fecha de cierre') || row[5] || 'N/A';
        
        // Limpiar y convertir valores numéricos - mejorado
        const cleanAmount = this.parseNumber(amount);
        const cleanEntryPrice = this.parseNumber(entryPrice);
        const cleanExitPrice = this.parseNumber(exitPrice);
        const cleanProfit = this.parseNumber(profit);
        
        // Formatear fechas correctamente
        const formattedOpenDate = this.formatLibertexDate(openDate);
        const formattedCloseDate = this.formatLibertexDate(closeDate);
        
        console.log('🔍 Valores parseados:', {
            symbol, direction, cleanAmount, cleanEntryPrice, cleanExitPrice, cleanProfit,
            openDate: formattedOpenDate, closeDate: formattedCloseDate
        });
        
        return {
            symbol: symbol,
            direction: direction,
            quantity: cleanAmount,
            entryPrice: cleanEntryPrice,
            exitPrice: cleanExitPrice,
            pnl: cleanProfit,
            exitType: 'Trade',
            tradeTime: formattedCloseDate,
            orderId: orderId,
            createTime: formattedOpenDate
        };
    }

    // Nueva función para parsear números de manera más robusta
    parseNumber(value) {
        if (!value || value === '-') return 0;
        
        // Convertir a string y limpiar
        const cleanValue = value.toString()
            .replace(/[^0-9.,-]/g, '') // Mantener solo números, puntos, comas y guiones
            .replace(/,/g, '.'); // Reemplazar comas por puntos para decimales
            
        const parsed = parseFloat(cleanValue);
        return isNaN(parsed) ? 0 : parsed;
    }

    // Nueva función para formatear fechas de Libertex
    formatLibertexDate(dateStr) {
        if (!dateStr || dateStr === 'N/A' || dateStr === '-') return 'N/A';
        
        try {
            // Formato esperado: "19/6/2025 14:05" o similar
            const parts = dateStr.trim().split(' ');
            if (parts.length >= 2) {
                const datePart = parts[0]; // "19/6/2025"
                const timePart = parts[1]; // "14:05"
                
                const dateComponents = datePart.split('/');
                if (dateComponents.length === 3) {
                    const day = dateComponents[0].padStart(2, '0');
                    const month = dateComponents[1].padStart(2, '0');
                    const year = dateComponents[2];
                    
                    // Devolver en formato ISO: YYYY-MM-DDTHH:MM:SS
                    return `${year}-${month}-${day}T${timePart}:00`;
                }
            }
            return dateStr; // Devolver original si no se puede parsear
        } catch (error) {
            console.warn('Error formateando fecha:', dateStr, error);
            return dateStr;
        }
    }

    parseZoomExTrade(row, headerMap) {
        return {
            symbol: this.getValue(row, headerMap, 'symbol') || this.getValue(row, headerMap, 'instrument') || this.getValue(row, headerMap, 'contracts'),
            direction: this.getValue(row, headerMap, 'side') || this.getValue(row, headerMap, 'closing direction'),
            quantity: parseFloat(this.getValue(row, headerMap, 'quantity') || this.getValue(row, headerMap, 'qty') || this.getValue(row, headerMap, 'size')) || 0,
            entryPrice: parseFloat(this.getValue(row, headerMap, 'avg. entry price') || this.getValue(row, headerMap, 'entry price') || this.getValue(row, headerMap, 'openprice')) || 0,
            exitPrice: parseFloat(this.getValue(row, headerMap, 'avg. exit price') || this.getValue(row, headerMap, 'exit price') || this.getValue(row, headerMap, 'closeprice')) || 0,
            pnl: parseFloat(this.getValue(row, headerMap, 'realised p&l') || this.getValue(row, headerMap, 'closed p&l') || this.getValue(row, headerMap, 'pnl')) || 0,
            exitType: this.getValue(row, headerMap, 'exit type') || 'Trade',
            tradeTime: this.getValue(row, headerMap, 'trade time(utc+0)') || this.getValue(row, headerMap, 'created time'),
            orderId: this.getValue(row, headerMap, 'order no.') || `ZMX_${Date.now()}`,
            createTime: this.getValue(row, headerMap, 'create time') || this.getValue(row, headerMap, 'created time')
        };
    }

    parseBitgetTrade(row, headerMap) {
        return {
            symbol: this.getValue(row, headerMap, 'symbol') || this.getValue(row, headerMap, 'instrument'),
            direction: this.getValue(row, headerMap, 'side') || this.getValue(row, headerMap, 'direction'),
            quantity: parseFloat(this.getValue(row, headerMap, 'size') || this.getValue(row, headerMap, 'quantity') || this.getValue(row, headerMap, 'amount')) || 0,
            entryPrice: parseFloat(this.getValue(row, headerMap, 'openprice') || this.getValue(row, headerMap, 'open price') || this.getValue(row, headerMap, 'entry price')) || 0,
            exitPrice: parseFloat(this.getValue(row, headerMap, 'closeprice') || this.getValue(row, headerMap, 'close price') || this.getValue(row, headerMap, 'exit price')) || 0,
            pnl: parseFloat(this.getValue(row, headerMap, 'pnl') || this.getValue(row, headerMap, 'profit') || this.getValue(row, headerMap, 'realised p&l')) || 0,
            exitType: 'Trade',
            tradeTime: this.getValue(row, headerMap, 'ctime') || this.getValue(row, headerMap, 'close time') || this.getValue(row, headerMap, 'time'),
            orderId: this.getValue(row, headerMap, 'orderid') || this.getValue(row, headerMap, 'order id') || `BTG_${Date.now()}`,
            createTime: this.getValue(row, headerMap, 'ctime') || this.getValue(row, headerMap, 'created time')
        };
    }

    getValue(row, headerMap, key) {
        const index = headerMap[key];
        return index !== undefined ? row[index] : '';
    }

    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
            reader.readAsText(file);
        });
    }
}
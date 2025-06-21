import { ZoomExParser } from '../exchanges/zoomex.js';
import { LibertexParser } from '../exchanges/libertex.js';
import { BitgetParser } from '../exchanges/bitget.js';

export class DataProcessor {
    constructor() {
        this.parsers = {
            zoomex: new ZoomExParser(),
            libertex: new LibertexParser(),
            bitget: new BitgetParser()
        };
    }

    async processFile(file, exchange) {
        const text = await this.readFile(file);
        const parser = this.parsers[exchange];
        
        if (!parser) {
            throw new Error('Exchange no soportado');
        }

        return parser.parse(text);
    }

    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        });
    }
}
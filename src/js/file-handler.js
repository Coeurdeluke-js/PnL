import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { DataProcessor } from '../utils/DataProcessor.js';

let selectedExchange = null;
const dataProcessor = new DataProcessor();

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const trades = await dataProcessor.processFile(fileContent, selectedExchange);
        updateUI(trades);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const { data, headers } = await CSVParser.parseFile(fileContent, selectedExchange);
        await processCSVData(data, headers);
    } catch (error) {
        showError(error.message);
    } finally {
        event.target.value = '';
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}

async function processCSVData(data, headers) {
    if (!selectedExchange) {
        throw new Error('No se ha seleccionado exchange.');
    }
    
    if (!HeaderValidator.validate(headers, selectedExchange)) {
        return; // El validador ya muestra el error
    }

    try {
        const trades = TradeStandardizer.standardizeTrades(data, selectedExchange);
        
        if (data.length > 0 && trades.length === 0) {
            throw new Error('Se procesaron los datos pero no se pudo estandarizar ninguna operación.');
        }
        
        updateUI(trades);
    } catch (error) {
        throw new Error(`Error al procesar los datos: ${error.message}`);
    }
}
import { EXCHANGES } from './config.js';
import { showError } from './modal-manager.js';
import { updateUI } from './ui-manager.js';
import { CSVParser } from './parsers/csv-parser.js';
import { TradeStandardizer } from './parsers/trade-standardizer.js';
import { HeaderValidator } from './parsers/header-validator.js';

let selectedExchange = null;

export function setSelectedExchange(exchange) {
    selectedExchange = exchange;
}

export function getSelectedExchange() {
    return selectedExchange;
}

export async function handleFileSelect
// Importaciones de módulos
import { ExchangeModal } from './components/modal/ExchangeModal.js';
import { DataProcessor } from './utils/DataProcessor.js';
import { UIUpdater } from './utils/UIUpdater.js';

class App {
    constructor() {
        this.modal = new ExchangeModal();
        this.dataProcessor = new DataProcessor();
        this.uiUpdater = new UIUpdater();
        this.init();
    }

    init() {
        const uploadButton = document.getElementById('uploadButton');
        const fileInput = document.getElementById('csvFile');

        uploadButton.addEventListener('click', () => this.modal.show());

        this.modal.onExchangeSelect((exchange) => {
            fileInput.click();
        });

        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const data = await this.dataProcessor.processFile(file, this.modal.selectedExchange);
                this.uiUpdater.updateUI(data);
            } catch (error) {
                console.error('Error procesando archivo:', error);
                alert('Error al procesar el archivo. Por favor, verifica que el formato sea correcto.');
            }
        });
    }
}

// Iniciar la aplicación
new App();
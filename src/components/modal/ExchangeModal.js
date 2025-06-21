export class ExchangeModal {
    constructor() {
        this.modal = document.getElementById('exchangeModal');
        this.selectedExchange = null;
        this.callback = null;
        this.initializeListeners();
    }

    initializeListeners() {
        const options = document.querySelectorAll('.exchange-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                this.selectedExchange = option.dataset.exchange;
                this.hide();
                if (this.callback) this.callback(this.selectedExchange);
            });
        });

        window.addEventListener('click', (e) => {
            if (e.target === this.modal) this.hide();
        });
    }

    show() {
        this.modal.style.display = 'block';
    }

    hide() {
        this.modal.style.display = 'none';
    }

    onExchangeSelect(callback) {
        this.callback = callback;
    }
}
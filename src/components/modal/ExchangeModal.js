export class ExchangeModal {
    constructor() {
        this.modal = document.getElementById('exchangeModal');
        this.selectedExchange = null;
        this.onSelectCallback = null;
        this.init();
    }

    init() {
        const exchangeOptions = this.modal.querySelectorAll('.exchange-option');
        const closeBtn = this.modal.querySelector('.modal-close');
        const overlay = this.modal.querySelector('.modal-overlay');

        exchangeOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.selectedExchange = option.dataset.exchange;
                this.hide();
                if (this.onSelectCallback) {
                    this.onSelectCallback(this.selectedExchange);
                }
            });
        });

        closeBtn.addEventListener('click', () => this.hide());
        overlay.addEventListener('click', () => this.hide());
    }

    show() {
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    hide() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    onExchangeSelect(callback) {
        this.onSelectCallback = callback;
    }
}
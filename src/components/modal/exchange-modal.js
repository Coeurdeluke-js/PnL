export class ExchangeModal {
    constructor() {
        this.selectedExchange = null;
        this.exchanges = {
            zoomex: {
                name: 'ZoomEx',
                logo: 'src/assets/images/logo-zoomex.png',
                description: 'Plataforma ZoomEx'
            },
            libertex: {
                name: 'Libertex',
                logo: 'src/assets/images/logo-libertex.png',
                description: 'Plataforma Libertex'
            },
            bitget: {
                name: 'BitGet',
                logo: 'src/assets/images/logo-bitget.png',
                description: 'Plataforma BitGet'
            }
        };
    }

    show() {
        const modalHTML = `
            <div class="exchange-modal">
                <div class="exchange-modal-content">
                    <h2>Seleccione su Exchange</h2>
                    <p class="exchange-modal-description">Seleccione el exchange del cual descargó su archivo CSV para aplicar el formato correcto</p>
                    <div class="exchange-options">
                        ${Object.entries(this.exchanges).map(([key, exchange]) => `
                            <div class="exchange-option" data-exchange="${key}">
                                <img src="${exchange.logo}" alt="${exchange.name} logo">
                                <h3>${exchange.name}</h3>
                                <p>${exchange.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        const modalElement = document.createElement('div');
        modalElement.innerHTML = modalHTML;
        document.body.appendChild(modalElement.firstElementChild);

        this.addEventListeners();
    }

    addEventListeners() {
        const options = document.querySelectorAll('.exchange-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                this.selectedExchange = option.dataset.exchange;
                this.onExchangeSelected(this.selectedExchange);
                this.close();
            });
        });
    }

    close() {
        const modal = document.querySelector('.exchange-modal');
        if (modal) {
            modal.remove();
        }
    }

    onExchangeSelected(exchange) {
        // Será implementado en app.js
    }
}
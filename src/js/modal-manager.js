export function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    const errorModal = document.getElementById('errorModal');
    
    errorMessage.innerText = message;
    errorModal.style.display = 'block';
}

export function hideError() {
    const errorModal = document.getElementById('errorModal');
    errorModal.style.display = 'none';
}

export function hideExchangeModal() {
    const exchangeModal = document.getElementById('exchangeModal');
    exchangeModal.style.display = 'none';
}

export function showExchangeModal() {
    const exchangeModal = document.getElementById('exchangeModal');
    exchangeModal.style.display = 'block';
}

export function setupModalEvents() {
    const errorModalCloseBtn = document.getElementById('errorModalCloseBtn');
    const exchangeModal = document.getElementById('exchangeModal');
    const errorModal = document.getElementById('errorModal');
    
    errorModalCloseBtn.addEventListener('click', hideError);
    
    window.addEventListener('click', (e) => {
        if (e.target === exchangeModal) hideExchangeModal();
        if (e.target === errorModal) hideError();
    });
}
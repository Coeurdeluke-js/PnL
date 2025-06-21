export const EXCHANGES = {
    zoomex: {
        name: 'ZoomEx',
        logo: 'Z',
        description: 'Plataforma de élite del Imperio',
        columns: ['Side', 'Quantity', 'Avg. Entry Price', 'Avg. Exit Price', 'Realised P&L', 'Created Time']
    },
    libertex: {
        name: 'Libertex', 
        logo: 'L',
        description: 'Arsenal financiero imperial',
        columns: ['Instrumento', 'Dirección', 'Monto ($)', 'Precio de apertura', 'Precio de cierre', 'Fecha de cierre', 'Beneficio ($)']
    },
    bitget: {
        name: 'BitGet',
        logo: 'B', 
        description: 'Fortaleza cripto del Imperio',
        columns: ['side', 'dealAvgPrice', 'pnl', 'size', 'openPrice', 'closePrice', 'ctime']
    }
};

export const SITH_CONFIG = {
    theme: {
        colors: {
            dark: '#121212',
            light: '#fafafa', 
            red: '#ec4d58'
        },
        fonts: {
            primary: 'Orbitron',
            secondary: 'Rajdhani'
        }
    },
    messages: {
        welcome: 'Bienvenido al lado oscuro del trading, Darth Luke',
        error: 'Perturbación en la Fuerza detectada',
        success: 'El poder del Imperio fluye a través de tus trades'
    }
};
// Configuración del gráfico
export const CHART_CONFIG = {
    colors: [
        '#ec4d58', '#4ade80', '#3b82f6', '#f97316', 
        '#a855f7', '#facc15', '#22d3ee', '#d946ef'
    ],
    borderColor: '#1e1e1e',
    borderWidth: 2
};
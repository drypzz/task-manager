export const theme = {
    colors: {
        background: '#282C34', // Fundo principal
        surface: '#21252B',    // Painéis e áreas elevadas
        primary: '#3E4451',    // Tons neutros para hover/seleção
        accent: '#61AFEF',     // Azul vibrante
        font: '#ABB2BF',       // Texto padrão
        fontSecondary: '#5C6370', // Texto secundário / comentários
        success: '#c1ff95ff',    // Verde suave
        warning: '#ffd484ff',    // Amarelo ouro
        danger: '#ff7a85ff',     // Vermelho rosado
        border: 'rgba(255, 255, 255, 0.08)', // Borda suave
        info: '#68edffff',       // Ciano
    },
    fonts: {
        main: "'Fira Code', monospace",
    },
    spacing: (unit) => `${unit * 8}px`,
};

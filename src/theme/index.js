export const theme = {
    colors: {
        background: '#111827', // Cinza-azulado muito escuro
        surface: '#1F2937',    // Cinza-ardósia
        primary: '#374151',    // Cinza médio para hover
        accent: '#14B8A6',     // Verde-azulado (Teal) vibrante
        font: '#F9FAFB',       // Branco suave
        fontSecondary: '#9CA3AF', // Cinza claro para texto secundário
        success: '#22C55E',    // Verde-limão
        warning: '#F59E0B',    // Âmbar
        danger: '#EF4444',     // Vermelho vivo
        border: 'rgba(255, 255, 255, 0.08)',
        info: '#3B82F6',       // Azul
    },
    fonts: {
        main: "'Poppins', sans-serif",
    },
    spacing: (unit) => `${unit * 8}px`,
};
export const colors = {
  // Backgrounds
  background: '#111111',      // Fundo principal do app
  surface: '#1C1C1E',         // Fundo auxiliar para destacar

  // Primary colors
  primary: '#6DEAED',         // Cor principal (destaques)
  primaryDark: '#5BC8CB',     // Variação mais escura
  primaryLight: '#8FFFFF',    // Variação mais clara

  // Secondary colors
  secondary: '#8A8A8E',       // Ícones e elementos secundários
  accent: '#6DEAED',          // Accent igual ao primary

  // Text colors
  textPrimary: '#FFFFFF',     // Texto principal
  textSecondary: '#8A8A8E',   // Texto secundário

  // Status colors
  error: '#FF4D4D',
  success: '#4ADE80',
  online: '#6DEAED',          // Online com cor principal
  offline: '#8A8A8E',         // Offline com cor de ícones

  // Borders
  border: 'rgba(138, 138, 142, 0.3)',  // Border com base no secondary
} as const;

export type ColorName = keyof typeof colors;

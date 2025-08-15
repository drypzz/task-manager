import React from 'react';

import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

import { GlobalStyle } from './globalStyles';

import NotificationCenter from './components/NotificationCenter';

import Routers from './router';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routers />
      <NotificationCenter />
    </ThemeProvider>
  );
}

export default App;
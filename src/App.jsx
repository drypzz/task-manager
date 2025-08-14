import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { theme } from './theme';

import { GlobalStyle } from './globalStyles';

import Home from './pages/Home';
import TaskDetail from './pages/TaskDetail';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:taskId" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
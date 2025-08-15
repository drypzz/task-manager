import React from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';

import TaskList from '../components/TaskList';

// Mocka o hook personalizado `useTaskList` para simular os diferentes estados da lista
jest.mock('../components/TaskList/index.rules', () => ({
    useTaskList: jest.fn(),
}));

const { useTaskList } = require('../components/TaskList/index.rules');

// Função utilitária para renderizar com ThemeProvider e MemoryRouter (necessário para componentes com rotas)
const renderWithProviders = (ui) => {
    return render(
        <ThemeProvider theme={theme}>
            <MemoryRouter>{ui}</MemoryRouter>
        </ThemeProvider>
    );
};

describe('TaskList', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Reseta mocks antes de cada teste
    });

    it('exibe o spinner de carregamento', () => {
        // Estado simulado: carregando tarefas
        useTaskList.mockReturnValue({
            isLoading: true,
            hasTasks: false,
            draggableTasks: [],
        });

        renderWithProviders(<TaskList />);
        expect(screen.getByText('Carregando tarefas...')).toBeInTheDocument();
    });

    it('exibe mensagem de "nenhuma tarefa encontrada"', () => {
        // Estado simulado: sem tarefas
        useTaskList.mockReturnValue({
            isLoading: false,
            hasTasks: false,
            draggableTasks: [],
        });

        renderWithProviders(<TaskList />);
        expect(screen.getByText('Nenhuma tarefa encontrada')).toBeInTheDocument();
    });

    it('renderiza lista de tarefas', () => {
        // Estado simulado: tarefas disponíveis
        useTaskList.mockReturnValue({
            isLoading: false,
            hasTasks: true,
            draggableTasks: [
                <div key="1">Tarefa de Teste 1</div>,
                <div key="2">Tarefa de Teste 2</div>,
            ],
        });

        renderWithProviders(<TaskList />);
        expect(screen.getByText('Tarefa de Teste 1')).toBeInTheDocument();
        expect(screen.getByText('Tarefa de Teste 2')).toBeInTheDocument();
    });
});

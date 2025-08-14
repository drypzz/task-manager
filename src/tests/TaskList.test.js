import React from 'react';

import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { theme } from '../theme'; 

import TaskList from '../components/TaskList';

import useTaskStore from '../store/useTaskStore';

jest.mock('../store/useTaskStore');
jest.mock('react-virtualized-auto-sizer', () => ({
    __esModule: true,
    default: ({ children }) => children({ height: 600, width: 800 }),
}));

describe('TaskList', () => {

    const renderWithProviders = (ui) => {
        return render(
            <ThemeProvider theme={theme}>
                <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    {ui}
                </MemoryRouter>
            </ThemeProvider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('exibe o spinner de carregamento', () => {
        useTaskStore.mockReturnValue({
            isLoading: true,
            filteredTasks: [],
        });

        renderWithProviders(<TaskList />);

        expect(screen.getByText('Carregando tarefas...')).toBeInTheDocument();
    });

    it('exibe a mensagem de "nenhuma tarefa encontrada" quando a lista está vazia', () => {
        useTaskStore.mockReturnValue({
            isLoading: false,
            filteredTasks: [],
        });

        renderWithProviders(<TaskList />);

        expect(screen.getByText('Nenhuma tarefa encontrada')).toBeInTheDocument();
    });

    it('renderiza a lista de tarefas', () => {
        const tasks = [
            { id: 1, title: 'Tarefa de Teste 1', status: 'Concluída' },
            { id: 2, title: 'Tarefa de Teste 2', status: 'Em andamento' },
        ];

        useTaskStore.mockReturnValue({
            isLoading: false,
            filteredTasks: tasks,
        });

        renderWithProviders(<TaskList />);

        expect(screen.getByText('Tarefa de Teste 1')).toBeInTheDocument();
        expect(screen.getByText('Tarefa de Teste 2')).toBeInTheDocument();
    });
});
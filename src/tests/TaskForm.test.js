import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme'; // Corrigido para importar seu tema único
import TaskForm from '../components/TaskForm';
import useTaskStore from '../store/useTaskStore';

// Mocks
jest.mock('../store/useTaskStore');
jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    createPortal: (node) => node,
}));

// Helper que usa diretamente o tema importado
const renderWithTheme = (ui, options) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, options);
};

describe('TaskForm', () => {
    const mockAddTask = jest.fn();
    const mockUpdateTask = jest.fn();
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useTaskStore.mockReturnValue({
            addTask: mockAddTask,
            updateTask: mockUpdateTask,
        });
    });

    it('renderiza os campos para adicionar uma nova tarefa', () => {
        renderWithTheme(<TaskForm onClose={mockOnClose} />);
        expect(screen.getByText('Nova Tarefa')).toBeInTheDocument();
        expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    });

    it('chama a função de adicionar (addTask) com os dados corretos ao submeter', () => {
        renderWithTheme(<TaskForm onClose={mockOnClose} />);

        fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Nova Tarefa de Teste' } });
        fireEvent.change(screen.getByLabelText(/Autor/i), { target: { value: 'Usuário de Teste' } });
        fireEvent.click(screen.getByRole('button', { name: /Adicionar/i }));

        expect(mockOnClose).toHaveBeenCalledTimes(1);
        expect(mockAddTask).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Nova Tarefa de Teste',
                author: 'Usuário de Teste',
            })
        );
    });

    it('chama a função de atualizar (updateTask) quando uma tarefa é passada via props', () => {
        const taskExistente = {
            id: 1,
            title: 'Tarefa Antiga',
            author: 'Autor Antigo',
            status: 'Concluída',
            description: 'Descrição antiga',
        };

        renderWithTheme(<TaskForm task={taskExistente} onClose={mockOnClose} />);

        fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Título Atualizado' } });
        fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

        expect(mockUpdateTask).toHaveBeenCalledWith(
            taskExistente.id,
            expect.objectContaining({
                title: 'Título Atualizado',
            })
        );
    });
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';

jest.mock('../store/useTaskStore', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        addTask: jest.fn(),
        updateTask: jest.fn(),
    })),
}));

describe('TaskForm', () => {
    it('renderiza o formulário para adicionar uma nova tarefa', () => {
        render(<TaskForm onClose={() => { }} />);
        expect(screen.getByText('Nova Tarefa')).toBeInTheDocument();
        expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    });

    it('chama a função de adicionar ao submeter o formulário', () => {
        const addTask = jest.fn();
        const useTaskStore = require('../store/useTaskStore').default;
        useTaskStore.mockImplementation(() => ({ addTask }));

        render(<TaskForm onClose={() => { }} />);

        fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Nova Tarefa de Teste' } });
        fireEvent.click(screen.getByText('Adicionar'));

        expect(addTask).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Nova Tarefa de Teste',
            status: 'Em andamento',
        }));
    });
});
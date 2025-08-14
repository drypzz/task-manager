import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList';
import useTaskStore from '../store/useTaskStore';

jest.mock('react-virtualized-auto-sizer', () => ({
    __esModule: true,
    default: ({ children }) => children({ height: 600, width: 800 }),
}));


describe('TaskList', () => {
    it('exibe a mensagem de carregamento', () => {
        useTaskStore.setState({ isLoading: true, filteredTasks: [] });
        render(<TaskList />);
        expect(screen.getByText('Carregando tarefas...')).toBeInTheDocument();
    });

    it('renderiza a lista de tarefas', () => {
        const tasks = [
            { id: 1, title: 'Tarefa 1', status: 'Concluída' },
            { id: 2, title: 'Tarefa 2', status: 'Em andamento' },
        ];
        useTaskStore.setState({ isLoading: false, filteredTasks: tasks });

        render(<TaskList />);

        expect(screen.getByText('Tarefa 1')).toBeInTheDocument();
        expect(screen.getByText('Tarefa 2')).toBeInTheDocument();
    });
});
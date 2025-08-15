import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';

import TaskForm from '../components/TaskForm';

// Mocka o hook personalizado `useTaskForm` para controlar valores e comportamentos durante os testes
jest.mock('../components/TaskForm/index.rules', () => ({
    useTaskForm: jest.fn(),
}));

// Recupera o mock para poder manipular retornos específicos em cada teste
const { useTaskForm } = require('../components/TaskForm/index.rules');

// Mocka o `createPortal` para evitar problemas ao testar modais/portais no ambiente de teste
jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    createPortal: (node) => node,
}));

// Função utilitária para renderizar componentes com o tema aplicado
const renderWithTheme = (ui) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('TaskForm', () => {
    const mockOnClose = jest.fn();
    const mockHandleSubmit = jest.fn();

    beforeAll(() => {
        // Intercepta o console.error para filtrar o log de submit não implementado no jsdom
        jest.spyOn(console, 'error').mockImplementation((...args) => {
            if (
                typeof args[0] === 'string' &&
                args[0].includes('Not implemented: HTMLFormElement.prototype.submit')
            ) {
                console.log('⚠️ Not implemented: HTMLFormElement.prototype.submit (jsdom)');
            } else {
                originalError(...args); // Chama o original para outros erros
            }
        });
    });

    beforeEach(() => {
        jest.clearAllMocks(); // Reseta mocks antes de cada teste
    });

    it('renderiza campos para adicionar nova tarefa', () => {
        // Configura valores iniciais para o formulário vazio
        useTaskForm.mockReturnValue({
            title: '',
            setTitle: jest.fn(),
            status: 'Pendente',
            setStatus: jest.fn(),
            author: '',
            setAuthor: jest.fn(),
            description: '',
            setDescription: jest.fn(),
            statusOptions: [],
            handleSubmit: mockHandleSubmit,
        });

        renderWithTheme(<TaskForm onClose={mockOnClose} />);

        // Valida que os elementos essenciais estão na tela
        expect(screen.getByText('Nova Tarefa')).toBeInTheDocument();
        expect(screen.getByLabelText(/Título:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Autor:/i)).toBeInTheDocument();
    });

    it('submete formulário chamando handleSubmit', () => {
        // Mocks para rastrear alterações no título e autor
        const setTitle = jest.fn();
        const setAuthor = jest.fn();

        useTaskForm.mockReturnValue({
            title: '',
            setTitle,
            status: 'Pendente',
            setStatus: jest.fn(),
            author: '',
            setAuthor,
            description: '',
            setDescription: jest.fn(),
            statusOptions: [],
            handleSubmit: mockHandleSubmit,
        });

        renderWithTheme(<TaskForm onClose={mockOnClose} />);

        // Simula preenchimento dos campos
        fireEvent.change(screen.getByLabelText(/Título:/i), { target: { value: 'Nova Tarefa' } });
        fireEvent.change(screen.getByLabelText(/Autor:/i), { target: { value: 'Usuário Teste' } });

        // Simula clique no botão que dispara form.submit()
        fireEvent.click(screen.getByRole('button', { name: /Adicionar/i }));

        // Valida que os setters foram chamados com os valores corretos
        expect(setTitle).toHaveBeenCalledWith('Nova Tarefa');
        expect(setAuthor).toHaveBeenCalledWith('Usuário Teste');
    });

    it('mostra "Salvar" quando editando tarefa', () => {
        // Configura valores para simular edição de tarefa existente
        useTaskForm.mockReturnValue({
            title: 'Tarefa Antiga',
            setTitle: jest.fn(),
            status: 'Concluída',
            setStatus: jest.fn(),
            author: 'Autor Antigo',
            setAuthor: jest.fn(),
            description: '',
            setDescription: jest.fn(),
            statusOptions: [],
            handleSubmit: mockHandleSubmit,
        });

        renderWithTheme(<TaskForm task={{ id: 1 }} onClose={mockOnClose} />);

        // O botão deve estar no modo "Salvar" e não "Adicionar"
        expect(screen.getByRole('button', { name: /Salvar/i })).toBeInTheDocument();
    });
});

import { useState, useEffect, useMemo } from 'react';

import useTaskStore from '../../store/useTaskStore';

/**
 * Hook customizado que encapsula toda a lógica de negócio da página Home.
 * Ele gerencia o estado do modal, busca dados do store, define dados para os seletores
 * e calcula informações de paginação, mantendo o componente Home limpo e focado na UI.
 * @returns {object} - Retorna um objeto contendo todo o estado e os manipuladores
 * necessários para a renderização e interatividade da página Home.
 */
export const useHomeRules = () => {
    const {
        fetchTasks,
        tasks,
        ...taskStoreState
    } = useTaskStore();

    /** @type {[boolean, Function]} isModalOpen - Estado local para controlar a visibilidade do modal de criação/edição de tarefas. */
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);


    /** @type {Array<object>} statusOptions - Opções para o seletor de filtro de status. */
    const statusOptions = useMemo(() => [
        { value: 'Todos', label: 'Todos os Status' },
        { value: 'Em andamento', label: 'Em andamento' },
        { value: 'Concluída', label: 'Concluída' },
        { value: 'Atrasada', label: 'Atrasada' },
        { value: 'Pendente', label: 'Pendente' },
    ], []);

    /** @type {Array<object>} pageSizeOptions - Opções para o seletor de quantidade de itens por página. */
    const pageSizeOptions = useMemo(() => [
        { value: 25, label: 'Exibir 25' },
        { value: 50, label: 'Exibir 50' },
        { value: 100, label: 'Exibir 100' },
    ], []);

    /** @type {Array<object>} legendItems - Dados para renderizar a legenda de status. */
    const legendItems = useMemo(() => [
        { $status: 'Concluída', label: 'Concluída' },
        { $status: 'Em andamento', label: 'Em Andamento' },
        { $status: 'Atrasada', label: 'Atrasada' },
        { $status: 'Pendente', label: 'Pendente' },
    ], []);

    /**
     * Calcula e memoiza as informações de paginação (índice inicial e final) para exibição na UI.
     * Este cálculo é refeito apenas quando a página, o tamanho da página ou a lista de tarefas filtradas mudam.
     * @type {{startIndex: number, endIndex: number}}
     */
    const pageInfo = useMemo(() => {
        const { page, pageSize, filteredTasks } = taskStoreState;
        const startIndex = (page - 1) * pageSize + 1;
        const endIndex = startIndex + filteredTasks.length - 1;
        return { startIndex, endIndex };
    }, [taskStoreState.page, taskStoreState.pageSize, taskStoreState.filteredTasks]);

    return {
        ...taskStoreState,
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        statusOptions,
        pageSizeOptions,
        legendItems,
        pageInfo,
    };
};

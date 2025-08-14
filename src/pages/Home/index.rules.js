import { useState, useEffect, useMemo } from 'react';

import useTaskStore from '../../store/useTaskStore';

export const useHomeRules = () => {
    const {
        fetchTasks,
        tasks,
        ...taskStoreState
    } = useTaskStore();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const statusOptions = useMemo(() => [
        { value: 'Todos', label: 'Todos os Status' },
        { value: 'Em andamento', label: 'Em andamento' },
        { value: 'Concluída', label: 'Concluída' },
        { value: 'Atrasada', label: 'Atrasada' },
        { value: 'Pendente', label: 'Pendente' },
    ], []);

    const pageSizeOptions = useMemo(() => [
        { value: 25, label: 'Exibir 25' },
        { value: 50, label: 'Exibir 50' },
        { value: 100, label: 'Exibir 100' },
    ], []);

    const legendItems = useMemo(() => [
        { $status: 'Concluída', label: 'Concluída' },
        { $status: 'Em andamento', label: 'Em Andamento' },
        { $status: 'Atrasada', label: 'Atrasada' },
        { $status: 'Pendente', label: 'Pendente' },
    ], []);

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
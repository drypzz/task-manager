import React from 'react';

import useTaskStore from '../../store/useTaskStore';

import TaskItem from '../TaskItem';

/**
 * Hook customizado para fornecer a lógica e os dados para o componente TaskList.
 * Ele se conecta ao store do Zustand para obter as tarefas filtradas e o estado de carregamento,
 * e prepara a função de renderização de linha (`Row`) para a lista virtualizada.
 * @returns {object} - Retorna os dados necessários para a UI, incluindo a lista de tarefas,
 * o estado de carregamento e o componente de linha (`Row`) pronto para ser usado pelo react-window.
 */
export const useTaskList = () => {
    const { filteredTasks, isLoading } = useTaskStore();

    /**
     * Cria e retorna o componente de renderização de linha para o `react-window`.
     * Esta abordagem (uma função que retorna um componente) garante que a função `Row`
     * tenha sempre acesso aos valores mais recentes de `page` and `pageSize` do store.
     * @returns {React.ComponentType} - Um componente funcional que renderiza uma única linha.
     */
    const Row = ({ index, style }) => {
        return (
            <div style={style}>
                <TaskItem task={filteredTasks[index]} />
            </div>
        );
    };

    return {
        filteredTasks,
        isLoading,
        Row
    };
};

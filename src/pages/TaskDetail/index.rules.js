import { useEffect, useMemo } from 'react';

import { useParams } from 'react-router-dom';

import useTaskStore from '../../store/useTaskStore';

/**
 * Hook customizado para gerenciar a lógica da página de detalhes da tarefa.
 * É responsável por extrair o ID da tarefa da URL, buscar os dados correspondentes
 * no store e formatar qualquer dado necessário para a exibição.
 * @returns {object} - Retorna um objeto com o estado de carregamento, os dados da tarefa
 * e qualquer informação formatada que a UI precise.
 */
export const useTaskDetail = () => {
    const { taskId } = useParams();

    const { currentTask, isCurrentTaskLoading, fetchTaskById } = useTaskStore();

    useEffect(() => {
        if (taskId) {
            fetchTaskById(taskId);
        }
    }, [taskId, fetchTaskById]);

    /**
     * Calcula e memoiza a data formatada da tarefa.
     * `useMemo` garante que a formatação da data só seja recalculada se a data de criação da tarefa (`currentTask.createdAt`) mudar.
     * Isso previne recálculos desnecessários em cada renderização.
     * @type {string|null}
     */
    const formattedDate = useMemo(() => {
        if (!currentTask?.createdAt) return null;

        return new Date(currentTask.createdAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    }, [currentTask?.createdAt]);

    return {
        isLoading: isCurrentTaskLoading,
        task: currentTask,
        formattedDate,
    };
};

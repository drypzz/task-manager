import { useEffect, useMemo } from 'react';

import { useParams } from 'react-router-dom';

import useTaskStore from '../../store/useTaskStore';

export const useTaskDetail = () => {
    const { taskId } = useParams();

    const { currentTask, isCurrentTaskLoading, fetchTaskById } = useTaskStore();

    useEffect(() => {
        if (taskId) {
            fetchTaskById(taskId);
        }
    }, [taskId, fetchTaskById]);

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
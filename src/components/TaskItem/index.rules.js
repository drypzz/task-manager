import { useState } from 'react';

import useTaskStore from '../../store/useTaskStore';

export const useTaskItem = ({ task }) => {
    const { deleteTask } = useTaskStore();
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
        if (window.confirm(`Tem certeza que deseja excluir a tarefa "${task.title}"?`)) {
            deleteTask(task.id);
        }
    };

    const handleEdit = () => setIsEditing(true);
    const handleCloseModal = () => setIsEditing(false);

    return {
        isEditing,
        handleDelete,
        handleEdit,
        handleCloseModal
    };
};

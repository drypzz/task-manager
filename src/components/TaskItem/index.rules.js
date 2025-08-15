import { useState } from 'react';

import useTaskStore from '../../store/useTaskStore';

/**
 * Hook customizado para gerenciar a lógica de um item de tarefa individual.
 * Lida com o estado de edição e as ações de deletar e editar.
 * @param {object} params - Parâmetros do hook.
 * @param {object} params.task - O objeto da tarefa associado a este item.
 * @returns {object} - Retorna o estado e os manipuladores para o componente TaskItem.
 */
export const useTaskItem = ({ task }) => {
    const { deleteTask } = useTaskStore();

    /** @type {[boolean, Function]} isEditing - Estado local que controla se o modal de edição para esta tarefa está aberto. */
    const [isEditing, setIsEditing] = useState(false);

    const isNew = () => {
        if (!task.createdAt) return false;

        const taskAge = Date.now() - new Date(task.createdAt).getTime();

        return taskAge < 300000;
    };

    /**
     * Manipulador para a ação de deletar.
     * Exibe uma confirmação nativa do navegador e, se confirmado, chama a ação 'deleteTask' do store.
     */
    const handleDelete = () => {
        if (window.confirm(`Tem certeza que deseja excluir a tarefa "${task.title}"?`)) {
            deleteTask(task.id);
        }
    };

    /** Manipulador para abrir o modal de edição. */
    const handleEdit = () => setIsEditing(true);

    /** Manipulador para fechar o modal de edição. */
    const handleCloseModal = () => setIsEditing(false);

    return {
        isEditing,
        handleDelete,
        handleEdit,
        handleCloseModal,
        isNew
    };
};
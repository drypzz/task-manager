import { useState, useMemo } from 'react';

import useTaskStore from '../../store/useTaskStore';

/**
 * Hook customizado para gerenciar toda a lógica do formulário de tarefas.
 * Ele encapsula o estado dos campos, a lógica de submissão (criar vs. atualizar)
 * e a comunicação com o store global (Zustand).
 * @param {object} params - Parâmetros do hook.
 * @param {object} [params.task] - A tarefa existente a ser editada. Se for nulo, o formulário estará em modo de criação.
 * @param {Function} params.onClose - Função de callback para fechar o formulário/modal após a submissão.
 * @returns {object} - Retorna o estado dos campos, seus setters, e os manipuladores de eventos para o componente de UI.
 */
export const useTaskForm = ({ task, onClose }) => {
    const { addTask, updateTask, addNotification } = useTaskStore();

    const [title, setTitle] = useState(task ? task.title : '');
    const [status, setStatus] = useState(task ? task.status : 'Em andamento');
    const [author, setAuthor] = useState(task ? task.author : '');
    const [description, setDescription] = useState(task ? task.description : '');

    /**
     * Memoiza o array de opções para o select de status.
     * `useMemo` previne que este array seja recriado em cada renderização, otimizando a performance.
     * @type {Array<object>}
     */
    const statusOptions = useMemo(() => [
        { value: 'Em andamento', label: 'Em andamento' },
        { value: 'Concluída', label: 'Concluída' },
        { value: 'Atrasada', label: 'Atrasada' },
        { value: 'Pendente', label: 'Pendente' },
    ], []);

    /**
     * Manipulador de submissão do formulário.
     * Previne o comportamento padrão do formulário, valida os campos e chama a ação apropriada.
     * @param {React.FormEvent} e - O evento do formulário.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !author || !description || !status) {
            addNotification({
                type: 'warning',
                message: 'Por favor, preencha o título, o autor, a descrição e o status.',
            });
            return;
        }

        if (task) {
            const updatedTaskPayload = {
                ...task,
                title,
                status,
                author,
                description,
            };
            updateTask(task.id, updatedTaskPayload);
        } else {
            const newTaskPayload = {
                title,
                status,
                author,
                description,
                createdAt: new Date().toISOString(),
            };
            addTask(newTaskPayload);
        }

        onClose();
    };

    return {
        title,
        setTitle,
        status,
        setStatus,
        author,
        setAuthor,
        description,
        setDescription,
        statusOptions,
        handleSubmit
    };
};

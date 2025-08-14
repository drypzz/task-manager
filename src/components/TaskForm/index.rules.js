import { useState, useMemo } from 'react';

import useTaskStore from '../../store/useTaskStore';

export const useTaskForm = ({ task, onClose }) => {
    const { addTask, updateTask } = useTaskStore();

    const [title, setTitle] = useState(task ? task.title : '');
    const [status, setStatus] = useState(task ? task.status : 'Em andamento');
    const [author, setAuthor] = useState(task ? task.author : '');
    const [description, setDescription] = useState(task ? task.description : '');

    const statusOptions = useMemo(() => [
        { value: 'Em andamento', label: 'Em andamento' },
        { value: 'Concluída', label: 'Concluída' },
        { value: 'Atrasada', label: 'Atrasada' },
        { value: 'Pendente', label: 'Pendente' },
    ], []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !author) {
            alert("Por favor, preencha o título e o autor.");
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

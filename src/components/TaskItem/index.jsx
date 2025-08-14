import React, { useState } from 'react';

import useTaskStore from '../../store/useTaskStore';

import TaskForm from '../TaskForm';

import { FaEdit, FaTrash } from 'react-icons/fa';

import { AnimatePresence } from 'framer-motion';

import { Item, TaskInfo, TaskTitle, TaskStatus, Actions, ActionButton } from './styles';

const TaskItem = ({ task }) => {
    const { deleteTask } = useTaskStore();
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
        if (window.confirm(`Tem certeza que deseja excluir a tarefa "${task.title}"?`)) {
            deleteTask(task.id);
        }
    };

    const handleEdit = () => setIsEditing(true);
    const handleCloseModal = () => setIsEditing(false);

    return (
        <>
            <Item
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                layout
            >
                <TaskInfo>
                    <TaskTitle>{task.title}</TaskTitle>
                    <TaskStatus status={task.status}>{task.status}</TaskStatus>
                </TaskInfo>
                <Actions>
                    <ActionButton title="Editar Tarefa" onClick={handleEdit}>
                        <FaEdit />
                    </ActionButton>
                    <ActionButton title="Excluir Tarefa" onClick={handleDelete} danger>
                        <FaTrash />
                    </ActionButton>
                </Actions>
            </Item>
            <AnimatePresence>
                {isEditing && <TaskForm task={task} onClose={handleCloseModal} />}
            </AnimatePresence>
        </>
    );
};

export default TaskItem;
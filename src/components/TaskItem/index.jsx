import React from 'react';

import { FaEdit, FaTrash } from 'react-icons/fa';

import { AnimatePresence } from 'framer-motion';

import TaskForm from '../TaskForm';

import { Item, TaskInfoLink, TaskTitle, TaskStatus, Actions, ActionButton } from './styles';

import { useTaskItem } from './index.rules';

const TaskItem = ({ task, itemNumber }) => {
    const { isEditing, handleDelete, handleEdit, handleCloseModal } = useTaskItem({ task });

    return (
        <>
            <Item
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                layout
            >
                <TaskInfoLink to={`/task/${task.id}`}>
                    {/* <ItemNumber>{itemNumber}.</ItemNumber> */}
                    <TaskStatus $status={task.status} title={task.status} />
                    <TaskTitle>{task.title}</TaskTitle>
                </TaskInfoLink>
                <Actions>
                    <ActionButton title="Editar Tarefa" onClick={handleEdit}>
                        <FaEdit />
                    </ActionButton>
                    <ActionButton title="Excluir Tarefa" onClick={handleDelete} $danger>
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
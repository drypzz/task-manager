import React, { useState } from 'react';

import useTaskStore from '../../store/useTaskStore';

import CustomSelect from '../CustomSelect';

import {
    ModalBackdrop,
    ModalContent,
    Form,
    Label,
    Input,
    ButtonContainer,
    Button,
} from './styles';

const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 50, scale: 0.95 },
};

const TaskForm = ({ task, onClose }) => {
    const { addTask, updateTask } = useTaskStore();
    const [title, setTitle] = useState(task ? task.title : '');
    const [status, setStatus] = useState(task ? task.status : 'Em andamento');

    const statusOptions = [
        { value: 'Em andamento', label: 'Em andamento' },
        { value: 'Concluída', label: 'Concluída' },
        { value: 'Atrasada', label: 'Atrasada' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) return;

        const newTask = {
            title,
            status,
        };

        if (task) {
            updateTask(task.id, { ...task, ...newTask });
        } else {
            addTask({ ...newTask, id: Date.now() });
        }

        onClose();
    };

    return (
        <ModalBackdrop>
            <ModalContent
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
                <h2>{task ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
                <Form onSubmit={handleSubmit}>
                    <Label>
                        Título:
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Label>
                    <Label>
                        Status:
                        <CustomSelect
                            options={statusOptions}
                            value={status}
                            onChange={(value) => setStatus(value)}
                        />
                    </Label>
                    <ButtonContainer>
                        <Button type="submit">{task ? 'Salvar' : 'Adicionar'}</Button>
                        <Button type="button" onClick={onClose} secondary>Cancelar</Button>
                    </ButtonContainer>
                </Form>
            </ModalContent>
        </ModalBackdrop>
    );
};

export default TaskForm;
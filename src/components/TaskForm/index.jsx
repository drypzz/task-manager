import React, { useState } from 'react';

import ReactDOM from 'react-dom';

import useTaskStore from '../../store/useTaskStore';

import CustomSelect from '../CustomSelect';

import {
    ModalBackdrop,
    ModalContent,
    Form,
    Label,
    Input,
    Textarea,
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
    const [author, setAuthor] = useState(task ? task.author : '');
    const [description, setDescription] = useState(task ? task.description : '');

    const statusOptions = [
        { value: 'Em andamento', label: 'Em andamento' },
        { value: 'Concluída', label: 'Concluída' },
        { value: 'Atrasada', label: 'Atrasada' },
        { value: 'Pendente', label: 'Pendente' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !author) {
            alert("Por favor, preencha o título e o autor.");
            return;
        };

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

    return ReactDOM.createPortal(
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
                        Autor:
                        <Input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </Label>

                    <Label>
                        Status:
                        <CustomSelect
                            options={statusOptions}
                            width='100%'
                            value={status}
                            onChange={(value) => setStatus(value)}
                        />
                    </Label>

                    <Label>
                        Descrição:
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Label>

                    <ButtonContainer>
                        <Button type="submit">{task ? 'Salvar' : 'Adicionar'}</Button>
                        <Button type="button" onClick={onClose} $secondary>
                            Cancelar
                        </Button>
                    </ButtonContainer>
                </Form>
            </ModalContent>
        </ModalBackdrop>,
        document.getElementById('modal-root')
    );
};

export default TaskForm;
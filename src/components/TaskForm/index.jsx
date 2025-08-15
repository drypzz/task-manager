import React from 'react';
import ReactDOM from 'react-dom';

import CustomSelect from '../CustomSelect';

import { ModalBackdrop, ModalContent, Form, Label, Input, Textarea, ButtonContainer, Button } from './styles';

import { useTaskForm } from './index.rules';

// Variantes para a animação do modal com Framer Motion.
const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 50, scale: 0.95 },
};

/**
 * Componente de UI para o formulário de criação/edição de tarefas.
 * Renderiza o modal e seus campos, mas toda a sua lógica de estado e submissão
 * é gerenciada pelo hook `useTaskForm`.
 * @param {object} props - Propriedades do componente.
 * @param {object} [props.task] - A tarefa a ser editada. Se não for fornecida, o formulário entra em modo de criação.
 * @param {Function} props.onClose - Função para fechar o modal.
 */
const TaskForm = ({ task, onClose }) => {
    const { title, setTitle, status, setStatus, author, setAuthor, description, setDescription, statusOptions, handleSubmit } = useTaskForm({ task, onClose });

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
                        />
                    </Label>

                    <Label>
                        Autor:
                        <Input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </Label>

                    <Label>
                        Status:
                        <CustomSelect
                            options={statusOptions}
                            width='100%'
                            value={status}
                            onChange={setStatus}
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

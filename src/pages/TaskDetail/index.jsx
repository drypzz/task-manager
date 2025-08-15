import React from 'react';

import { FaArrowLeft, FaUser, FaCalendarAlt, FaBoxOpen } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import { useTaskDetail } from './index.rules';

import { DetailContainer, NoTasksFound, LoadingContainer, Spinner, DetailCard, CardHeader, TaskTitle, TaskStatus, CardBody, Description, Metadata, MetaItem, BackButton } from './styles';

/**
 * Componente de UI que representa a página de detalhes de uma tarefa.
 * É um componente "burro" (dumb component), pois sua única responsabilidade é renderizar a interface
 * com base nos dados recebidos do hook `useTaskDetail`.
 */
const TaskDetail = () => {
    const { isLoading, task, formattedDate } = useTaskDetail();

    if (isLoading) {
        return (
            <LoadingContainer>
                <Spinner />
                <p>Carregando detalhes...</p>
            </LoadingContainer>
        );
    }

    if (!task) {
        return (
            <DetailContainer>
                <NoTasksFound>
                    <FaBoxOpen size={50} />
                    <h3>Tarefa não encontrada</h3>
                </NoTasksFound>
            </DetailContainer>
        );
    }

    return (
        <DetailContainer>
            <BackButton as={Link} to="/">
                <FaArrowLeft />
                Voltar para a lista
            </BackButton>
            <DetailCard>
                <CardHeader>
                    <TaskTitle>{task.title}</TaskTitle>
                    <TaskStatus $status={task.status}>{task.status}</TaskStatus>
                </CardHeader>
                <CardBody>
                    <Metadata>
                        <MetaItem>
                            <FaUser />
                            <span>{task.author}</span>
                        </MetaItem>
                        <MetaItem>
                            <FaCalendarAlt />
                            <span>{formattedDate}</span>
                        </MetaItem>
                    </Metadata>
                    <Description>{task.description}</Description>
                </CardBody>
            </DetailCard>
        </DetailContainer>
    );
};

export default TaskDetail;
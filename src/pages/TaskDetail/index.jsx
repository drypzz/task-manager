import React, { useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';

import useTaskStore from '../../store/useTaskStore';

import { FaArrowLeft, FaUser, FaCalendarAlt } from 'react-icons/fa';

import {
    DetailContainer,
    Loading,
    DetailCard,
    CardHeader,
    TaskTitle,
    TaskStatus,
    CardBody,
    Description,
    Metadata,
    MetaItem,
    BackButton,
} from './styles';

const TaskDetail = () => {
    const { taskId } = useParams();
    const { currentTask, isCurrentTaskLoading, fetchTaskById } = useTaskStore();

    useEffect(() => {
        fetchTaskById(taskId);
    }, [taskId, fetchTaskById]);

    if (isCurrentTaskLoading) {
        return <Loading>Carregando detalhes da tarefa...</Loading>;
    }

    if (!currentTask) {
        return (
            <DetailContainer>
                <p>Tarefa não encontrada.</p>
                <BackButton as={Link} to="/">
                    <FaArrowLeft />
                    Voltar para a lista
                </BackButton>
            </DetailContainer>
        );
    }

    const formattedDate = new Date(currentTask.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    return (
        <DetailContainer>
            <BackButton as={Link} to="/">
                <FaArrowLeft />
                Voltar para a lista
            </BackButton>
            <DetailCard>
                <CardHeader>
                    <TaskTitle>{currentTask.title}</TaskTitle>
                    <TaskStatus $status={currentTask.status}>{currentTask.status}</TaskStatus>
                </CardHeader>
                <CardBody>
                    <Metadata>
                        <MetaItem>
                            <FaUser />
                            <span>{currentTask.author}</span>
                        </MetaItem>
                        <MetaItem>
                            <FaCalendarAlt />
                            <span>{formattedDate}</span>
                        </MetaItem>
                    </Metadata>
                    <Description>{currentTask.description}</Description>
                </CardBody>
            </DetailCard>
        </DetailContainer>
    );
};

export default TaskDetail;
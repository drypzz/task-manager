import React from 'react';

import { FaArrowLeft, FaUser, FaCalendarAlt } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import { useTaskDetail } from './index.rules';

import { DetailContainer, Loading, DetailCard, CardHeader, TaskTitle, TaskStatus, CardBody, Description, Metadata, MetaItem, BackButton } from './styles';

const TaskDetail = () => {
    const { isLoading, task, formattedDate } = useTaskDetail();

    if (isLoading) {
        return <Loading>Carregando detalhes da tarefa...</Loading>;
    }

    if (!task) {
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
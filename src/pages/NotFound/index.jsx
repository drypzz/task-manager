import React from 'react';

import { Link } from 'react-router-dom';

import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

import { NotFoundContainer, IconWrapper, Title, Message, BackButton } from './styles';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
};

const NotFound = () => {
    return (
        <NotFoundContainer
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <IconWrapper variants={itemVariants}>
                <FaExclamationTriangle />
            </IconWrapper>
            <Title variants={itemVariants}>Página Não Encontrada</Title>
            <Message variants={itemVariants}>
                A página que você está procurando não existe ou foi movida.
            </Message>
            <BackButton as={Link} to="/" variants={itemVariants}>
                <FaArrowLeft />
                Voltar para o Início
            </BackButton>
        </NotFoundContainer>
    );
};

export default NotFound;
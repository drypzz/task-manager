import React from 'react';

import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

import useTaskStore from '../../store/useTaskStore';

import { PopUpContainer, IconWrapper, Message, CloseButton } from './styles';

/**
 * Um objeto de configuração que mapeia o tipo de notificação ('success', 'warning', etc.)
 * para um componente de ícone específico e uma chave de cor correspondente no tema.
 * Isso permite que o componente seja facilmente estendido com novos tipos de notificação.
 */
const notificationTypes = {
    success: { Icon: FaCheckCircle, color: 'success' },
    warning: { Icon: FaExclamationTriangle, color: 'warning' },
    danger: { Icon: FaTimesCircle, color: 'danger' },
    info: { Icon: FaInfoCircle, color: 'info' },
};

/**
 * Componente de UI que renderiza uma única notificação (PopUp/Toast).
 * É responsável por exibir a mensagem, o ícone apropriado e a animação.
 * @param {object} props - Propriedades do componente.
 * @param {object} props.notification - O objeto da notificação a ser exibido.
 * @param {string} props.notification.message - A mensagem a ser mostrada.
 * @param {number} props.notification.id - O ID único da notificação.
 * @param {'success'|'warning'|'danger'|'info'} [props.notification.type='info'] - O tipo da notificação, que define o estilo e o ícone.
 */
const PopUp = ({ notification }) => {
    const removeNotification = useTaskStore((state) => state.removeNotification);
    const { type = 'info', message, id } = notification;
    const { Icon, color } = notificationTypes[type];

    return (
        <PopUpContainer
            $type={type}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            layout
        >
            <IconWrapper $color={color}>
                <Icon />
            </IconWrapper>
            <Message>{message}</Message>
            <CloseButton onClick={() => removeNotification(id)} />
        </PopUpContainer>
    );
};

export default PopUp;
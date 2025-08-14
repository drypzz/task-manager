import React from 'react';

import { AnimatePresence } from 'framer-motion';

import useTaskStore from '../../store/useTaskStore';

import PopUp from '../PopUp';

import { NotificationContainer } from './styles';

/**
 * Componente container responsável por renderizar todas as notificações ativas.
 * Ele se posiciona de forma fixa na tela e atua como um "centro de notificações",
 * gerenciando a exibição e a animação de múltiplos pop-ups.
 */
const NotificationCenter = () => {
    const notifications = useTaskStore((state) => state.notifications);

    return (
        <NotificationContainer>
            <AnimatePresence>
                {notifications.map((notification) => (
                    <PopUp key={notification.id} notification={notification} />
                ))}
            </AnimatePresence>
        </NotificationContainer>
    );
};

export default NotificationCenter;

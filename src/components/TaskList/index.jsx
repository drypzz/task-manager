import React from 'react';

import { FixedSizeList as List } from 'react-window';

import AutoSizer from 'react-virtualized-auto-sizer';

import { FaBoxOpen } from 'react-icons/fa';

import { ListContainer, LoadingContainer, Spinner, NoTasksFound } from './styles';

import { useTaskList } from './index.rules';

/**
 * Componente de UI responsável por renderizar a lista de tarefas.
 * Utiliza `react-window` para virtualização, garantindo alta performance
 * ao renderizar apenas os itens visíveis na tela.
 * A lógica de dados é gerenciada pelo hook `useTaskList`.
 */
const TaskList = () => {
    const { filteredTasks, isLoading, Row } = useTaskList();

    if (isLoading) {
        return (
            <LoadingContainer>
                <Spinner />
                <p>Carregando tarefas...</p>
            </LoadingContainer>
        );
    }

    if (!filteredTasks.length) {
        return (
            <NoTasksFound>
                <FaBoxOpen size={50} />
                <h3>Nenhuma tarefa encontrada</h3>
                <p>Tente alterar os filtros ou adicione uma nova tarefa.</p>
            </NoTasksFound>
        );
    }

    return (
        <ListContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        height={height}
                        itemCount={filteredTasks.length}
                        itemSize={60}
                        width={width}
                    >
                        {Row}
                    </List>
                )}
            </AutoSizer>
        </ListContainer>
    );
};

export default TaskList;

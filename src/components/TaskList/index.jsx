import { FixedSizeList as List } from 'react-window';

import AutoSizer from 'react-virtualized-auto-sizer';

import { FaBoxOpen } from 'react-icons/fa';

import useTaskStore from '../../store/useTaskStore';

import TaskItem from '../TaskItem';

import { ListContainer, LoadingContainer, Spinner, NoTasksFound } from './styles';

const TaskList = () => {
    const { filteredTasks, isLoading, page, pageSize } = useTaskStore();

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
        )
    }

    const Row = ({ index, style }) => {
        const itemNumber = (page - 1) * pageSize + index + 1;

        return (
            <div style={style}>
                <TaskItem task={filteredTasks[index]} itemNumber={itemNumber} />
            </div>
        );
    };

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
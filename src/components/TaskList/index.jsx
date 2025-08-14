import AutoSizer from 'react-virtualized-auto-sizer';

import useTaskStore from '../../store/useTaskStore';

import TaskItem from '../TaskItem';

import { FixedSizeList as List } from 'react-window';

import { ListContainer, LoadingText, NoTasksFound } from './styles';

const TaskList = () => {
    const { filteredTasks, isLoading } = useTaskStore();

    if (isLoading) {
        return <LoadingText>Carregando tarefas...</LoadingText>;
    }

    if (!filteredTasks.length) {
        return <NoTasksFound>Nenhuma tarefa encontrada.</NoTasksFound>;
    }

    const Row = ({ index, style }) => (
        <div style={style}>
            <TaskItem task={filteredTasks[index]} />
        </div>
    );

    return (
        <ListContainer>
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
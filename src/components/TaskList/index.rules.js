import useTaskStore from '../../store/useTaskStore';

import TaskItem from '../TaskItem';

export const useTaskList = () => {
    const { filteredTasks, isLoading, page, pageSize } = useTaskStore();

    const getRowRenderer = () => {
        return ({ index, style }) => {
            const itemNumber = (page - 1) * pageSize + index + 1;
            return (
                <div style={style}>
                    <TaskItem task={filteredTasks[index]} itemNumber={itemNumber} />
                </div>
            );
        };
    };

    return {
        filteredTasks,
        isLoading,
        Row: getRowRenderer()
    };
};

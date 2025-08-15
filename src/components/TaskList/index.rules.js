import useTaskStore from '../../store/useTaskStore';

import { useDraggableList } from '../../hooks/useDraggableList';

import TaskItem from '../TaskItem';

import { DraggableItem } from './styles';

/**
 * Hook customizado para gerenciar a lógica da lista de tarefas, agora com funcionalidade de arrastar e soltar.
 * Ele busca os dados do store, inicializa o hook de drag-and-drop e prepara os itens para renderização.
 * @returns {object} - Retorna o estado de carregamento e o array de elementos JSX prontos para serem renderizados.
 */
export const useTaskList = () => {
    const { filteredTasks, isLoading, reorderTasks } = useTaskStore();

    const {
        items,
        handleDragStart,
        handleDragEnter,
        handleDragEnd,
        draggingIndex,
    } = useDraggableList(filteredTasks, reorderTasks);

    /**
     * Mapeia a lista de itens (já na ordem correta gerenciada pelo useDraggableList)
     * para componentes JSX, aplicando as propriedades de drag-and-drop a cada um.
     * @type {Array<JSX.Element>}
     */
    const draggableTasks = items.map((task, index) => (
        <DraggableItem
            key={task.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            $isDragging={draggingIndex === index}
        >
            <TaskItem task={task} />
        </DraggableItem>
    ));

    return {
        isLoading,
        draggableTasks,
        hasTasks: items.length > 0,
    };
};

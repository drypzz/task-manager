import { useState, useRef, useEffect } from 'react';

/**
 * Hook customizado para gerenciar a lógica de arrastar e soltar (drag and drop) de uma lista.
 * @param {Array<object>} externalItems - A lista de itens vinda de uma fonte externa.
 * @param {Function} onReorder - Callback a ser chamado com a lista reordenada.
 */
export const useDraggableList = (externalItems, onReorder) => {
    const [items, setItems] = useState(externalItems);

    const [draggingIndex, setDraggingIndex] = useState(null);

    useEffect(() => {
        setItems(externalItems);
    }, [externalItems]);

    const dragItemIndex = useRef(null);
    const dragOverItemIndex = useRef(null);

    /**
     * Inicia o arrasto de um item.
     * @param {number} index - O índice do item que está sendo arrastado.
     */
    const handleDragStart = (index) => {
        dragItemIndex.current = index;
        setDraggingIndex(index);
    };

    /**
     * Entra na área de arrasto de um item.
     * @param {number} index - O índice do item que está sendo arrastado.
     */
    const handleDragEnter = (index) => {
        dragOverItemIndex.current = index;
    };

    /**
     * Finaliza o arrasto de um item.
     */
    const handleDragEnd = () => {
        if (dragOverItemIndex.current === null) {
            setDraggingIndex(null);
            return;
        }

        const _items = [...items];
        const draggedItem = _items.splice(dragItemIndex.current, 1)[0];
        _items.splice(dragOverItemIndex.current, 0, draggedItem);

        if (onReorder && dragItemIndex.current !== null && dragOverItemIndex.current !== null) {
            if (dragItemIndex.current !== dragOverItemIndex.current) {
                onReorder(dragItemIndex.current, dragOverItemIndex.current);
            }
        }

        dragItemIndex.current = null;
        dragOverItemIndex.current = null;

        setDraggingIndex(null);

        setItems(_items);
    };

    return {
        items,
        draggingIndex,
        handleDragStart,
        handleDragEnter,
        handleDragEnd,
    };
};

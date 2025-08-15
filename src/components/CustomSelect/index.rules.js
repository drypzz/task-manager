import { useState, useRef, useMemo } from 'react';

import useOnClickOutside from '../../hooks/useOnClickOutside';

/**
 * Hook customizado para gerenciar a lógica de estado de um componente de select.
 * Encapsula o controle de abertura/fechamento, seleção de item e detecção de clique externo.
 * @param {object} params - Parâmetros do hook.
 * @param {Array<object>} params.options - O array de opções a serem exibidas.
 * @param {*} params.value - O valor atualmente selecionado.
 * @param {Function} params.onChange - A função de callback a ser chamada quando uma nova opção é selecionada.
 * @returns {object} - Retorna um objeto com o estado e os manipuladores para o componente de UI.
 */
export const useCustomSelect = ({ options, value, onChange }) => {
    /** @type {[boolean, Function]} isOpen - Estado que controla a visibilidade do dropdown. */
    const [isOpen, setIsOpen] = useState(false);

    /** @type {React.useRef} wrapperRef - Referência para o elemento principal do select, usada para detectar cliques externos. */
    const wrapperRef = useRef(null);

    // Hook que executa uma função (fechar o dropdown) quando um clique ocorre fora do elemento referenciado.
    useOnClickOutside(wrapperRef, () => setIsOpen(false));

    /**
     * Manipulador para a seleção de um item.
     * Invoca o callback `onChange` do pai e fecha o dropdown.
     * @param {*} optionValue - O valor da opção que foi selecionada.
     */
    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    /**
     * Encontra e memoiza o objeto da opção selecionada.
     * O uso de `useMemo` otimiza a performance, evitando que a busca no array `options`
     * seja executada em cada renderização, a menos que `options` ou `value` mudem.
     * @type {object|undefined}
     */
    const selectedOption = useMemo(
        () => options.find((opt) => opt.value === value),
        [options, value]
    );

    return {
        isOpen,
        setIsOpen,
        wrapperRef,
        handleSelect,
        selectedOption
    };
};

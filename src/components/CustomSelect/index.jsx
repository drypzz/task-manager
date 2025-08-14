import React from 'react';

import { FaChevronDown } from 'react-icons/fa';

import { AnimatePresence } from 'framer-motion';

import { SelectWrapper, SelectHeader, SelectedValue, DropdownIcon, DropdownList, DropdownItem } from './styles';

import { useCustomSelect } from './index.rules';

/**
 * Componente de UI para um select customizado e estilizado.
 * Este é um componente "controlado", recebendo seu valor e a função de callback via props.
 * A lógica de estado é abstraída pelo hook `useCustomSelect`.
 * @param {object} props - Propriedades do componente.
 * @param {Array<object>} props.options - Array de opções no formato `{ value: any, label: string }`.
 * @param {*} props.value - O valor atual do select.
 * @param {Function} props.onChange - Função a ser chamada na seleção de um item.
 * @param {string} props.placeholder - Texto a ser exibido quando nenhum valor está selecionado.
 * @param {string} [props.width='220px'] - Largura customizável para o componente.
 */
const CustomSelect = ({ options, value, onChange, placeholder, width = '220px' }) => {

    const { isOpen, setIsOpen, wrapperRef, handleSelect, selectedOption } = useCustomSelect({
        options,
        value,
        onChange
    });

    return (
        <SelectWrapper ref={wrapperRef} width={width}>
            <SelectHeader onClick={() => setIsOpen(!isOpen)}>
                <SelectedValue>
                    {selectedOption ? selectedOption.label : placeholder}
                </SelectedValue>
                <DropdownIcon animate={{ rotate: isOpen ? 180 : 0 }}>
                    <FaChevronDown />
                </DropdownIcon>
            </SelectHeader>

            <AnimatePresence>
                {isOpen && (
                    <DropdownList
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {options.map((option) => (
                            <DropdownItem
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                $is_selected={option.value === value}
                            >
                                {option.label}
                            </DropdownItem>
                        ))}
                    </DropdownList>
                )}
            </AnimatePresence>
        </SelectWrapper>
    );
};

export default CustomSelect;

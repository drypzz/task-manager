import React from 'react';

import { FaChevronDown } from 'react-icons/fa';

import { AnimatePresence } from 'framer-motion';

import { SelectWrapper, SelectHeader, SelectedValue, DropdownIcon, DropdownList, DropdownItem } from './styles';

import { useCustomSelect } from './index.rules';

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

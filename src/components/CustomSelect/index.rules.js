import { useState, useRef, useMemo } from 'react';

import useOnClickOutside from '../../hooks/useOnClickOutside';

export const useCustomSelect = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useOnClickOutside(wrapperRef, () => setIsOpen(false));

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

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

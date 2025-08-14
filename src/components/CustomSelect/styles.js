import styled from 'styled-components';

import { motion } from 'framer-motion';

export const SelectWrapper = styled.div`
  position: relative;
  width: 220px;
  font-family: ${({ theme }) => theme.fonts.main};

  @media screen and (max-width: 960px) {
      width: 100%;
  }
`;

export const SelectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1.5)};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

export const SelectedValue = styled.span`
  color: ${({ theme }) => theme.colors.font};
`;

export const DropdownIcon = styled(motion.div)`
  color: ${({ theme }) => theme.colors.fontSecondary};
  display: flex;
  align-items: center;
`;

export const DropdownList = styled(motion.ul)`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  list-style: none;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(1)};
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`;

export const DropdownItem = styled.li`
  padding: ${({ theme }) => theme.spacing(1.5)};
  color: ${({ theme, is_selected }) => (is_selected ? theme.colors.accent : theme.colors.font)};
  background-color: ${({ theme, is_selected }) => (is_selected ? theme.colors.primary : 'transparent')};
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
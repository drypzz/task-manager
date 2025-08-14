import styled from 'styled-components';

import { motion } from 'framer-motion';

import { FaTimes } from 'react-icons/fa';

export const PopUpContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.font};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 5px solid ${({ theme, $type }) => theme.colors[$type] || theme.colors.info};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 350px;
  max-width: 90vw;
`;

export const IconWrapper = styled.div`
  font-size: 1.5rem;
  color: ${({ theme, $color }) => theme.colors[$color]};
  flex-shrink: 0;
`;

export const Message = styled.p`
  flex-grow: 1;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
`;

export const CloseButton = styled(FaTimes)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.fontSecondary};
  transition: color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.font};
  }
`;
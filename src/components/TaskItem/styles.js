import styled, { css } from 'styled-components';

import { motion } from 'framer-motion';

const statusColors = {
  'Concluída': css`background: ${({ theme }) => theme.colors.success};`,
  'Atrasada': css`background: ${({ theme }) => theme.colors.danger};`,
  'Em andamento': css`background: ${({ theme }) => theme.colors.warning};`,
};

export const Item = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TaskInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  flex: 1;
  min-width: 0; /* Para o ellipsis funcionar */
`;

export const TaskTitle = styled.span`
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TaskStatus = styled.span`
  padding: ${({ theme }) => theme.spacing(0.5)} ${({ theme }) => theme.spacing(1.5)};
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #111;
  ${({ status }) => statusColors[status] || statusColors['Em andamento']};
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const ActionButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.fontSecondary};
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, background-color 0.2s ease;

  &:hover {
    color: ${({ danger, theme }) => (danger ? theme.colors.danger : theme.colors.accent)};
    background-color: ${({ theme }) => theme.colors.border};
  }
`;
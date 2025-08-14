import styled, { css } from 'styled-components';

import { motion } from 'framer-motion';

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  max-width: 1200px;
  margin: 0 auto;

  @media screen and (max-width: 960px) {
    padding: ${({ theme }) => theme.spacing(2)};
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};

  @media screen and (max-width: 960px) {
    font-size: 2rem;
  }
`;

export const NewTaskButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)};
  font-size: 1rem;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.colors.accent};
  }
`;

export const Filters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;
`;

const FilterBase = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing(1.5)};
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

export const SearchWrapper = styled(FilterBase)`
  flex: 1;
  min-width: 250px;

  svg {
    color: ${({ theme }) => theme.colors.fontSecondary};
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1.5)};
  font-size: 1rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.font};
  outline: none;
`;

export const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};

  @media screen and (max-width: 960px){
    justify-content: center;
  }
`;

export const PageInfo = styled.span`
  color: ${({ theme }) => theme.colors.fontSecondary};
  font-size: 0.9rem;
`;

export const NavButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.font};
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  margin-left: ${({ theme }) => theme.spacing(1)};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.fontSecondary};
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const StatusLegend = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  padding-right: ${({ theme }) => theme.spacing(1)};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.fontSecondary};
`;

const statusColors = {
  'Concluída': css`background: ${({ theme }) => theme.colors.success};`,
  'Atrasada': css`background: ${({ theme }) => theme.colors.danger};`,
  'Em andamento': css`background: ${({ theme }) => theme.colors.warning};`,
  'Pendente': css`background: ${({ theme }) => theme.colors.info};`,
};

export const LegendColorCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  ${({ $status }) => statusColors[$status] || statusColors['Em andamento']};
`;
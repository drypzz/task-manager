import styled from 'styled-components';

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
    background: #ff6b81; /* Um tom mais claro do accent */
  }
`;

export const Filters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
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
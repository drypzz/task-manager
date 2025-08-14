import styled, { keyframes } from 'styled-components';

import { motion } from 'framer-motion';

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  margin-top: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.fontSecondary};
`;

export const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

export const ListContainer = styled(motion.div)`
  height: 65vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
`;

export const NoTasksFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: ${({ theme }) => theme.spacing(4)};
  gap: ${({ theme }) => theme.spacing(1.5)};
  text-align: center;
  color: ${({ theme }) => theme.colors.fontSecondary};
  opacity: 0.6;

  svg {
    margin-bottom: ${({ theme }) => theme.spacing(1)};
    font-size: 3.5rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.font};
    margin: 0;
  }

  p {
    font-size: 1rem;
    margin: 0;
    max-width: 300px;
    line-height: 1.5;
  }
`;
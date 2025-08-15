import styled, { css, keyframes } from 'styled-components';

import { motion } from 'framer-motion';

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const DetailContainer = styled.div`
  max-width: 800px;
  margin: ${({ theme }) => theme.spacing(4)} auto;
  padding: 0 ${({ theme }) => theme.spacing(2)};
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

export const BackButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
`;

export const DetailCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const TaskTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.font};
`;

const statusColors = {
  'Concluída': css`background: ${({ theme }) => theme.colors.success};`,
  'Atrasada': css`background: ${({ theme }) => theme.colors.danger};`,
  'Em andamento': css`background: ${({ theme }) => theme.colors.warning};`,
  'Pendente': css`background: ${({ theme }) => theme.colors.info};`,
};

export const TaskStatus = styled.span`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #111;
  white-space: nowrap;
  ${({ $status }) => statusColors[$status] || statusColors['Em andamento']};
`;

export const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
`;

export const Metadata = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  color: ${({ theme }) => theme.colors.fontSecondary};
  flex-wrap: wrap;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  white-space: pre-wrap;
`;
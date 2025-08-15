import styled from 'styled-components';

import { motion } from 'framer-motion';

export const NotFoundContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.font};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing(2)};
`;

export const IconWrapper = styled(motion.div)`
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.warning};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.font};
`;

export const Message = styled(motion.p)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.fontSecondary};
  max-width: 400px;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const BackButton = styled(motion.a)`
  display: inline-flex;
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
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;
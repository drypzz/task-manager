import styled from 'styled-components';

import { motion } from 'framer-motion';

export const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing(3)};
    color: ${({ theme }) => theme.colors.accent};
  }

  @media screen and (max-width: 960px) {
    padding: 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.fontSecondary};
`;

export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing(1.5)};
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.font};
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Textarea = styled.textarea`
  padding: ${({ theme }) => theme.spacing(1.5)};
  font-size: 1rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.font};
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  resize: none;
  min-height: 120px;
  font-family: ${({ theme }) => theme.fonts.main};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};

  @media screen and (max-width: 960px) {
    justify-content: center;
  }
`;

export const Button = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 300ms ease-in-out;

  color: white;

  background: ${({ $secondary, theme }) => ($secondary ? 'red' : theme.colors.accent)};
  border: 1px solid ${({ $secondary, theme }) => ($secondary ? theme.colors.border : 'transparent')};

  &:hover {
    transform: translateY(-2px);
    opacity: .8;
  }
`;
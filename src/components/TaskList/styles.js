import styled from 'styled-components';

import { motion } from 'framer-motion';

export const ListContainer = styled(motion.div)`
  height: 65vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden; /* Garante que os cantos arredondados sejam aplicados à lista virtual */
`;

export const LoadingText = styled.p`
  font-size: 1.2rem;
  text-align: center;
  padding: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.fontSecondary};
`;

export const NoTasksFound = styled(LoadingText)`
  /* Pode ser o mesmo estilo do loading ou algo diferente */
`;
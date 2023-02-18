import React, { ReactNode } from 'react';

import { Box } from '@mui/material';

interface FormButtonsContainerProps {
  children?: ReactNode;
}

const FormButtonsContainer: React.FC<FormButtonsContainerProps> = ({ children }) => {
  return (
    <Box display="flex" alignItems={'center'} justifyContent={'center'} sx={{ p: 4 }}>
      {children}
    </Box>
  );
};

export default FormButtonsContainer;

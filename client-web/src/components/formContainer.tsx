import React, { ReactNode } from 'react';

import { Box } from '@mui/material';

interface FormContainerProps {
  children?: ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <Box border={1} borderRadius={4} sx={{ p: 4, m: 4 }}>
      {children}
    </Box>
  );
};

export default FormContainer;

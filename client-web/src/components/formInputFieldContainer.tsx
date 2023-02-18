import React, { ReactNode } from 'react';

import { Box } from '@mui/material';

interface FormInputFieldContainerProps {
  children?: ReactNode;
}

const FormInputFieldContainer: React.FC<FormInputFieldContainerProps> = ({ children }) => {
  return (
    <Box display="flex" alignItems={'center'} justifyContent={'center'} sx={{ p: 4, px: 8 }}>
      {children}
    </Box>
  );
};

export default FormInputFieldContainer;

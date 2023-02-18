import { Box, Typography } from '@mui/material';

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <Box p={5}>
      <Typography>{title}</Typography>
    </Box>
  );
};

export default PageTitle;

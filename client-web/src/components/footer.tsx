import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Box
        textAlign="center"
        sx={{
          backgroundColor: 'light grey',
        }}
      >
        <Typography fontSize="0.75rem">&copy; {new Date().getFullYear()} </Typography>
      </Box>
    </footer>
  );
};

export default Footer;

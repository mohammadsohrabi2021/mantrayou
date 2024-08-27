import { useRouter } from 'next/router';
import Link from 'next/link';
import { Container, Typography, Button, Box, IconButton } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Failure() {
  const router = useRouter();
  const { tracking_number } = router.query;

  const handleCopy = () => {
    navigator.clipboard.writeText(tracking_number).then(() => {
      toast.success('کد رهگیری شما با موفقیت کپی شد!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  return (
    <Container 
      maxWidth="sm" 
      style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '20px',
        textAlign: 'center'
      }}
    >
      <SentimentVeryDissatisfiedIcon style={{ fontSize: '5rem', color: '#f44336' }} />
      <Typography 
        variant="h5" 
        gutterBottom 
        style={{ 
          fontFamily: 'iran-sans, sans-serif', 
          marginTop: '20px', 
          fontWeight: 'bold',
          color: '#333'
        }}
      >
        پرداخت با خطا مواجه شد!
      </Typography>
      <Box 
        display="flex" 
        alignItems="center" 
        style={{ 
          marginTop: '10px',
          color: '#555'
        }}
      >
        <Typography 
          variant="body1" 
          style={{ 
            fontFamily: 'iran-sans, sans-serif',
            fontSize: '1rem',
            marginRight: '10px'
          }}
        >
          کد رهگیری شما: <strong>{tracking_number}</strong>
        </Typography>
        <IconButton onClick={handleCopy} aria-label="copy" size="small">
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box mt={4}>
        <Link href="/dashboard" passHref>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ 
              fontFamily: 'iran-sans', 
              bgcolor: '#000',
              fontSize: '0.875rem',
              padding: '10px 20px'
            }} 
            size="large"
          >
            مشاهده لیست سفارشات من
          </Button>
        </Link>
      </Box>
      <ToastContainer />
    </Container>
  );
}

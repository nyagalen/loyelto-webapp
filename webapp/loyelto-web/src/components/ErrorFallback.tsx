import { Box, Button, Typography, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

/**
 * Props for the ErrorFallback component.
 */
interface ErrorFallbackProps {
  /** The error that was caught */
  error: Error | null;
  /** Callback to reset the error boundary */
  onReset?: () => void;
}

/**
 * Fallback UI displayed when an error is caught by ErrorBoundary.
 *
 * Shows a user-friendly error message with option to retry.
 */
export function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  const isDev = import.meta.env.DEV;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          textAlign: 'center',
          gap: 2,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main' }} />
        <Typography variant="h5" component="h1">
          Something went wrong
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We apologize for the inconvenience. Please try again.
        </Typography>
        {isDev && error && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: 'grey.100',
              borderRadius: 1,
              maxWidth: '100%',
              overflow: 'auto',
            }}
          >
            <Typography variant="caption" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
              {error.message}
              {'\n\n'}
              {error.stack}
            </Typography>
          </Box>
        )}
        {onReset && (
          <Button variant="contained" onClick={onReset} sx={{ mt: 2 }}>
            Try Again
          </Button>
        )}
      </Box>
    </Container>
  );
}

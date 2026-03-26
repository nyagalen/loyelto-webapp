import { Box, Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { useTheme, Theme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { ENV } from '../config/env';
import { useScroll } from './ScrollContext';
import { waitlistFormSchema, WaitlistFormData } from '../validation/schemas';

/**
 * Field-level errors for the waitlist form.
 */
interface FieldErrors {
  enterprise?: string;
  phone?: string;
  email?: string;
}

/**
 * WaitlistForm allows users to sign up for the waitlist.
 * Validates input using Zod schemas and sends form data via EmailJS.
 */
export default function WaitlistForm() {
  const theme = useTheme<Theme>();
  const { waitlistRef } = useScroll();
  const [formData, setFormData] = useState<WaitlistFormData>({
    enterprise: "",
    phone: "",
    email: ""
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const { t } = useTranslation();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear field error when user starts typing
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    // Validate form data with Zod
    const result = waitlistFormSchema.safeParse(formData);
    if (!result.success) {
      const errors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FieldErrors;
        errors[field] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }

    emailjs.init(ENV.EMAILJS_PUBLIC_KEY);

    const templateParams = {
      enterprise_name: formData.enterprise,
      phone_number: formData.phone,
      email: formData.email,
      message: `New waitlist signup from enterprise ${formData.enterprise}. Phone ${formData.phone}. Email: ${formData.email}`,
    };

    emailjs.send(
      ENV.EMAILJS_SERVICE_ID,
      ENV.EMAILJS_TEMPLATE_ID,
      templateParams
    )
      .then(() => {
        setSnackbar({
          open: true,
          message: 'Formulaire envoyé avec succès!',
          severity: 'success'
        });
        setFormData({ enterprise: "", phone: "", email: "" });
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: 'Échec de l\'envoi du formulaire. Veuillez réessayer.',
          severity: 'error'
        });
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      ref={waitlistRef}
      sx={{
        bgcolor: theme.palette.success.light, // Light green background similar to your screenshot
        padding: 4,
        borderRadius: 6,
        width: '100%',
        // marginX: {sm:'auto', xs: 0},
        my: 4,
        textAlign: "center"
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        {t('waitListFormHeading')}
      </Typography>

      <Box
        id="WaitlistFormBox"
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 3,
          width: { sm: 600 },// Constrain the form fields for better readability
          mx: "auto" // Center the form within the full-width container
        }}
      >
        <Box sx={{ mb: 2, textAlign: "left" }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
            {t('waitListFormCompany')}:
          </Typography>
          <TextField
            required
            fullWidth
            name="enterprise"
            id="EnrepriseField"
            type="text"
            value={formData.enterprise}
            onChange={handleChange}
            variant="outlined"
            error={!!fieldErrors.enterprise}
            helperText={fieldErrors.enterprise}
            sx={{ bgcolor: "white" }}
          />
        </Box>

        <Box sx={{ mb: 2, textAlign: "left" }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
            {t('waitListFormPhone')}:
          </Typography>
          <TextField
            required
            fullWidth
            name="phone"
            id="PhoneField"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            variant="outlined"
            error={!!fieldErrors.phone}
            helperText={fieldErrors.phone}
            sx={{ bgcolor: "white" }}
          />
        </Box>

        <Box sx={{ mb: 3, textAlign: "left" }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
            {t('waitListFormEmail')}:
          </Typography>
          <TextField
            required
            fullWidth
            type="email"
            name="email"
            id="EmailField"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
            sx={{ bgcolor: "white" }}
          />
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disableElevation
          sx={{
            mt: 5,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 'bold',
            textTransform: 'none',
            "&:hover": {
              bgcolor: "#7ac0fa"
            }
          }}
        >
          {t('waitListFormButton')}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
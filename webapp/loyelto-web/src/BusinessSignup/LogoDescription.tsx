import { Stack, Button, Typography, TextField, Grid, Alert } from "@mui/material"
import { useTheme, Theme } from '@mui/material/styles';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { getAccessToken } from '@privy-io/react-auth';
import { ENV } from '../config/env';
import { logger } from '../utils/logger';

/**
 * Props for the LogoDescription component.
 */
interface LogoDescriptionProps {
    /** Callback function invoked when logo and description are submitted. */
    handleSubmit: (values: string[]) => void;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

async function uploadLogoToServer(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const authToken = await getAccessToken();

    const response = await fetch(`${ENV.API_BASE_URL}/api/v1/uploads/business/logo`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${authToken}`,

        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Upload failed");
    }

    const data = await response.json()
    return data.url
}


/**
 * Form component for uploading business logo and entering description.
 */
export default function LogoDescription({ handleSubmit }: LogoDescriptionProps) {
    const [logoSrc, setLogoSrc] = useState<string | undefined>(undefined);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const theme = useTheme<Theme>();

    const handleLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setUploadError(null);
        try {
            const uploadedUrl = await uploadLogoToServer(file)
            setLogoSrc(uploadedUrl);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            logger.error('Logo upload failed', error instanceof Error ? error : undefined, {
                fileName: file.name,
                fileSize: file.size,
            });
            setUploadError('Failed to upload logo. Please try again.');
        }
    }
    return (
        <Stack component="form" justifyContent='space-between'
            onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;

                const descriptionInput = form.elements.namedItem("Description") as HTMLInputElement;
                logoSrc && handleSubmit([logoSrc, descriptionInput.value])

            }}
            sx={{
                backgroundColor: theme.palette.neutral.light,
                borderRadius: 10,
                width: { xs: '100vw', sm: 440 },
                boxSizing: 'border-box',
                height: { xs: 587, sm: 600 },
                paddingY: 4,
                paddingX: 2,
                alignSelf: 'center'
            }}>
            <Stack sx={{ paddingY: 3 }} spacing={1}>
                <Grid container spacing={2} sx={{ pb: 3 }}>
                    <Grid size={6}>
                        <Typography variant="h5" sx={{ fontWeight: 500, fontSize: 20 }}>
                            Logo
                        </Typography>
                    </Grid>
                    <Grid size={6}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            endIcon={<AddIcon />}
                            disableElevation
                            size="medium"
                            color="info"
                            fullWidth
                            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, fontSize: 16 }}
                        >
                            Add
                            <VisuallyHiddenInput
                                required
                                type="file"
                                onChange={handleLogoChange}
                                multiple
                            />
                        </Button>
                    </Grid>
                </Grid>
                {uploadError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {uploadError}
                    </Alert>
                )}
                <Typography variant="h5" sx={{ fontWeight: 500, fontSize: 20 }}>
                    Description of your business
                </Typography>
                <TextField
                    required
                    id="Description"
                    name="description"

                    multiline
                    rows={4}
                    placeholder="Example: cozy Italian restaurant offering fresh pasta, espresso, and homemade desserts in a homely ambiance (max 140 symbols)"
                    sx={{
                        bgcolor: "white",
                        borderRadius: 3,
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "none"
                        }
                    }}
                />
            </Stack>
            <Button fullWidth disableElevation size="large" color="success" variant="contained" type="submit"
                sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 2,
                    py: 1.5
                }}
            >
                Next
            </Button>

        </Stack>

    )
}
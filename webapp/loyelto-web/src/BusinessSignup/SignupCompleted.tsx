import { useEffect, useMemo, useState } from 'react';
import { Typography, Box, Alert } from "@mui/material"
import { getAccessToken } from '@privy-io/react-auth';
import { ENV } from '../config/env';
import { logger } from '../utils/logger';

/**
 * Business data structure for signup.
 */
interface BusinessData {
    /** Business name */
    name: string | null;
    /** URL-friendly business identifier */
    slug: string | null;
    /** Owner's email address */
    owner_email: string | null;
    /** Country */
    country: string | null;
    /** City */
    city: string | null;
    /** Street address */
    address: string | null;
    /** Postal code */
    zip_code: string | null;
    /** Logo image URL */
    logo_url: string | null;
    /** Business description */
    description: string | null;
    /** Loyalty rate (points per currency unit) */
    rate_loyl: number;
}

/**
 * Props for the SignupCompleted component.
 */
interface SignupCompletedProps {
    /** Business data to submit to the API. */
    businessData: BusinessData;
}

/**
 * Displays completion message after business signup and submits data to API.
 */
export default function SignupCompleted({ businessData }: SignupCompletedProps) {
    const stableBusinessData = useMemo(() => businessData, [businessData]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const sendPostRequest = async (data: BusinessData) => {
            try {
                const authToken = await getAccessToken();
                const response = await fetch(`${ENV.API_BASE_URL}/api/v1/businesses/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                logger.error('Failed to submit business data', error instanceof Error ? error : undefined, {
                    businessName: data.name,
                });
                setError('Failed to complete signup. Please try again.');
            }
        };

        sendPostRequest(stableBusinessData);
    }, [stableBusinessData]);

    return (
        <Box>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
            </Typography>
        </Box>
    )
}
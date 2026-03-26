import { Stack, Typography, Stepper, Step, IconButton, Grid, Alert } from "@mui/material";
import { useState, useCallback } from "react";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import FormInstance from "./FormInstance";
import LogoDescription from "./LogoDescription";
import LoylRateForm from "./LoylRateForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getAccessToken } from '@privy-io/react-auth';
import { useNavigate } from 'react-router';
import ThanksWaitForRedirect from "./ThanksWaitForRedirect";
import { ENV } from '../config/env';
import { logger } from '../utils/logger';

const formProps = [
    [
        ["Name of your business", "text", "EntrepriseField", "name"],
        ["Email", "email", "EmailField", "owner_email"]
    ],
    [
        ["Country", "text", "CountryField", "country"],
        ["City", "text", "CityField", "city"],
        ["Address", "text", "AddressField", "address"],
        ["Zip code", "number", "ZipCodeField", "zip_code"]
    ]
]

const QontoConnector = styled(StepConnector)(({ theme }) => ({

    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 2px)',
        right: 'calc(50% + 2px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#90ceff',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#90ceff',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#eaeaf0',
        borderTopWidth: 5,
        borderRadius: 3,
        ...theme.applyStyles('dark', {
            borderColor: theme.palette.grey[800],
        }),
    },
}));

/**
 * Steps manages the multi-step business signup form.
 *
 * Handles form navigation, data collection, and API submission
 * across multiple signup steps.
 */
/**
 * Business data structure for the multi-step signup form.
 */
interface BusinessData {
    name: string | null;
    slug: string | null;
    owner_email: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    zip_code: string | null;
    logo_url: string | null;
    description: string | null;
    rate_loyl: number;
}

export default function Steps() {
    const [activeStep, setActiveStep] = useState(0);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [businessData, setBusinessData] = useState<BusinessData>({
        name: null, slug: null, owner_email: null, country: null, city: null,
        address: null, zip_code: null, logo_url: null,
        description: null, rate_loyl: 0
    });

    const navigate = useNavigate();

    const toSnakeCase = useCallback((str: string): string => {
        return str
            .trim()
            .replace(/\s+/g, '_')
            .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
            .replace(/^_+/, '')
            .toLowerCase();
    }, []);

    const sendBusinessDataWithData = useCallback(async (data: BusinessData): Promise<boolean> => {
        setSubmitError(null);
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
            return true;
        } catch (error) {
            logger.error('Failed to submit business data', error instanceof Error ? error : undefined, {
                businessName: data.name,
            });
            setSubmitError('Failed to submit business data. Please try again.');
            return false;
        }
    }, []);

    const handleNameEmail = (nameEmail: string[]): void => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setBusinessData((prevData) => ({
            ...prevData,
            "name": nameEmail[0],
            "owner_email": nameEmail[1],
            "slug": toSnakeCase(nameEmail[0])
        }));
    }

    const handleGeography = (geography: string[]): void => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setBusinessData((prevData) => ({
            ...prevData,
            "country": geography[0],
            "city": geography[1],
            "address": geography[2],
            "zip_code": geography[3]
        }));
    }

    const handleLogoDescription = (logoDescription: string[]): void => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setBusinessData((prevData) => ({
            ...prevData,
            "logo_url": logoDescription[0],
            "description": logoDescription[1]
        }));
    }

    const handleLoylRate = async (rate: number): Promise<void> => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setBusinessData((prevData) => ({ ...prevData, "rate_loyl": rate }));

        const updatedData = { ...businessData, "rate_loyl": rate };
        const success = await sendBusinessDataWithData(updatedData);

        if (success) {
            navigate("/business-main", { replace: true });
        }
    }

    const steps = [
        { name: 'nameEmail', component: <FormInstance handleSubmit={handleNameEmail} fieldsAndParams={formProps[0]} /> },
        { name: 'geography', component: <FormInstance handleSubmit={handleGeography} fieldsAndParams={formProps[1]} /> },
        { name: 'logoDescription', component: <LogoDescription handleSubmit={handleLogoDescription} /> },
        { name: 'rate', component: <LoylRateForm handleSubmit={handleLoylRate} /> },
        { name: 'completed', component: <ThanksWaitForRedirect />  }
    ];

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    return (
        <>
            <Stack spacing={3} >
                <Grid container sx={{ alignSelf: 'center', width: 440 }}>
                    <Grid size={2}>
                        <IconButton onClick={handleBack} disabled={activeStep === 0} size="large" color="inherit" sx={{ pl: 0, pt: 1 }}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Grid>
                    <Grid size={8}>
                        <Typography variant="h1" color="initial" textAlign='center' sx={{ fontSize: 28, fontWeight: 600 }}>
                            Fill out your profile
                        </Typography>
                    </Grid>
                    <Grid size={2}></Grid>
                </Grid>
                {submitError && (
                    <Alert severity="error" sx={{ mx: 'auto', width: 440 }}>
                        {submitError}
                    </Alert>
                )}
                <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} 
                sx={{ width: { xs: '50%', sm: '20%' }, alignSelf: 'center' }}>
                    {steps.map((step) => (
                        <Step key={step.name}></Step>
                    ))}
                </Stepper>
                {activeStep < steps.length - 1 && <Typography variant="caption" textAlign='center' color="initial" gutterBottom >
                    Step {activeStep + 1} /4</Typography>}
                {steps[activeStep]?.component}
            </Stack>
        </>
    )
}
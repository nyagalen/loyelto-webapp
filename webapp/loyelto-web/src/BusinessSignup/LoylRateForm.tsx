import { useState } from 'react';
import { Stack, Alert, Button } from "@mui/material"
import { useTheme, Theme } from '@mui/material/styles';
import RateFieldHeading from "./RateFieldHeading";
import LoylRateInput from "./LoylRateInput";

/**
 * Props for the LoylRateForm component.
 */
interface LoylRateFormProps {
    /** Callback function invoked when a valid rate is submitted. */
    handleSubmit: (rate: number) => void;
}

/**
 * Form component for calculating the loyalty rate based on average spend and points per purchase.
 * Validates inputs before calculating to prevent division by zero.
 */
export default function LoylRateForm({ handleSubmit }: LoylRateFormProps) {
    const theme = useTheme<Theme>();
    const [error, setError] = useState<string | null>(null);

    return (
        <Stack component="form" justifyContent='space-between'
            onSubmit={(e) => {
                e.preventDefault();
                setError(null);

                const form = e.target as HTMLFormElement;
                const averageSpend = form.elements.namedItem("AverageSpend") as HTMLInputElement;
                const avSp = Number(averageSpend.value)
                const pointsPurchase = form.elements.namedItem("PointsPurchase") as HTMLInputElement;
                const pPurch = Number(pointsPurchase.value)

                if (pPurch <= 0) {
                    setError('Points per purchase must be greater than zero');
                    return;
                }

                if (avSp <= 0) {
                    setError('Average purchase must be greater than zero');
                    return;
                }

                const rate = avSp / pPurch;

                handleSubmit(rate)
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
            <Stack id="formFieldsStack">
                <RateFieldHeading h="Average Purchase (€)" />
                <LoylRateInput initialValue={8} step={1} id="AverageSpend" />
                <RateFieldHeading h="Points per Purchase" />
                <LoylRateInput initialValue={100} step={10} id="PointsPurchase" />

            </Stack>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Button fullWidth disableElevation size="large" color="success"
                variant="contained" type="submit"
                sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 2,
                    py: 1.5
                }}>
                Next
            </Button>

        </Stack>
    )

}
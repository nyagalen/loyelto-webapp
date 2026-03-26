import { Stack, Button } from "@mui/material"
import { useTheme, Theme } from '@mui/material/styles';
import FormFieldElement from "./FormFieldElement";


/**
 * Props for the FormInstance component.
 */
type FormInstanceProps = {
    /** Form submission handler callback */
    handleSubmit: (values: string[]) => void;
    /** Array of field configuration arrays [heading, type, fieldId, fieldName] */
    fieldsAndParams: string[][] | null;
};

/**
 * FormInstance renders a multi-field form with dynamic fields.
 *
 * Collects field values and passes them to the submit handler.
 */
export default function FormInstance({ handleSubmit, fieldsAndParams }: FormInstanceProps) {
    const theme = useTheme<Theme>();
    return (
        <Stack component="form" justifyContent='space-between'
            onSubmit={(e) => {
                e.preventDefault();
                const values: string[] = []
                const form = e.target as HTMLFormElement;
                fieldsAndParams?.forEach((f) => {
                    const input = form.elements.namedItem(f[2]) as HTMLInputElement;
                    values.push(input.value)
                })

                handleSubmit(values)
            }}
            sx={{
                backgroundColor: theme.palette.neutral.light,
                borderRadius: 10,
                width: {xs:'100vw', sm: 440},
                boxSizing: 'border-box',
                height: {xs: 587, sm: 600},
                paddingY: 4,
                paddingX: 2,
                alignSelf: 'center'
            }}>
            <Stack sx={{ paddingY: 1 }} spacing={4}>
                {fieldsAndParams && fieldsAndParams.map((f, i) => {
                    return <FormFieldElement key={i} heading={f[0]} type={f[1]} fieldId={f[2]} fieldName={f[3]} />
                })}

            </Stack>
            <Button fullWidth disableElevation size="large" color="success" variant="contained" type="submit"
                sx={{
                    fontSize: 16,
                    fontWeight: 600, 
                    textTransform: 'none',
                    borderRadius: 2, py: 1.5
                }}
            >
                Next
            </Button>

        </Stack>
    )
}
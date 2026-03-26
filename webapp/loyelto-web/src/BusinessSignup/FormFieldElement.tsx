import { Typography, TextField, Box } from "@mui/material"
import { usePrivy } from "@privy-io/react-auth";

/**
 * Props for the FormFieldElement component.
 */
interface FormFieldProps {
    /** Field label text */
    heading: string,
    /** Input field type (text, email, number, etc.) */
    type: string,
    /** Unique field identifier */
    fieldId: string,
    /** Field name attribute */
    fieldName: string
}

/**
 * FormFieldElement renders a form input field with label.
 *
 * Handles different input types and integrates with Privy for email fields.
 */
export default function FormFieldElement({ heading, type, fieldId, fieldName }: FormFieldProps) {
    let email = null;
    if (type === 'email'){
        const {user} = usePrivy()
        email = user?.email?.address;
    }
    return (
        <Box sx={{ mt: 0, mb: '20px' }}>
            <Typography variant="h5" gutterBottom
            sx={{ fontWeight: 500, fontSize: 20 }}
            >
            {heading}
            </Typography>
            <TextField
            required
            fullWidth
            disabled={type.toLowerCase() === "email"}
            name={fieldName}
            id={fieldId}
            type={type.toLowerCase() === "number" ? "text" : type}
            
            slotProps={{
                htmlInput:
                    type.toLowerCase() === "number"
                        ? { inputMode: "numeric", pattern: "[0-9]*" }
                        : undefined
            }}
            
            variant="outlined"
            defaultValue={type === 'email' ? email : undefined}
            key={fieldId}
            sx={{
                backgroundColor: 'white',
                bgcolor: "white",
                borderRadius: 3,
                height: 52,
                "& .MuiOutlinedInput-notchedOutline": {
                border: "none"
                }
            }}
            />
        </Box>
    )
}
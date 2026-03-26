import { Stack, TextField, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";

/**
 * Props for the LoylRateInput component.
 */
interface LoylRateInputProps{
    /** Initial numeric value */
    initialValue: number;
    /** Increment/decrement step value */
    step: number;
    /** Input field identifier */
    id: string;
}

/**
 * LoylRateInput provides a numeric input with increment/decrement buttons.
 *
 * Allows users to adjust a numeric value using buttons or direct input.
 */
export default function LoylRateInput({initialValue, step, id}: LoylRateInputProps){
    const [value, setValue] = useState(initialValue);

    return (
              <Stack direction="row" spacing={1}>
                    <Button disableElevation size="small" variant="contained" color="info"
                        sx={{
                            borderRadius: 2
                        }}
                        onClick={() => {
                            setValue(prev => prev - step)
                        }}
                        >
                            <RemoveIcon /></Button>
                    <TextField
                        required
                        type="text"
                        id={id}
                        value={value}
                        slotProps={{
                            htmlInput: {
                                 inputMode: "numeric",
                            pattern: "[0-9]*",
                            style: { textAlign: 'center',  fontSize: 34, fontWeight: 600, paddingTop: 3, paddingBottom: 3, }
                            }}
                        }
                        sx={{
                            bgcolor: "white",
                            borderRadius: 4,
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none"
                            },
                           
                        }}
                    />
                    <Button disableElevation size="small" variant="contained" color="info"
                        sx={{
                            borderRadius: 2
                        }}
                         onClick={() => {
                            setValue(prev => prev + step)
                        }}
                    ><AddIcon /></Button>
                </Stack>
    )

}
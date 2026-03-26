import { memo } from "react";
import { Typography, Box } from "@mui/material"
import SlogansStack from "./SlogansStack";

/**
 * Props for the SlogansSection component.
 */
interface SlogansProps{
    /** Target audience description */
    forWhom: string;
    /** Background color for slogan boxes */
    bgcolor: string;
    /** Array of slogan objects with text and comment */
    slogans: { slogan: string; comment: string }[];
}

/**
 * SlogansSection displays a collection of marketing slogans.
 *
 * Shows a heading and a stack of slogan boxes for a specific audience.
 * Wrapped in memo to prevent unnecessary re-renders when parent updates.
 */
function SlogansSection({ forWhom, bgcolor, slogans }: SlogansProps) {
    return (
        <Box sx={{marginBottom: 2,  marginX: {sm:'auto', xs: 0}}}>
            <Typography variant="h3" 
            color="initial" 
            sx={{
                textAlign: 'left',
                paddingY: 3,
                fontWeight: '600',
                fontSize: {xs: '2rem', sm: '2.6rem'}
                
                }}>
                {forWhom}
            </Typography>
            <SlogansStack bgcolor={bgcolor} slogans={slogans}></SlogansStack>
        </Box>

    )
}

export default memo(SlogansSection);
import { Box, Typography } from "@mui/material"

/**
 * Props for the SloganBox component.
 */
interface SloganBoxProps {
    /** Main slogan text */
    slogan: string;
    /** Slogan description or comment */
    comment: string;
    /** Background color for the box */
    bgcolor: string;
}

/**
 * SloganBox displays a single slogan with description.
 *
 * Renders a slogan heading and comment text in a colored box.
 */
export default function SloganBox({ slogan, comment, bgcolor }: SloganBoxProps) {
    return (
        <Box 
          sx={{ 
            bgcolor: bgcolor,
            padding: 2,
            borderRadius: 3,
            // minHeight: 130,
            width: '100%',    // Full width within its container
            // display: 'flex',
            // justifyContent: 'center',  
            // flexDirection: 'column'
          }}
        >
            <Typography variant="h5" color="initial"
             sx={{fontWeight: '700'}} gutterBottom>
                    {slogan}
            </Typography>
            <Typography variant="body1" color="initial" gutterBottom>{comment}</Typography>
            
        </Box>
    );
}
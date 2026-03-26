import {Stack, Typography, IconButton} from "@mui/material"
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

/**
 * Props for the RateFieldHeading component.
 */
interface RateFieldHeadingProps {
    /** Heading text */
    h: string
}

/**
 * RateFieldHeading displays a heading with an info icon.
 *
 * Used to label rate input fields with additional information option.
 */
export default function RateFieldHeading({ h }: RateFieldHeadingProps) {
    return (
        <Stack direction="row" sx={{ justifyContent: 'space-between', marginY: 2, }}>
            <Typography variant="h5" color="initial" gutterBottom
                sx={{ fontWeight: '600', fontSize: 20, alignSelf: 'flex-end' }}>{h}</Typography>
            <IconButton size="small" sx={{marginTop: 0}}>
                <InfoOutlineIcon />
            </IconButton>
        </Stack>
    )
}
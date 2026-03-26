import { Stack, Typography, Chip } from "@mui/material";

/**
 * Props for the CustomersOrOffersHeading component.
 */
interface CustomersOrOffersHeadingProps {
    /** Section heading text */
    heading: string;
    /** Numeric value to display in chip badge */
    chipContent: number;
}

/**
 * CustomersOrOffersHeading displays a section heading with a numeric badge.
 *
 * Shows the heading text followed by a colored chip with a count.
 */
export default function CustomersOrOffersHeading({heading, chipContent}: CustomersOrOffersHeadingProps){
    return (
        <Stack direction="row">
                    <Typography variant='h6' color='initial' gutterBottom  sx={{ fontWeight: 500, fontSize: 20 }}>{heading}:</Typography>
                    <Chip label={chipContent} color="success" size="small" sx={{
                        // backgroundColor: theme.palette.info.main,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        marginTop: 0.5,
                        marginLeft: 1
                    }} />
                </Stack>
    )
}
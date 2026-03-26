import { Box, CardMedia } from "@mui/material";
import { useTheme, Theme } from '@mui/material/styles'

/**
 * Props for the OfferImage component.
 */
interface OfferImageProps {
    /** Image URL or path */
    url: string;
}

/**
 * OfferImage displays an offer or promotion image.
 *
 * Renders an image with consistent styling and dimensions.
 */
export default function OfferImage({ url }: OfferImageProps) {
    const theme = useTheme<Theme>();
    return (
        <Box sx={{ backgroundColor: theme.palette.info.light, borderRadius: 1, width: 76 }}>
            <CardMedia
                component="img"
                sx={{ width: 75 }}
                image={url}
                alt="Image of the offer"
            />
        </Box>
    )
}
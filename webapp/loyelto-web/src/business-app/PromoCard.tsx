import { memo } from "react";
import { Card, Box, Stack, Typography, Button, IconButton } from "@mui/material";
import { useTheme, Theme } from '@mui/material/styles'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OfferImage from "./OfferImage";

/**
 * Props for the PromoCard component.
 */
interface PromoCardProps {
    /** Promotion name */
    name: string;
    /** Promotion description */
    description: string;
    /** Current redemption amount */
    amount: number;
    /** Maximum redemption limit */
    outOf: number;
    /** Points required for redemption */
    points: number;
    /** Days until promotion expires */
    expireDays: number;
}

/**
 * PromoCard displays a promotional offer with redemption details.
 *
 * Shows the promotion name, description, redemption progress,
 * points required, and expiration information.
 * Wrapped in memo to prevent unnecessary re-renders.
 */
function PromoCard({ name, description, amount, outOf, points, expireDays }: PromoCardProps) {
    const theme = useTheme<Theme>();
    return (
        <Card variant='outlined' sx={{ padding: 1, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Stack direction="column" sx={{ flexGrow: 1, paddingRight: 3 }}>
                    <Typography variant="h5" color="initial" gutterBottom
                        sx={{ fontWeight: '600', fontSize: '1.3rem' }}
                    >{name}</Typography>
                    <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary' }}>
                        {description}</Typography>
                    <Typography variant='h6' gutterBottom sx={{ fontSize: 14, fontWeight: 700 }}>
                        <span style={{ color: theme.palette.success.dark }}>{amount}</span>/{outOf} left
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>Expires after: <span style={{ color: theme.palette.success.dark, fontWeight: 600 }}>{expireDays} days</span></Typography>
                    <Stack direction="row" spacing={1}>
                        <Button variant='contained' fullWidth color='neutral'
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                                borderRadius: 2,
                                boxShadow: 'none'
                            }}>Edit promo</Button>
                            <IconButton sx={{backgroundColor: theme.palette.error.main, borderRadius: 2, color: theme.palette.error.contrastText}} > <DeleteOutlineIcon /></IconButton>
                    </Stack>
                </Stack>
                <Stack direction="column" sx={{ display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                    }}>
                    <OfferImage url="pizza-nobg.png" />
                    <Stack direction="column" >
                        <Box sx={{ fontSize: '1.7rem', fontWeight: 700, display: 'flex', justifyContent: 'center', color: theme.palette.info.dark }}>
                            {points}
                        </Box>
                        <Box>points</Box>
                    </Stack>
                </Stack>
            </Box>
        </Card>
    )
}

export default memo(PromoCard);
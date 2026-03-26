import { Box, Typography, Stack, IconButton, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles'
import { useTheme, Theme } from '@mui/material/styles'
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import ProgramElement from './ProgramElement';
import CustomersOrOffersHeading from './CustomersOrOffersHeading';
import AddIcon from '@mui/icons-material/Add';
import PromoCard from './PromoCard';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { usePrivyAuth, useBusiness, useBusinessStats } from '../hooks';

const Image = styled('img')({
    width: '100%',
});


/**
 * BusinessMain component - Main dashboard for business users.
 *
 * Displays business wallet balance, customer statistics, and loyalty program information.
 * Redirects to signup if business doesn't exist.
 */
export default function BusinessMain() {
    const theme = useTheme<Theme>();
    const navigate = useNavigate();

    // Authentication and token management
    const { email, token, isLoading: authLoading, isHandshakeSuccessful } = usePrivyAuth();

    // Business data fetching
    const {
        business,
        notFound,
        isLoading: businessLoading
    } = useBusiness(email ?? undefined, token ?? undefined, isHandshakeSuccessful);

    // Business statistics (wallet balance and customer stats)
    const {
        walletBalance,
        customerStats,
        isLoading: statsLoading,
        error: statsError
    } = useBusinessStats(token ?? undefined, !!business);

    // Redirect to signup if business not found
    useEffect(() => {
        if (notFound) {
            navigate("/signup-main", { replace: true });
        }
    }, [notFound, navigate]);

    // Loading state
    if (authLoading || businessLoading || statsLoading) {
        return <p>Loading...</p>;
    }

    // Error state
    if (statsError) {
        return <p>Error: {String(statsError)}</p>;
    }

    // Guard clause - should not reach here if business doesn't exist
    if (!business || !walletBalance || !customerStats) {
        return null;
    }
    return (
        <Box component="main"
            sx={{
                backgroundColor: { sm: theme.palette.info.light },
                boxSizing: 'border-box',
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: '100%'
            }}>
            <Box sx={{ boxSizing: 'border-box', width: { xs: '100vw', sm: 1200 }, alignSelf: 'center', paddingY: 15 }}>
                <Box component='section' sx={{ marginX: { xs: 0, sm: 2 }, alignSelf: 'center' }}>
                    <Typography variant='h1' sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '3rem', paddingY: 4, fontWeight: 600 }}>
                        Welcome to your LoyelTo space
                    </Typography>
                    <Grid container spacing={1} sx={{ width: '100%' }}>
                        <Grid size={{ xs: 12, sm: 4 }}
                            sx={{
                                borderRadius: 3,
                                backgroundColor: 'white',
                                pt: '20px', pb: '16px'
                            }}>
                            <Box component="header" sx={{
                                display: 'flex',
                                flexDirection: "column",
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingX: 6
                            }}>
                                <Typography variant='h4' color='initial' sx={{
                                    fontWeight: 500,
                                    fontSize: { xs: 24, sm: 28 }
                                }} gutterBottom>My balance</Typography>
                                <Stack direction="row" spacing={1}>
                                    <Typography variant='h2' sx={{
                                        fontSize: { xs: '3rem' },
                                        fontWeight: 800,
                                        letterSpacing: '0.1rem'
                                    }}>${walletBalance.balance}</Typography>
                                    <Box sx={{ paddingTop: 1 }}>
                                        <Image src="coin_loyl.png"
                                            sx={{ height: '2.8rem', width: '2.8rem' }}
                                        />
                                    </Box>
                                </Stack>
                                <Typography variant="body2" gutterBottom
                                    sx={{
                                        textAlign: 'center',
                                        color: 'text.secondary'
                                    }}>points you've distributed to the consumers</Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }} sx={{
                            order: { xs: 0, sm: 1 },
                            borderRadius: 3,
                            backgroundColor: 'white',
                            pt: { xs: 0, sm: '20px' }, pb: { xs: 0, sm: '16px' }
                        }}>
                            <Box component="section" sx={{
                                marginX: 2,
                                display: "flex",
                                flexDirection: 'column',
                                pt: { xs: '20px', sm: 0 }, pb: { xs: '8px', sm: 0 }
                            }}>
                                <CustomersOrOffersHeading heading='New customers' chipContent={customerStats.newCustomersThisMonth ?? 0} />
                                <IconButton size="small" sx={{ alignSelf: 'flex-start' }}>
                                    <InfoOutlineIcon />
                                </IconButton>
                                <CustomersOrOffersHeading heading='Total customers' chipContent={customerStats.totalCustomers} />
                                <CustomersOrOffersHeading heading='Active customers (last month)' chipContent={customerStats.activeCustomers} />
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }} sx={{
                            borderRadius: 3,
                            backgroundColor: 'white',
                            pt: { xs: 0, sm: '20px' }, pb: { xs: 0, sm: '16px' }
                        }}>
                            <Box component="section" sx={{ marginX: 2 }}>
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: { xs: 'space-between', sm: 'center' },
                                    pt: { xs: '2px', sm: 0 }, pb: { xs: '2px', sm: 0 }
                                }}>
                                    <Typography variant="h5" color="initial" gutterBottom
                                        sx={{ fontWeight: '500', fontSize: { xs: 20, sm: 28 } }}
                                    >My loyalty program</Typography>
                                    <IconButton size="small" sx={{ alignSelf: 'center' }}>
                                        <InfoOutlineIcon />
                                    </IconButton>
                                </Box>
                                <Stack spacing={1}>
                                    <ProgramElement condition='each €10 spent =' points='5' />
                                    <ProgramElement condition='more than €200 spent =' points='200' />
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box component="section"
                    sx={{
                        marginTop: { xs: 2, sm: 4 },
                        marginX: { xs: 0, sm: 2 },
                        backgroundColor: theme.palette.neutral.light,
                        boxSizing: 'border-box',
                        paddingX: 2,
                        pb: { sm: '40px', xs: '20px' },
                        borderRadius: 4,
                        width: { xs: '100vw', sm: 'auto' },
                        alignSelf: 'center'
                    }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: 'space-between',
                        pt: '26px', pb: '12px'
                    }}>
                        <CustomersOrOffersHeading heading='My active offers' chipContent={5} />
                        <Button variant="contained" color="success" disableElevation endIcon={<AddIcon fontSize='large' />}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 700,
                                fontSize: '1rem',
                                paddingY: 0,
                                borderRadius: 2
                            }}>Add</Button>
                    </Box>
                    <Grid container spacing={1}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <PromoCard name='Free Pizza Margarita' description='Classic  pizza with tomato sauce, mozzarella, and fresh basil' amount={15} outOf={300} points={15} expireDays={15} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <PromoCard name='Free Pizza Margarita' description='Classic  pizza with tomato sauce, mozzarella, and fresh basil' amount={15} outOf={300} points={15} expireDays={15} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <PromoCard name='Free Pizza Margarita' description='Classic  pizza with tomato sauce, mozzarella, and fresh basil' amount={15} outOf={300} points={15} expireDays={15} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}
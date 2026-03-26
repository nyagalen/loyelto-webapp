import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, useScrollTrigger, Button, Grid } from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next';
import LogoSection from './LogoSection';
import { useScroll } from './ScrollContext';

/**
 * Props for the ElevationScroll component.
 */
interface Props {
    /** Child element to apply elevation effect to */
    children?: React.ReactElement<{ elevation?: number }>;
}

/**
 * ElevationScroll applies elevation effect on scroll.
 *
 * Adds shadow to child component when user scrolls down.
 */
function ElevationScroll(props: Props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });
    return children ? React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    })
        : null;
}

/**
 * LoyelToBar is the main navigation bar component.
 * Contains the logo, CTA button, and language toggle.
 */
export default function LoyelToBar(props: Props) {
    const theme = useTheme<Theme>();
    const { i18n } = useTranslation();
    const { scrollToWaitlist } = useScroll();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLang);
    }

    return (
        <ElevationScroll {...props}>
            <AppBar position='fixed'
                sx={{
                    zIndex: 10,
                    backgroundColor: theme.palette.primary.light,
                    left: 0,
                    right: 0,
                    boxSizing: 'border-box',
                    width: '100%'
                }}>
                <Toolbar sx={{
                    paddingRight: { xs: 0, sm: '24px' },
                    width: { sm: 1200, xs: 375 },
                    mx: 'auto'
                }}>
                    <Grid container sx={{ width: '100%' }}>
                        <Grid size={{ xs: 11, sm: 5 }}>
                            <LogoSection imgXs="4rem" imgSm="6.5rem" fsXs="2rem" fsSm="3rem" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }} sx={{
                            display: { xs: 'block', sm: 'flex' }, alignItems: 'center',
                            fontSize: { xs: 16, sm: 28 },
                            fontWeight: 400,
                            order: { xs: 1, sm: 0 },
                            marginY: 1
                        }}>
                            Get our best offer –
                            <Button variant='contained' disableElevation size='small'
                                sx={{
                                    borderRadius: 4,
                                    marginX: 2,
                                    textTransform: 'none',
                                    fontSize: { xs: 16, sm: 26 },
                                    fontWeight: 500,
                                    paddingY: 0,
                                    boxShadow: '0 0 10px  ' + theme.palette.custom.light
                                }}
                                onClick={scrollToWaitlist}
                            >Join the waitlist</Button>
                            today
                        </Grid>
                        <Grid size={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Box>
                                <Button
                                    color="inherit"
                                    size="large"
                                    onClick={toggleLanguage}
                                    sx={{
                                        padding: 0,
                                        fontSize: { xs: '1.5rem', sm: '2rem' },
                                        marginRight: { sm: 4 },
                                        minWidth: 0,
                                    }}
                                >
                                    {i18n.language === 'en' ? '🇫🇷' : '🇬🇧'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    )
}
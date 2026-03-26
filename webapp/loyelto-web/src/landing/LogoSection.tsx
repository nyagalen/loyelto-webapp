import { memo } from "react";
import { Stack, Box, Typography } from "@mui/material"
import { styled } from '@mui/material/styles'
import svgLogo from '../assets/loyelto_cropped.svg'

/**
 * Props for the LogoSection component.
 */
interface LogoSectionProps {
    /** Image size for extra-small screens */
    imgXs: string;
    /** Image size for small screens and up */
    imgSm: string;
    /** Font size for extra-small screens */
    fsXs: string;
    /** Font size for small screens and up */
    fsSm: string;
}

const Image = styled('img')({
    width: '100%',
});

/**
 * LogoSection displays the Loyelto logo and brand text.
 *
 * Responsive component that adjusts logo and text sizes based on screen size.
 * Wrapped in memo to prevent unnecessary re-renders.
 */
function LogoSection({ imgXs, imgSm, fsXs, fsSm }: LogoSectionProps) {
    return (
        <Stack direction="row" spacing={{ xs: 2, sm: 4 }}
            sx={{
                marginTop: 2,
                alignItems: 'center',
                flexGrow: 1
            }}>
            <div style={{ paddingLeft: '1rem' }}>
                <Image src={svgLogo} alt='logo' sx={{
                    height: { xs: imgXs, sm: imgSm },
                    width: { xs: imgXs, sm: imgSm }
                }} />
            </div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around'
            }}>
                <Typography variant="h3" color="initial" sx={{
                    fontSize: { xs: fsXs, sm: fsSm },
                    fontFamily: "Nunito",
                    fontWeight: "bold",
                    letterSpacing: '0.15rem'
                }}>LOYELTO</Typography>
                <Typography variant="subtitle1" sx={{ fontFamily: "Inter" }}>Loyalty Exchange</Typography>
            </Box>
        </Stack>
    )
}

export default memo(LogoSection);
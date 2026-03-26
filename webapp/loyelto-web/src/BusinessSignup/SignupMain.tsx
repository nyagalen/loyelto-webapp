import { Stack, Box } from "@mui/material";
import Steps from "./Steps";
import LoginGate from "./LoginGate";
import LogoSection from "../landing/LogoSection";

/**
 * SignupMain is the main container for the business signup flow.
 *
 * Displays the logo and renders the multi-step signup form.
 */
export default function SignupMain() {
    return (
        <Stack direction="column" component="main"
            sx={{ pt: {xs: 7, sm: 1}, boxSizing: 'border-box' }}>
            <Box sx={{alignSelf: 'center', display: {xs: 'none', sm: 'block'}, mb: 5}}>
                <LogoSection imgXs="4rem" imgSm="4rem" fsXs="2rem" fsSm="2.5rem" />
            </Box>
            <LoginGate>
                <Steps />
            </LoginGate>
        </Stack>
    )
}
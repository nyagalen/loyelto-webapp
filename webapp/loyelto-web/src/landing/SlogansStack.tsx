import { Stack, Box } from "@mui/material";
import SloganBox from "./SloganBox";

/**
 * Props for the SlogansStack component.
 */
interface SloganStackProps{
    /** Background color for slogan boxes */
    bgcolor: string;
    /** Array of slogan objects */
    slogans: { slogan: string; comment: string }[];
}

/**
 * SlogansStack displays a responsive stack of slogan boxes.
 *
 * Arranges slogans in a row on larger screens, column on mobile.
 */
export default function SlogansStack({bgcolor, slogans}: SloganStackProps){
    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} >
            {slogans.map((sl) => {
                return <SloganBox key={sl.slogan} slogan={sl.slogan} comment={sl.comment} bgcolor={bgcolor} />
            })}
        </Stack>
    )
}
import { Link } from "@mui/material";

/**
 * Props for the SocialsLink component.
 */
interface SocialsLinkProps {
    /** Link URL */
    url: string;
    /** Social media platform name */
    social: string;
}

/**
 * SocialsLink renders a link to a social media platform.
 *
 * Opens links in a new tab with proper security attributes.
 */
export default function SocialsLink({ url, social }: SocialsLinkProps) {
    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            sx={{ fontWeight: "bold" }}
        >
            {social} 
        </Link>
    );
}
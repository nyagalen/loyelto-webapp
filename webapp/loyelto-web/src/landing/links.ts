/**
 * Social media link data structure.
 */
interface Link{
    /** Social media platform name */
    social: string;
    /** Link URL */
    url: string;
}

const socialLinks: Link[] = [
    {
        social: "Instagram",
        url: "https://www.instagram.com/loyelto?igsh=Z2x6cTVuZnQ0N3lu"
    },
    {
        social: "LinkedIn",
        url: "https://linkedin.com/company/loyelto"
    },
    {
        social: "Telegram",
        url: "https://t.me/loyelto"
    }
]

export {socialLinks}
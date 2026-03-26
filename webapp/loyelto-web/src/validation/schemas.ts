import { z } from 'zod';

/**
 * Schema for waitlist form validation.
 */
export const waitlistFormSchema = z.object({
    /** Company/enterprise name */
    enterprise: z
        .string()
        .min(1, 'Company name is required')
        .max(100, 'Company name must be less than 100 characters'),
    /** Phone number */
    phone: z
        .string()
        .min(1, 'Phone number is required')
        .regex(/^[+]?[\d\s().-]{6,20}$/, 'Invalid phone number format'),
    /** Email address */
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
});

/**
 * Schema for business signup name and email step.
 */
export const businessNameEmailSchema = z.object({
    /** Business name */
    name: z
        .string()
        .min(1, 'Business name is required')
        .max(100, 'Business name must be less than 100 characters'),
    /** Owner email */
    owner_email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
});

/**
 * Schema for business signup geography step.
 */
export const businessGeographySchema = z.object({
    /** Country */
    country: z
        .string()
        .min(1, 'Country is required')
        .max(100, 'Country must be less than 100 characters'),
    /** City */
    city: z
        .string()
        .min(1, 'City is required')
        .max(100, 'City must be less than 100 characters'),
    /** Street address */
    address: z
        .string()
        .min(1, 'Address is required')
        .max(200, 'Address must be less than 200 characters'),
    /** Postal/zip code */
    zip_code: z
        .string()
        .min(1, 'Zip code is required')
        .max(20, 'Zip code must be less than 20 characters'),
});

/**
 * Schema for loyalty rate form validation.
 */
export const loylRateSchema = z.object({
    /** Average spend per purchase */
    averageSpend: z
        .number()
        .positive('Average spend must be greater than zero'),
    /** Points awarded per purchase */
    pointsPurchase: z
        .number()
        .positive('Points per purchase must be greater than zero'),
});

/**
 * Schema for business logo and description step.
 */
export const businessLogoDescriptionSchema = z.object({
    /** Logo URL */
    logo_url: z
        .string()
        .url('Invalid logo URL'),
    /** Business description */
    description: z
        .string()
        .min(1, 'Description is required')
        .max(140, 'Description must be less than 140 characters'),
});

/**
 * Complete business signup schema.
 */
export const businessSignupSchema = businessNameEmailSchema
    .merge(businessGeographySchema)
    .merge(businessLogoDescriptionSchema)
    .extend({
        /** URL-friendly business slug */
        slug: z.string().nullable(),
        /** Loyalty rate */
        rate_loyl: z.number().min(0),
    });

/** Type for waitlist form data */
export type WaitlistFormData = z.infer<typeof waitlistFormSchema>;

/** Type for business name/email form data */
export type BusinessNameEmailData = z.infer<typeof businessNameEmailSchema>;

/** Type for business geography form data */
export type BusinessGeographyData = z.infer<typeof businessGeographySchema>;

/** Type for loyalty rate form data */
export type LoylRateData = z.infer<typeof loylRateSchema>;

/** Type for logo/description form data */
export type BusinessLogoDescriptionData = z.infer<typeof businessLogoDescriptionSchema>;

/** Type for complete business signup data */
export type BusinessSignupData = z.infer<typeof businessSignupSchema>;

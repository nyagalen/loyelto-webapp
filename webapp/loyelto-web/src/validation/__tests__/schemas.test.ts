import { describe, it, expect } from 'vitest';
import {
    waitlistFormSchema,
    businessNameEmailSchema,
    businessGeographySchema,
    loylRateSchema,
    businessLogoDescriptionSchema,
} from '../schemas';

describe('waitlistFormSchema', () => {
    it('should validate a valid waitlist form', () => {
        const validData = {
            enterprise: 'Test Company',
            phone: '+33612345678',
            email: 'test@example.com',
        };
        const result = waitlistFormSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should reject empty enterprise name', () => {
        const invalidData = {
            enterprise: '',
            phone: '+33612345678',
            email: 'test@example.com',
        };
        const result = waitlistFormSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('enterprise');
        }
    });

    it('should reject invalid email format', () => {
        const invalidData = {
            enterprise: 'Test Company',
            phone: '+33612345678',
            email: 'invalid-email',
        };
        const result = waitlistFormSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('email');
        }
    });

    it('should reject invalid phone format', () => {
        const invalidData = {
            enterprise: 'Test Company',
            phone: 'abc',
            email: 'test@example.com',
        };
        const result = waitlistFormSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('phone');
        }
    });

    it('should accept various valid phone formats', () => {
        const phoneFormats = [
            '+33612345678',
            '0612345678',
            '+1 (555) 123-4567',
        ];
        phoneFormats.forEach((phone) => {
            const data = {
                enterprise: 'Test',
                phone,
                email: 'test@example.com',
            };
            const result = waitlistFormSchema.safeParse(data);
            expect(result.success).toBe(true);
        });
    });
});

describe('businessNameEmailSchema', () => {
    it('should validate valid business name and email', () => {
        const validData = {
            name: 'My Business',
            owner_email: 'owner@business.com',
        };
        const result = businessNameEmailSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should reject empty business name', () => {
        const invalidData = {
            name: '',
            owner_email: 'owner@business.com',
        };
        const result = businessNameEmailSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });

    it('should reject business name exceeding max length', () => {
        const invalidData = {
            name: 'a'.repeat(101),
            owner_email: 'owner@business.com',
        };
        const result = businessNameEmailSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });

    it('should reject invalid email', () => {
        const invalidData = {
            name: 'My Business',
            owner_email: 'not-an-email',
        };
        const result = businessNameEmailSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });
});

describe('businessGeographySchema', () => {
    it('should validate valid geography data', () => {
        const validData = {
            country: 'France',
            city: 'Paris',
            address: '123 Rue de la Paix',
            zip_code: '75001',
        };
        const result = businessGeographySchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should reject empty country', () => {
        const invalidData = {
            country: '',
            city: 'Paris',
            address: '123 Rue de la Paix',
            zip_code: '75001',
        };
        const result = businessGeographySchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });

    it('should reject empty city', () => {
        const invalidData = {
            country: 'France',
            city: '',
            address: '123 Rue de la Paix',
            zip_code: '75001',
        };
        const result = businessGeographySchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });

    it('should reject empty address', () => {
        const invalidData = {
            country: 'France',
            city: 'Paris',
            address: '',
            zip_code: '75001',
        };
        const result = businessGeographySchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });

    it('should reject empty zip code', () => {
        const invalidData = {
            country: 'France',
            city: 'Paris',
            address: '123 Rue de la Paix',
            zip_code: '',
        };
        const result = businessGeographySchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });
});

describe('loylRateSchema', () => {
    it('should validate positive numbers', () => {
        const validData = {
            averageSpend: 10,
            pointsPurchase: 100,
        };
        const result = loylRateSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should reject zero averageSpend', () => {
        const invalidData = {
            averageSpend: 0,
            pointsPurchase: 100,
        };
        const result = loylRateSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });

    it('should reject negative averageSpend', () => {
        const invalidData = {
            averageSpend: -5,
            pointsPurchase: 100,
        };
        const result = loylRateSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });

    it('should reject zero pointsPurchase', () => {
        const invalidData = {
            averageSpend: 10,
            pointsPurchase: 0,
        };
        const result = loylRateSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });

    it('should reject negative pointsPurchase', () => {
        const invalidData = {
            averageSpend: 10,
            pointsPurchase: -50,
        };
        const result = loylRateSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });
});

describe('businessLogoDescriptionSchema', () => {
    it('should validate valid logo and description', () => {
        const validData = {
            logo_url: 'https://example.com/logo.png',
            description: 'A cozy Italian restaurant',
        };
        const result = businessLogoDescriptionSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should reject invalid logo URL', () => {
        const invalidData = {
            logo_url: 'not-a-url',
            description: 'A cozy Italian restaurant',
        };
        const result = businessLogoDescriptionSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });

    it('should reject empty description', () => {
        const invalidData = {
            logo_url: 'https://example.com/logo.png',
            description: '',
        };
        const result = businessLogoDescriptionSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });

    it('should reject description exceeding max length', () => {
        const invalidData = {
            logo_url: 'https://example.com/logo.png',
            description: 'a'.repeat(141),
        };
        const result = businessLogoDescriptionSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });
});

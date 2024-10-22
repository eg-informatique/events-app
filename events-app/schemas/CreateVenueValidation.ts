import type { ComposerTranslation } from 'vue-i18n';
import { z } from 'zod';

const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

export const createVenueValidationSchemas = (t: ComposerTranslation) => {
    return z.object({
        name: z.string().nonempty(t('validation_required')),
        url: z.string().url(t('validation_invalid_url')).optional().or(z.literal('')),
        address: z.string().nonempty(t('validation_required')),
        zipcode: z.number().nonnegative(t('validation_required')).or(z.string()),
        city: z.string().nonempty(t('validation_required')),
        country: z.string().nonempty(t('validation_required')),
        email: z.string().email(t('validation_invalid_email')),
        phone: z.string().nonempty(t('validation_required'))
    });
}

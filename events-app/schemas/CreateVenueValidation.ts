import type { LocaleMessage, RemoveIndexSignature } from '@intlify/core-base';
import type { ComposerTranslation, VueMessageType, LocaleMessageValue } from 'vue-i18n';
import { z } from 'zod';

const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

export const createVenueValidationSchemas = (t: ComposerTranslation<{ [x: string]: LocaleMessage<VueMessageType> }, string, RemoveIndexSignature<{ [x: string]: LocaleMessageValue<VueMessageType> }>, never, string, string>) => {
    return z.object({
        name: z.string().nonempty(t('validation_required')),
        url: z.string().url(t('validation_invalid_url')).optional().or(z.literal('')),
        address: z.string().nonempty(t('validation_required')),
        zipcode: z.number().nonnegative(t('validation_required')),
        city: z.string().nonempty(t('validation_required')),
        country: z.string().nonempty(t('validation_required')),
        email: z.string().email(t('validation_invalid_email')),
        phone: z.string().nonempty(t('validation_required'))
    });
}

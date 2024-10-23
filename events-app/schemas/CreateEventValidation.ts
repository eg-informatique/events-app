import type { ComposerTranslation} from 'vue-i18n';
import { z } from 'zod';

const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export const createEventValidationSchemas = (t: ComposerTranslation) => {
    return z.object({
        title: z.string().max(100, t("title_validation_len")),
        start_datetime: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: t("datetime_validation")
        }),
        end_datetime: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: t("datetime_validation")
        }),
        description: z.string().optional(),
        major_price: z.number().nonnegative(t("price_validation")),
        minor_price: z.number().nonnegative(t("price_validation")),
        img: z.any().refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), t('not_image'))    
    }).refine(data => new Date(data.start_datetime) < new Date(data.end_datetime), {
        message: t("end_datetime_before_start_datetime"),
        path: ['end_datetime']
    }).refine(data => data.minor_price <= data.major_price, {
        message: t("major_under_minor"),
        path: ['minor_price']
    });
}

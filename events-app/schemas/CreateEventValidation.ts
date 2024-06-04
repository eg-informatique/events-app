import type { LocaleMessage, RemoveIndexSignature } from '@intlify/core-base';
import type { ComposerTranslation, VueMessageType, LocaleMessageValue } from 'vue-i18n';
import { z } from 'zod';

const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

export const createEventValidationSchemas = (t: ComposerTranslation<{ [x: string]: LocaleMessage<VueMessageType> }, string, RemoveIndexSignature<{ [x: string]: LocaleMessageValue<VueMessageType> }>, never, string, string>) => {
    return z.object({
        title: z.string().max(100, t("title_validation_len")),
        start_datetime: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: t("start_datetime_validation")
        }),
        end_datetime: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: t("end_datetime_validation")
        }),
        description: z.string().optional(),
        major_price: z.number().nonnegative(t("major_price_validation")),
        minor_price: z.number().nonnegative(t("minor_price_validation")),
        img: z.string().url(t("img_validation"))
    }).refine(data => new Date(data.start_datetime) < new Date(data.end_datetime), {
        message: t("end_datetime_before_start_datetime"),
        path: ['end_datetime']
    });
}

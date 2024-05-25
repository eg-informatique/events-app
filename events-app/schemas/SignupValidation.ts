
import type { LocaleMessage, RemoveIndexSignature } from '@intlify/core-base'
import type { ComposerTranslation, VueMessageType, LocaleMessageValue } from 'vue-i18n'
import { z } from 'zod'

const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/

export const createSignUpValidationSchemas = (t: ComposerTranslation<{ [x: string]: LocaleMessage<VueMessageType> }, string, RemoveIndexSignature<{ [x: string]: LocaleMessageValue<VueMessageType> }>, never, string, string>) => {
    return z.object({
        first_name: z.string()
            .max(64, t("first_name_validation_len"))
            .regex(nameRegex, t("first_name_validation")),
        last_name: z.string()
            .max(64, t("last_name_validation_len"))
            .regex(nameRegex, t("last_name_validation")),
        email: z.string().email(t("email_validation")),
        password: z.string().min(8, t("password_validation")),
        verify_password: z.string()
    }).refine(data => data.password === data.verify_password, {
        message: t("passwords_dont_match"),
        path: ['verify_password']
    })
}
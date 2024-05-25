import type { LocaleMessage, RemoveIndexSignature } from '@intlify/core-base'
import type { ComposerTranslation, VueMessageType, LocaleMessageValue } from 'vue-i18n'
import { z } from 'zod'

export const createLoginValidationSchemas = (t: ComposerTranslation<{ [x: string]: LocaleMessage<VueMessageType> }, string, RemoveIndexSignature<{ [x: string]: LocaleMessageValue<VueMessageType> }>, never, string, string>) => {
    return z.object({
        email: z.string().email(t("email_validation")),
        password: z.string().min(8, t("password_validation"))
    })
}
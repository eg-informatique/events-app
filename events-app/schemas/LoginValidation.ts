import type { ComposerTranslation } from 'vue-i18n'
import { z } from 'zod'

export const createLoginValidationSchemas = (t: ComposerTranslation) => {
    return z.object({
        email: z.string().email(t("email_validation")),
        password: z.string().min(8, t("password_validation"))
    })
}
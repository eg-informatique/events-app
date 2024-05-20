import { z } from 'zod'

export const LoginValidationSchemas = z.object({
    email: z.string().email('Email is not valid'),
    password: z.string().min(8, 'Password to short')
})
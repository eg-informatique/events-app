import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { useFetch } from 'nuxt/app'
export default NuxtAuthHandler({
    pages: {
        signIn:'/login'
    },
    secret: 'polosecrets',
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GithubProvider.default({
           clientId: 'Ov23liguUeojPL4ky0Gi',
           clientSecret: '9989e8c5a1098a874c8886d139cc610abbd48ab8'
        }),
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
            name: 'Credentials',
            authorize(credentials: any) {
                const {data:user} = useFetch('https://events-api.org/login', {method: 'GET', body:{"email":credentials?.email, "password":credentials?.password}})
            }
        })
    ]
})
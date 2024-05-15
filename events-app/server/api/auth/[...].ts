import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createVNode } from 'vue';
export default NuxtAuthHandler({
    pages: {
        signIn:'/login'
    },
    secret: 'polosecrets',
    providers:[
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GithubProvider.default({
           clientId: 'Ov23liguUeojPL4ky0Gi',
           clientSecret: '9989e8c5a1098a874c8886d139cc610abbd48ab8'
        }),
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
            name: 'Credentials',
            async authorize(credentials: any) {
                try{
                    const user = await fetch(`https://events-api.org/login`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        })
                    })

                    if(user.ok) {
                        const userData = await user.json()
                        return userData
                    } else {
                        throw new Error('Failed to authenticate')
                    }
                } catch(error){
                    console.error('Authentication error:', error)
                    throw new Error('Authentication error')
                }
            }
        })
    ]
})
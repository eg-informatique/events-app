import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { addUser } from '../addUser'
import { randomBytes } from 'crypto'

const randomPassword = (length: number) => {
    return randomBytes(Math.ceil(length / 2))
        .toString('hex') // Convertit les octets en une chaîne hexadécimale
        .slice(0, length); // Limite la longueur de la chaîne
};

export default NuxtAuthHandler({
    pages: {
        signIn:'/login'
    },
    secret: 'polosecrets',
    callbacks: {
        async signIn({user, account, profile}) {
            if(account?.provider === 'github') {
                try{
                    console.log("C'est pas")
                    const response = await fetch(`https://events-api.org/user?email=${user.email}`)
                    const data = await response.json()
                    

                    if(response.status === 404 || !data.exists) {
                        const newUser = {
                            first_name: '',
                            last_name: '',
                            email: user.email,
                            password: randomPassword(12)
                        }
                        console.log(newUser)
                        await addUser(newUser)
                    } else if(!response.ok){
                        throw new Error('Failed to fetch user')
                    }
                    return true
                } catch (error) {
                    console.error('Error in signIn callback', error)
                    return false
                }
            } else {
                return true
            }
        }
    },
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
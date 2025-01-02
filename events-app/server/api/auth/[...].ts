import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { addUser } from '../addUserServer'
import { randomBytes } from 'crypto'
import jwt from 'jsonwebtoken'

const config = useRuntimeConfig()

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
    providers:[
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GoogleProvider.default({
            clientId: config.googleAuthClientId,
            clientSecret: config.googleAuthClientSecret,
            authorization: {
                params: {
                    scope: "openid email profile"
                }
            }
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
                        const response = await fetch(`https://events-api.org/user?email=${credentials?.email}`)
                        const userData = await response.json()
                        return{
                            id: userData.user.id,
                            email: userData.user.email,
                            profile: {
                                first_name: userData.user.first_name || '',
                                last_name: userData.user.last_name || '',
                            }
                        }
                    }
                } catch(error){
                    console.error('Authentication error:', error)
                    throw new Error('Authentication error')
                }
            }
        })
    ],
    callbacks: {
        async signIn({user, account, profile}) {
            if(account?.provider === 'google') {
                try{
                    const response = await fetch(`https://events-api.org/user?email=${user.email}`)
                    const data = await response.json()
                    
                    if(response.status === 404 || !data.exists) {
                        const newUser = {
                            first_name: profile.given_name || '',
                            last_name: profile.family_name || '',
                            email: user.email,
                            password: randomPassword(12)
                        }
                        await addUser(newUser)
                    } else if(!response.ok){
                        throw new Error('Failed to fetch user')
                    }
                    return true
                } catch (error) {
                    console.error('Error in signIn callback', error)
                    return false
                }
            } 
            else if(account?.provider === 'credentials' && !user){
                throw new Error('Invalid email or password')
            }
            else {
                return true
            }
        },
        async jwt({ token, user }) {
            if (user) {
                token.jwt = jwt.sign({ email: user.email }, 'polosecrets', { expiresIn: '1h' });
                token.id = user.id;
                token.profile = user.profile || {
                    first_name: user.first_name || '',
                    last_name: user.last_name || ''
                };
            }
            return token;
        },
        async session({ session, token, user }) {
            session.jwt = token.jwt;
            session.id = token.id;
            session.profile = token.profile;
            return session;
        }
    }
})

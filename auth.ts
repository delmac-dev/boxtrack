import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
        credentials: {
            password: {},
        },
        authorize: async (credentials) => {
            let user = null;

            if(credentials.password === "admin@kat") user = {};
    
            if (!user) {
                throw new Error("Invalid credentials.")
            }

            return user
        },
        }),
    ],
    pages: {
        signIn: "/login"
    }
});
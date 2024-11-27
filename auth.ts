import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;

                if (credentials?.password === "admin@kat") {
                    user = { name: "Admin User" };
                }

                return user
            },
        }),
    ],
    pages: {
        signIn: "/login",
        error: "/login"
    }
});
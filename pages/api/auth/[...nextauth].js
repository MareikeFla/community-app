import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/db/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/db/models/User";

export const authOptions = {
  // Configure one or more authentication providers

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // this is only here in order to make it easier for people to test the application
        const testUser = await User.findOne({
          _id: "65fbdcb35895e6679be113b3",
        });

        if (
          credentials.username === process.env.USER_NAME &&
          credentials.password === process.env.USER_PASSWORD
        ) {
          return testUser;
        } else {
          return null;
        }
      },
    }),
  ],

  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_JWT_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token;
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.id;
        try {
          const updatedUser = await User.findById(token.id);
          session.user = {
            ...session.user,
            ...updatedUser.toJSON(),
          };
        } catch (error) {
          console.error("Failed to update session user details", error);
        }

        return session;
      } else {
        return null;
      }
    },
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
  },
};

export default NextAuth(authOptions);

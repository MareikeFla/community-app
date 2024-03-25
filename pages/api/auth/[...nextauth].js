import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/db/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/db/models/User";

export default NextAuth({
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
        const testUser = await User.findOne({ email: "testuser@example.com" });

        if (
          credentials.username === "test" &&
          credentials.password === "test"
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

        return session;
      } else {
        return null;
      }
    },
  },
});

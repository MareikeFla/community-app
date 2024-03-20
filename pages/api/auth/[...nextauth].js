import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/db/mongodb";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import CredentialsProvider from "next-auth/providers/credentials";

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
        if (
          credentials.username === "test" &&
          credentials.password === "test"
        ) {
          return {
            name: "Test User",
            email: "testuser@example.com",
          };
        } else {
          return null;
        }
      },
    }),
  ],

  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    async session({ session, user }) {
      dbConnect();

      const currentUser = await User.findById(user.id);

      if (currentUser.events == null) {
        currentUser.events = [];

        currentUser.save();
      }

      return { ...session, user: { ...session.user, id: user.id } };
    },
  },
});

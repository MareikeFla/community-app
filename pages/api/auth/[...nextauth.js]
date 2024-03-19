import NextAuth from "next-auth";

import GithubProvider from "next-auth/providers/github";

import { MongoDBAdapter } from "@auth/mongodb-adapter";

import clientPromise from "@/db/mongodb";

import dbConnect from "@/db/dbConnect";

import User from "@/db/models/User";

export default NextAuth({
  // Configure one or more authentication providers

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,

      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    async session({ session, user }) {
      dbConnect();

      const currentUser = await User.findById(user.id);

      if (currentUser.favoritePonies == null) {
        currentUser.favoritePonies = [];

        currentUser.save();
      }

      return { ...session, user: { ...session.user, id: user.id } };
    },
  },
});

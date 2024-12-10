import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GOOGLE_EMAIL_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, profile }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GOOGLE_EMAIL_QUERY, {
          email: user.email,
        });
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          _id: user?.id,
          id: user?.id,
          name: user?.name,
          email: user?.email,
          image: user?.image,
        });
      }

      console.log({ user, profile });
      return true;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        const sanityUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_EMAIL_QUERY, {
            email: user?.email,
          });
        token.id = sanityUser?.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        Object.assign(session.user, { id: token.id });
      }
      return session;
    },
  },
});

/*
  first we serarch if the user exists, if exists continue, if not we create the user en sanity
  second whe assign the user id from sanity to the token
  third whe assign the token id to the session

*/

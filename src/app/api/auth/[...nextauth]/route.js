import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/utils/databse";
import User from "@/models/user";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        },
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectDB();

        const userExists = await User.findOne({
          email: profile.email
        });
        if (!userExists) {
          await User.create({
            email: profile.email,
            userName: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture
          })
        }
        return true;

      } catch (error) {
        console.log(error);
        return false;
      }
    },
  }
})

export { handler as GET, handler as POST };
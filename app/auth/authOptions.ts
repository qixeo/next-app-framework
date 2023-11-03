import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma/client';
import { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcrypt';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password)
          throw new Error('Invalid credentials');

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error('Invalid credentials');

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        if (passwordsMatch) return user;
        else {
          throw new Error('Invalid credentials');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // async signIn({ account, profile }) {
    //   if (account?.provider === 'google') {
    //     return profile.email_verified && profile.email.endsWith('@example.com');
    //   }
    //   return true; // Do different verification for other providers that don't have `email_verified`
    // },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session!.user!.id = token.sub; // token.uid or token.sub both work
      }
      return session;
    },
    jwt: async ({ user, token, trigger, session }) => {
      if (user) {
        token.sub = user.id; // token.uid or token.sub both work
      }
      if (trigger === 'update') {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name;
        token.email = session.email;
      }
      return token;
    },
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
};

export default authOptions;

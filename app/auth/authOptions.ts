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
    // async signIn({ user, account, profile, email, credentials }) {
    //   if (user?.error === 'my custom error') {
    //     throw new Error('custom error to the client');
    //   }
    // },
    session: async ({ session, token }) => {
      if (session?.user) {
        session!.user!.id = token.sub; // token.uid or token.sub both work
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id; // token.uid or token.sub both work
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

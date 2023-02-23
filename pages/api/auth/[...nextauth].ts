import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import DiscordProvider from 'next-auth/providers/discord'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from 'lib/prisma'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }: any) {
      return { ...session, user }
    },
  },
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID ?? '',
      clientSecret: process.env.DISCORD_SECRET ?? '',
    }),
  ],
}

export default NextAuth(authOptions)
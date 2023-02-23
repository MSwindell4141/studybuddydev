import type { NextApiRequest, NextApiResponse } from 'next'
import { Conversation, User } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { stringifyUpdatedAt } from './util'
import prisma from './prisma'

export const requireSession = async (
  ctx: any,
  shouldExist: boolean,
  ifValid: (session: Session) => any
) => {
  const session = await getSession(ctx.req, ctx.res)

  if (shouldExist ? !session : session) {
    return {
      redirect: {
        permanent: false,
        destination: shouldExist ? '/sign-in' : '/',
      }
    }
  }
  else if (session) {
    ctx.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59',
    )

    return ifValid(session as Session)
  }
  else {
    return ifValid({} as Session)
  }
}

export const getSession = async (req: NextApiRequest, res: NextApiResponse): Promise<Session | null> =>
  await getServerSession(req, res, authOptions)

export const serverUpdateUser = async (session: Session, data: {}) => {
  if (!session) return

  return await prisma.user.update({
    where: { id: session.user.id },
    data,
  })
}

export const serverGetUser = async (session: Session, where: {}) => {
  if (!session) return

  return await prisma.user.findUnique({ where })
}

export const serverCountUsers = async (session: Session, where: {}) => {
  if (!session) return

  return await prisma.user.count({ where })
}

export const serverSearchUsers = async (session: Session, { name, major, graduate, courses }: any) => {
  if (!session) return

  return await prisma.user.findMany({
    take: 50,
    where: {
      id: { not: session.user.id },
      ...(name && { 
        name: { contains: name, mode: 'insensitive' }
      }),
      ...(major && { major }),
      ...(graduate && { graduate }),
      ...(courses && {
        OR: courses.map((course: Course) => ({ courses: {
          contains: course.status ? JSON.stringify(course) : course.id,
        } }))
      }),
    },
  })
}

export const serverGetConversations = async (session: Session) => {
  if (!session) return

  const conversations = await prisma.conversation.findMany({
    where: { 
      OR: [
        { ownerId: session.user.id },
        { memberId: session.user.id },
      ],
    },
    include: {
      owner: true,
      member: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return conversations.map((c: Conversation) => stringifyUpdatedAt(c))
}

export const serverCountConversations = async (session: Session) => {
  if (!session) return

  return await prisma.conversation.count({
    where: { 
      OR: [
        { ownerId: session.user.id },
        { memberId: session.user.id },
      ],
    },
  })
}

export const serverGetExistingRequest = async (session: Session, toUser: User) => {
  if (!session) return

  return stringifyUpdatedAt(await prisma.conversation.findFirst({
    where: {
      OR: [
        { ownerId: session.user.id, memberId: toUser.id },
        { memberId: session.user.id, ownerId: toUser.id },
      ]
    },
  }))
}

export const serverCreateConversation = async (session: Session, memberId: string) => {
  if (!session) return

  return await prisma.conversation.create({
    data: {
      slug: await serverCountConversations(session),
      ownerId: session.user.id,
      memberId,
    },
  })
}

export const serverUpdateConversation = async (session: Session, id: string) => {
  if (!session) return

  return await prisma.conversation.update({
    where: { id },
    data: { accepted: true },
  })
}

export const serverDeleteConversation = async (session: Session, id: string) => {
  if (!session) return

  return await prisma.conversation.delete({
    where: { id },
  })
}
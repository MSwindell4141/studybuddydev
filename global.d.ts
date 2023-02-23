import { Prisma, User, Session as PrismaSession } from '@prisma/client'

declare global {
  interface Session extends PrismaSession {
    user: User
  }

  type Course = {
    id: string
    status: string
  }
  
  type UserWithCourses = Prisma.UserGetPayload<{
    include: { courses: true }
  }>

  type ConversationWithUsers = Prisma.ConversationGetPayload<{
    include: { owner: true, member: true }
  }>

  type ModalStatus = 'success' | 'error' | 'info'
}
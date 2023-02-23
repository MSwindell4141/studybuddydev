import { Conversation, User } from '@prisma/client'
import { openUI, composeSlug, ping, formToObject } from '@fernui/util'

export const sortUserCourses = (user: User) =>
  (JSON.parse(user?.courses ?? '[]') as Course[])
    .sort((l, r) => l.id.localeCompare(r.id))

export const mapValueTolabel = (collection: any[], value: any) =>
  collection.find(item => item.value === value).label

export const toast = (status: ModalStatus, message: string) =>
  openUI('#toast', { status, message } )

export const confirm = (message: any, confirmText: string, onConfirm: Function) =>
  openUI('#confirm', { message, confirmText, onConfirm } )

export const composeRecordSlug = (recordName: string | null, fallbackName: string, existingCount: number) =>
  (recordName ? composeSlug(recordName) : fallbackName) + '-' + (existingCount - 1)

export const stringifyUpdatedAt = (record: { updatedAt?: Date }) =>
  ({ ...record, ...(record?.updatedAt && { updatedAt: JSON.stringify(record.updatedAt) }) })

export const deleteConversation = async (conversation: Conversation) => {
  const { res } = await ping('/api/prisma', {
    action: 'DELETE_CONVERSATION',
    data: conversation,
  })

  if (res?.status !== 200)
    throw Error()
}

export const sendMessageRequest = async (toUser: User) => {
  const { res } = await ping('/api/prisma', {
    action: 'SEND_REQUEST',
    data: { memberId: toUser.id },
  })

  if (res?.status !== 200)
    throw Error()
}

export const acceptMessageRequest = async (request: Conversation) => {
  const { res } = await ping('/api/prisma', {
    action: 'ACCEPT_REQUEST',
    data: request,
  })

  if (res?.status !== 200)
    throw Error()
}

export const searchUsers = async (params: {}) => {
  const { res, data } = await ping('/api/prisma', {
    action: 'SEARCH_USERS',
    data: params,
  })

  if (res?.status !== 200)
    throw Error()

  return data as User[]
}

export const updateUser = async (e: any) => {
  const { res } = await ping('/api/prisma', {
    action: 'UPDATE_USER',
    data: formToObject(e.target),
  })

  if (res?.status !== 200)
    throw Error()
}
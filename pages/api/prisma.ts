import type { NextApiRequest, NextApiResponse } from 'next'
import { 
  getSession, 
  serverSearchUsers,
  serverUpdateUser,
  serverCreateConversation,
  serverUpdateConversation,
  serverDeleteConversation,
} from 'lib/util.server'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res)
  const { action, data } = req.body

  if (req.method !== 'POST' || !action || !session)
    return res.status(400).end()

  if (action === 'UPDATE_USER') {
    try {
      const { courses, ...rest } = data

      await serverUpdateUser(session, {
        ...rest,
        courses: JSON.stringify(courses ?? []),
      })

      return res.status(200).end()
    }
    catch (err) {
      return res.status(500).json(err)
    }
  }

  if (action === 'SEARCH_USERS') {
    try {
      const users = await serverSearchUsers(session, data)

      return res.status(200).json(users)
    }
    catch (err) {
      return res.status(500).json(err)
    }
  }

  if (action === 'SEND_REQUEST') {
    try {
      const { memberId } = data

      await serverCreateConversation(session, memberId)

      return res.status(200).end()
    }
    catch (err) {
      return res.status(500).json(err)
    }
  }

  if (action === 'ACCEPT_REQUEST') {
    try {
      const { id } = data

      await serverUpdateConversation(session, id)
     
      return res.status(200).end()
    }
    catch (err) {
      return res.status(500).json(err)
    }
  }

  if (action === 'DELETE_CONVERSATION') {
    try {
      const { id } = data

      await serverDeleteConversation(session, id)

      return res.status(200).end()
    }
    catch (err) {
      return res.status(500).json(err)
    }
  }

  return res.status(500).end()
}
import { FormState } from '@fernui/react'
import { User } from '@prisma/client'
import { Trigger } from 'components'
import { toast, sendMessageRequest } from 'lib/util'

interface SendRequestProps {
  user: User
}

export default function SendRequest({ user }: SendRequestProps) {
  const onStateChange = (state: FormState) => {
    if (state.success) {
      toast('success', 'Message request sent!')
      document.querySelector<any>('#send-btn > span').textContent = 'Request sent!'
    }
    else if (state.error) {
      toast('error', 'Error sending request.')
    }
  }

  return (
    <Trigger
      id='send'
      onSubmit={() => sendMessageRequest(user)}
      onStateChange={onStateChange}
      text='Send message request'
    />
  )
}
import Router from 'next/router'
import { FormState } from '@fernui/react'
import { Conversation } from '@prisma/client'
import { Trigger } from 'components'
import { toast, acceptMessageRequest } from 'lib/util'

interface AcceptRequestProps {
  request: Conversation
}

export default function AcceptRequest({ request }: AcceptRequestProps) {
  const onStateChange = (state: FormState) => {
    if (state.success) {
      toast('success', 'Message request accepted!')
      Router.reload()
    }
    else if (state.error) {
      toast('error', 'Error accepting request.')
    }
  }

  return (
    <Trigger
      id='accept'
      onSubmit={() => acceptMessageRequest(request)}
      onStateChange={onStateChange}
      text='Accept request'
    />
  )
}
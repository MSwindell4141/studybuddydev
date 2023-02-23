import Router from 'next/router'
import { FormState } from '@fernui/react'
import { Conversation } from '@prisma/client'
import { Trigger } from 'components'
import { toast, deleteConversation } from 'lib/util'

interface CancelRequestProps {
  request: Conversation
  ignore?: boolean
}

export default function CancelRequest({ request, ignore }: CancelRequestProps) {
  const onStateChange = (state: FormState) => {
    if (state.success) {
      toast('success', `Message request ${ignore ? 'ignored' : 'canceled'}.`)
      Router.reload()
    }
    else if (state.error) {
      toast('error', `Error ${ignore ? 'ignoring' : 'canceling'} request.`)
    }
  }

  return (
    <Trigger
      id='cancel'
      onSubmit={() => deleteConversation(request)}
      onStateChange={onStateChange}
      text={`${ignore ? 'Ignore' : 'Cancel message'} request`}
      variant='warning'
    />
  )
}
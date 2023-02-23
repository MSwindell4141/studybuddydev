import Router from 'next/router'
import { FormState } from '@fernui/react'
import { Conversation } from '@prisma/client'
import { closeUI } from '@fernui/util'
import { Trigger } from 'components'
import { confirm, toast, deleteConversation } from 'lib/util'

interface UnacceptMessagesProps {
  conversation: Conversation
}

export default function UnacceptMessages({ conversation }: UnacceptMessagesProps) {
  const confirmUnaccept = () => {
    confirm(
      <>Warning: Unaccepting messages will additionally delete ALL messages sent between you and this user.</>,
      'Yes, unaccept messages.',
      () => {
        closeUI('#confirm')
        document.querySelector<any>('#unaccept-trigger').click()
      }
    )
  }

  const onStateChange = (state: FormState) => {
    if (state.success) {
      toast('success', 'Unaccepted messages from this user.')
      Router.reload()
    }
    else if (state.error) {
      toast('error', 'Error deleting request.')
    }
  }

  return (
    <Trigger
      id='unaccept'
      onSubmit={() => deleteConversation(conversation)}
      onStateChange={onStateChange}
      type='button'
      onClick={confirmUnaccept}
      text='Unaccept messages'
      variant='warning'
    />
  )
}
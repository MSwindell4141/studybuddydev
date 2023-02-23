import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { Conversation } from '@prisma/client'
import { Dropdown } from '@fernui/react'
import { toggleUI } from '@fernui/util'
import { info } from '@fernui/icons'
import { Breadcrumbs, UserCard, CancelRequest, AcceptRequest, UnacceptMessages, Link } from 'components'
import { serverGetConversations, requireSession } from 'lib/util.server'

export const getServerSideProps: GetServerSideProps = async ctx => (
  requireSession(ctx, true, async session => {
    return {
      props: {
        query: ctx.query,
        session,
        _conversations: await serverGetConversations(session),
      },
    }
  })
)

const updateUrl = (conversation: Conversation) =>
  window.history.pushState({}, '', `?conv=${conversation.slug ?? ''}`)

interface PageProps {
  query: any
  session: Session
  _conversations: ConversationWithUsers[]
}

export default ({ query, session: { user }, _conversations }: PageProps) => {
  const [active, setActive] = useState<ConversationWithUsers | null>(
    _conversations.find(c => c.slug == query.conv) ?? null
  )
  const activeUser = active ? (active.ownerId === user.id ? active.member : active.owner) : null

  let conversations: ConversationWithUsers[] = []
  let requests: ConversationWithUsers[] = []
  let outgoingRequests: ConversationWithUsers[] = []

  _conversations.forEach(c => 
    c.accepted ? conversations.push(c)
    : c.memberId === user.id ? requests.push(c)
    : outgoingRequests.push(c)
  )

  return <>
    <section className='py-md'>
      <Breadcrumbs path={[
        { title: 'Messages' },
      ]} />
      <div className='container layout-split xl:flex'>
        <div className='xl:max-w-sm w-full space-y-8'>
          <List
            items={conversations}
            title='Conversations'
            fallbackText='No conversations started yet.'
            children={conversation =>
              <UserCard
                user={conversation.ownerId === user.id ? conversation.member : conversation.owner}
                onClick={() => { setActive(conversation), updateUrl(conversation) }}
                subtitle='View messages'
              />
            }
          />
          <List
            items={requests}
            title='Requests'
            fallbackText='No message requests received.'
            children={request =>
              <UserCard
                user={request.owner}
                onClick={() => { setActive(request), updateUrl(request) }}
                subtitle='View message request'
              />
            }
          />
          <List
            items={outgoingRequests}
            title='Outgoing requests'
            fallbackText='No message requests sent.'
            children={request =>
              <UserCard
                user={request.member}
                onClick={() => { setActive(request), updateUrl(request) }}
                subtitle='Successfully sent request'
              />
            }
          />
        </div>
        <div className='w-full space-y-4'>
          <h2>Messages</h2>
          <div className='min-h-[20rem] flex flex-col justify-between bg-gray-200 rounded-2xl px-10 py-8'>
            {!active ? (
              <p>Select a conversation or accept a message request to get started!</p>
            ) : <>
              <div className='flex justify-between'>
                <div>
                  {activeUser && 
                    <UserCard
                      user={activeUser}
                      subtitle='Visit profile'
                      fill
                    />
                  }
                </div>
                {active.accepted && <OptionsDropdown active={active} />}
              </div>
              <div>
                {active.accepted ? (
                  <p>Conversation here</p>
                ) : (
                  <div className='space-y-4'>
                    {active.memberId === user.id ? <>
                      <p>{active.owner.name?.split(' ')[0]} sent you a message request. Accept it to start a conversation!</p>
                      <div className='link-group'>
                        <AcceptRequest request={active} />
                        <CancelRequest request={active} ignore />
                      </div>
                    </> : <>
                      <p>Waiting for {active.member.name?.split(' ')[0]} to accept your request...</p>
                      <div className='link-group'>
                        <CancelRequest request={active} />
                      </div>
                    </>}
                  </div>
                )}
              </div>
            </>}
          </div>
        </div>
      </div>
    </section>
  </>
}

interface ListProps {
  items: ConversationWithUsers[]
  title: string
  children: (conversation: ConversationWithUsers) => any
  fallbackText: string
}

const List = ({ items, title, children, fallbackText }: ListProps) => (
  <div className='space-y-4'>
    <h2>{title}</h2>
    {items.length > 0 ? (
      items.map(item => 
        <div key={item.id}>
          {children(item)}
        </div>  
      )
    ) : (
      <p>{fallbackText}</p>
    )}
  </div>
)

interface OptionsDropdownProps {
  active: ConversationWithUsers | null
}

const OptionsDropdown = ({ active }: OptionsDropdownProps) => (
  <div>
    <Link
      onClick={() => toggleUI('#options')}
      text='Options'
      className='btn btn-light'
      icon={{ i: info }}
    />
    <Dropdown
      id='options'
      className='right-0 origin-top-right'
    >
      <div className='flex flex-col space-y-2.5'>
        <Link
          onClick={() => console.log('star')}
          text='Award star'
          className='btn btn-light'
        />
        {active && <UnacceptMessages conversation={active} />}
      </div>
    </Dropdown>
  </div>
)
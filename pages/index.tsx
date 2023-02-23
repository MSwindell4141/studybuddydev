import { GetServerSideProps } from 'next'
import { Breadcrumbs, HomeCard, Link } from 'components'
import { serverCountUsers, requireSession, serverUpdateUser } from 'lib/util.server'
import { composeRecordSlug } from 'lib/util'

export const getServerSideProps: GetServerSideProps = async ctx => (
  requireSession(ctx, true, async session => {
    if (!session.user.slug) {
      const matches = await serverCountUsers(session, { name: session.user.name })

      await serverUpdateUser(session, {
        slug: composeRecordSlug(session.user.name, 'user', matches),
      })
    }

    return {
      props: {
        session,
      },
    }
  })
)

interface PageProps {
  session: Session
}

export default ({ session: { user } }: PageProps) => {
  return <>
    <section className='py-md'>
      <Breadcrumbs />
      <div className='container space-y-6'>
        <h2 className='h1'>Welcome back{user.name ? `, ${user.name.split(' ')[0]}` : ''}!</h2>
        <div className='grid grid-cols-2 gap-5'>
          <HomeCard link='/people' text='Find a study partner' />
          <HomeCard link='/courses' text='Find class resources' />
          <HomeCard link='/messages' text='View all messages' />
          <HomeCard link='/profile' text='Update my profile' />
        </div>
      </div>
    </section>
    <section className='py-md'>
      <div className='container space-y-4'>
        <h2>Recent Messages</h2>
        <div className='space-y-2.5'>
          <div className='card !rounded-lg px-6 py-2.5'>
            <p>Person: Lorem ipsum dolor sit amet.</p>
          </div>
          <div className='card !rounded-lg px-6 py-2.5'>
            <p>Person: Lorem ipsum dolor sit amet.</p>
          </div>
          <div className='card !rounded-lg px-6 py-2.5'>
            <p>Person: Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <p>None yet. Go find a study partner!</p>
        <Link to='/messages'>
          View all messages
        </Link>
      </div>
    </section>
  </>
}
import { GetServerSideProps } from 'next'
import { signIn } from 'next-auth/react'
import { Icon } from '@fernui/react'
import { vortex } from '@fernui/icons'
import { Link } from 'components'
import { requireSession } from 'lib/util.server'

export const getServerSideProps: GetServerSideProps = async ctx => (
  requireSession(ctx, false, () => {
    return {
      props: {
        query: ctx.query,
      },
    }
  })
)

interface PageProps {
  query: { error?: string }
}

export default ({ query }: PageProps) => {
  const messages = new Map([
    ['OAuthAccountNotLinked', 'An account with this email address already exists. Please sign in using the provider your email is connected to.'],
  ])

  const error = messages.get(query.error ?? '')

  return <>
    <section className='relative min-h-[32rem] md:min-h-[40rem] h-[90vh] md:h-screen grid md:grid-cols-2 overflow-hidden bg-green-500'>
      <Icon i={vortex} className='absolute w-full h-full bottom-[-60%] right-[-60%] scale-[3] opacity-40' />
      <div className='relative h-full flex justify-center items-center bg-gray-100'>
        <div className='max-w-lg w-full space-y-8 p-6 md:p-10 lg:p-14'>
          <div className='space-y-3'>
            <h1>
              Welcome to Study&nbsp;Buddy!
            </h1>
            <p className='text-green-500'>
              Please sign in using one of the below providers.*
            </p>
          </div>
          <div className='grid gap-2.5'>
            <Link onClick={() => signIn('google')} className='btn btn-google'>Sign in with Google</Link>
            <Link onClick={() => signIn('github')} className='btn btn-github'>Sign in with GitHub</Link>
            <Link onClick={() => signIn('discord')} className='btn btn-discord'>Sign in with Discord</Link>
          </div>
          {error ? (
            <p className='text-error-500'>
              * {error}
            </p>
          ) : (
            <p className='text-gray-500 italic'>
              * The account used must be associated with an @uwf.edu email&nbsp;address (not yet enforced for testing&nbsp;purposes).
            </p>
          )}
        </div>
        <div className='absolute bottom-0 left-0 w-full flex justify-center py-5'>
          <p className='text-gray-500'>
            &copy; {new Date().getFullYear()} Study Buddy
          </p>
        </div>
      </div>
    </section>
  </>
}
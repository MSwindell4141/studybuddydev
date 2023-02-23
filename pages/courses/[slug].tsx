import { GetServerSideProps } from 'next'
import { requireSession } from 'lib/util.server'

export const getServerSideProps: GetServerSideProps = async ctx => (
  requireSession(ctx, true, session => {
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

export default ({ session }: PageProps) => {
  return <>
    <section>
      <div className='container'>
      </div>
    </section>
  </>
}
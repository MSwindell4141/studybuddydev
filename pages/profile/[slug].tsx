import { GetServerSideProps } from 'next'
import { Conversation, User } from '@prisma/client'
import { Breadcrumbs, Link, ProfileLayout, SendRequest } from 'components'
import { serverGetExistingRequest, requireSession, serverGetUser } from 'lib/util.server'
import { mapValueTolabel, sortUserCourses } from 'lib/util'
import { MAJORS, COURSES, COURSE_STATUSES, GRADUATION_STATUSES } from 'lib/global'

export const getServerSideProps: GetServerSideProps = async ctx => (
  requireSession(ctx, true, async session => {
    const user = await serverGetUser(session, { slug: ctx.query.slug })

    if (!user) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        session,
        user,
        userCourses: sortUserCourses(user),
        existingRequest: await serverGetExistingRequest(session, user),
      },
    }
  })
)

interface PageProps {
  session: Session
  user: User
  userCourses: Course[]
  existingRequest: Conversation | null
}

export default ({ session, user, userCourses, existingRequest }: PageProps) => {
  return <>
    <section className='py-md'>
      <Breadcrumbs path={[
        { title: 'People', link: '/people' },
        { title: user?.name ?? 'User' },
      ]} />
      <ProfileLayout
        user={user}
        aboutSlot={
          <ProfileField
            title='About'
            value={user.about || 'No biographical information added yet.'}
          />
        }
        generalSlot={<>
          <ProfileField
            title='Major'
            value={mapValueTolabel(MAJORS, user.major)}
          />
          <ProfileField
            title='Graduation status'
            value={mapValueTolabel(GRADUATION_STATUSES, user.graduate)}
          />
        </>}
        coursesSlot={
          <div className='space-y-3'>
            <p className='h3 text-green-700'>Courses</p>
            {userCourses.length > 0 ? (
              <div className='grid gap-4'>
                {userCourses.map((course: Course, index) =>
                  <div className='course' key={index}>
                    <ProfileField
                      className='2xl:w-1/2'
                      title='Course'
                      value={mapValueTolabel(COURSES, course.id)}
                    />
                    <ProfileField
                      className='2xl:w-1/2'
                      title='Status'
                      value={mapValueTolabel(COURSE_STATUSES, course.status)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <p className='profile-value'>
                No courses added yet.
              </p>
            )}
          </div>
        }
        ctaSlot={
          session.user.id === user.id ? (
            <Link
              to='/profile'
              text='Edit profile'
              className='btn btn-save'
            />
          ) : existingRequest?.id ? (
            <Link
              id='view-btn'
              to={`/messages?conv=${existingRequest.slug}`}
              text={existingRequest?.accepted ? 'View messages' : 'View message request'}
              className='btn btn-light'
            />
          ) : (
            <SendRequest user={user} />
          )
        }
      />
    </section>
  </>
}

interface ProfileFieldProps {
  className?: string
  title: string
  value: string
}

const ProfileField = ({ className, title, value }: ProfileFieldProps) => (
  <div className={className}>
    <p className='profile-label'>{title}</p>
    <p className='profile-value'>{value}</p>
  </div>
)
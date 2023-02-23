import { GetServerSideProps } from 'next'
import { Form, FormState, Input, Select, FormButton } from '@fernui/react'
import { Breadcrumbs, ProfileLayout, CourseRepeater } from 'components'
import { requireSession } from 'lib/util.server'
import { sortUserCourses, toast, updateUser } from 'lib/util'
import { MAJORS, GRADUATION_STATUSES } from 'lib/global'

export const getServerSideProps: GetServerSideProps = async ctx => (
  requireSession(ctx, true, async session => {
    return {
      props: {
        session,
        userCourses: sortUserCourses(session.user),
      },
    }
  })
)

interface PageProps {
  session: Session
  userCourses: Course[]
}

export default ({ session: { user }, userCourses }: PageProps) => {
  const onStateChange = (state: FormState) => {
    if (state.success)
      toast('success', 'Profile changes saved!')
    else if (state.error)
      toast('error', 'Error saving changes.')
    else if (state.id === 7)
      toast('info', 'No changes to save.')
  }

  return <>
    <section className='py-md'>
      <Breadcrumbs path={[
        { title: 'My Profile' },
      ]} />
      <Form
        onSubmit={updateUser}
        onStateChange={onStateChange}
        maxSubmissions={99}
      >
        <ProfileLayout
          user={user}
          aboutSlot={
            <Input
              name='about'
              label='About'
              type='area'
              placeholder='Start typing here...'
              defaultValue={user.about}
            />
          }
          generalSlot={<>
            <Select
              name='major'
              label='Major'
              placeholder=''
              options={MAJORS}
              defaultValue={user.major}
              required
            />
            <Select
              name='graduate'
              label='Graduation status'
              placeholder=''
              options={GRADUATION_STATUSES}
              defaultValue={user.graduate}
              required
            />
          </>}
          coursesSlot={
            <CourseRepeater courses={userCourses} />  
          }
          ctaSlot={
            <FormButton
              type='submit'
              text='Save profile'
              className='btn btn-save'
            />
          }
          includeLowerCta
        />
      </Form>
    </section>
  </>
}
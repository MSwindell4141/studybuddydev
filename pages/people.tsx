import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { Form, FormState, Input, Select, FormButton } from '@fernui/react'
import { formToObject } from '@fernui/util'
import { User } from '@prisma/client'
import { Breadcrumbs, CourseRepeater, UserCard } from 'components'
import { requireSession } from 'lib/util.server'
import { toast, mapValueTolabel, sortUserCourses, searchUsers } from 'lib/util'
import { MAJORS, GRADUATION_STATUSES } from 'lib/global'

export const getServerSideProps: GetServerSideProps = async ctx => (
  requireSession(ctx, true, async session => {
    return {
      props: {
        query: ctx.query,
        session,
        userCourses: sortUserCourses(session.user),
      },
    }
  })
)

const convertToUrlParams = (params: any) => {
  const cleanParams = { ...params }

  if (cleanParams.courses && typeof cleanParams.courses !== 'string')
    cleanParams.courses = JSON.stringify(cleanParams.courses)

  return new URLSearchParams(cleanParams).toString()
}

interface PageProps {
  query: any
  userCourses: Course[]
}

export default ({ query, userCourses }: PageProps) => {
  const [results, setResults] = useState<User[]>([])
  const [preset, setPreset] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem(convertToUrlParams(query))
    if (stored) setResults(JSON.parse(stored))
  }, [])

  const onSearch = async (e: any) => {
    toast('info', 'Updating search preferences...')

    const params = formToObject(e.target)
    const urlParams = convertToUrlParams(params)

    Router.replace(`/people?${urlParams}`)

    if (!params.courses && !['any', 'custom'].includes(params.preset)) {
      params.courses = userCourses.map(course => ({ 
        id: course.id,
        status: params.preset,
      }))
    }

    const users = await searchUsers(params)
    localStorage.setItem(urlParams, JSON.stringify(users))
    setResults(users)
  }

  const onStateChange = (state: FormState) => {
    if (state.success)
      toast('success', 'Successfully updated results!')
    else if (state.error)
      toast('error', 'Error completing search.')
    else if (state.id === 7)
      toast('info', 'No search parameters changed.')
  }

  return <>
    <section className='py-md'>
      <Breadcrumbs path={[
        { title: 'People' },
      ]} />
      <div className='container layout-split xl:grid grid-cols-2'>
        <div className='space-y-4'>
          <h2>Preferences</h2>
          <Form
            onSubmit={onSearch}
            onStateChange={onStateChange}
            maxSubmissions={99}
            requireInitialChanges={false}
          >
            <div className='space-y-6'>
              <div className='space-y-8'>
                <div className='grid gap-4'>
                  <Input
                    name='name'
                    label='Name of user'
                    placeholder='Start typing here...'
                    defaultValue={query.name}
                  />
                  <Select
                    name='major'
                    label='Major'
                    placeholder='Any'
                    options={MAJORS}
                    defaultValue={query.major}
                  />
                  <Select
                    name='graduate'
                    label='Graduation status'
                    placeholder='Any'
                    options={GRADUATION_STATUSES}
                    defaultValue={query.graduate}
                  />
                </div>
                <div className='space-y-3'>
                  <p className='h3 text-green-700'>Courses</p>
                  <Select
                    name='preset'
                    label='Filter by course &amp; status'
                    placeholder=''
                    options={[
                      { label: 'Any', value: 'any' },
                      { label: 'Any status in any of my courses', value: '' },
                      { label: 'Enrolled in any of my courses', value: 'E' },
                      { label: 'Tutors in any of my courses', value: 'T' },
                      { label: 'Custom', value: 'custom' },
                    ]}
                    defaultValue={query.preset}
                    onChange={(e: any) => setPreset(e.target.value)}
                  />
                  {[preset, query.preset].includes('custom') && 
                    <CourseRepeater courses={JSON.parse(query.courses ?? '[]')} isFilter />
                  }
                </div>
              </div>
              <div>
                <FormButton
                  type='submit'
                  text='Search'
                  className='btn btn-save'
                />
              </div>
            </div>
          </Form>
        </div>
        <div className='space-y-4'>
          <h2>Results</h2>
          <div className='grid gap-3'>
            {results.length > 0 ? (
              results.map(user =>
                <UserCard
                  user={user}
                  subtitle={mapValueTolabel(GRADUATION_STATUSES, user.graduate)}
                  key={user.id}
                />
              )
            ) : (
              <p>Nothing to see here yet...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  </>
}
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { Input } from '@fernui/react'
import { Breadcrumbs, Link } from 'components'
import { requireSession } from 'lib/util.server'
import { sortUserCourses } from 'lib/util'
import { COURSES } from 'lib/global'

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
  userCourses: Course[]
}

export default ({ userCourses }: PageProps) => {
  const [search, setSearch] = useState('')
  
  return <>
    <section className='py-md'>
      <Breadcrumbs path={[
        { title: 'Courses' },
      ]} />
      <div className='container space-y-8'>
        <Input
          name='search'
          placeholder='Search courses...'
          onChange={(e: any) => setSearch(e.target.value)}
        />
        {search ? (
          <CourseGrid
            title='Results'
            items={COURSES.filter(course => course.label.toLowerCase().includes(search.toLowerCase()))}
          />
        ) : <>
          <CourseGrid
            title='Your courses'
            items={userCourses.map(course => COURSES.find(c => c.value === course.id))}
          />
          <CourseGrid
            title='All courses'
            items={COURSES}
          />
        </>}
      </div>
    </section>
  </>
}

interface CourseGridProps {
  title: string
  items: any[]
}

const CourseGrid = ({ title, items }: CourseGridProps) => (
  <div className='space-y-4'>
    <h2>{title}</h2>
    <div className='grid grid-cols-2 gap-4'>
      {items.length > 0 ? (
        items.map(course =>
          <Link
            to={'/courses/' + course.value}
            className='card w-full px-10 py-6'
            key={course.label}
          >
            <h3>{course.label}</h3>
          </Link>
        )
      ) : (
        <p>No courses here yet...</p>
      )}
    </div>
  </div>
)
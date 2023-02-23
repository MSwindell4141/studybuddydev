import { useState } from 'react'
import { Select, FormButton, Repeater } from '@fernui/react'
import { cn, getRepeaterMethods } from '@fernui/util'
import { toast } from 'lib/util'
import { COURSES, COURSE_STATUSES } from 'lib/global'

interface CourseRepeaterProps {
  courses?: Course[]
  isFilter?: boolean
}

export default function CourseRepeater({
  courses = [],
  isFilter
}: CourseRepeaterProps) {
  const [numCourses, setNumCourses] = useState(courses.length)

  const {
    insert: insertCourse,
    remove: removeCourse,
    get: getCourses,
  } = getRepeaterMethods('#courses')

  const addCourse = () => {
    if (!isFilter && getCourses().length >= COURSES.length)
      return toast('info', 'Course limit reached.')

    insertCourse({})
  }

  return (
    <div className='space-y-4'>
      <div className='space-y-3'>
        <p className='h3 text-green-700'>Courses</p>
        <Repeater
          id='courses'
          items={courses}
          className={cn('grid gap-4', numCourses < 1 && 'hidden')}
          onChange={items => setNumCourses(items.length)}
        >
          {(course: Course, index, key) =>
            <div className='course' key={key}>
              <Select
                name={`courses.${index}.id`}
                label='Course'
                placeholder='Select a course'
                options={COURSES}
                defaultValue={course.id}
                className='2xl:w-1/2'
                required
              />
              <Select
                name={`courses.${index}.status`}
                label='Status'
                placeholder={isFilter ? 'Any' : 'Select a status'}
                options={COURSE_STATUSES}
                className='2xl:flex-grow'
                required={!isFilter}
              />
              <div className='flex justify-end items-end'>
                <FormButton
                  onClick={() => removeCourse(index)}
                  text='Remove'
                  className='btn btn-remove'
                />
              </div>
            </div>
          }
        </Repeater>
      </div>
      <div>
        <FormButton
          onClick={addCourse}
          text='Add course'
          className='btn btn-light'
        />
      </div>
    </div>
  )
}
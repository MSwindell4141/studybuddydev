import { Icon } from '@fernui/react'
import { vortex } from '@fernui/icons'
import { Link } from 'components'

interface NotFoundProps {
  type: string
  link: string
  linkText: string
}

export default function NotFound({ type, link, linkText }: NotFoundProps) {
  return <>
    <section className='relative h-screen flex items-center bg-green-600 overflow-hidden py-md'>
      <Icon i={vortex} className='absolute w-full h-full bottom-[-60%] right-[-60%] scale-[5] opacity-40' />
      <div className='container text-center space-y-5 lg:space-y-7'>
        <h1 className='text-gray-100'>404: {type} not found.</h1>
        <Link
          to={link}
          text={linkText}
          className='btn text-gray-100 bg-gray-900/20 hover:bg-gray-900/30'
        />
      </div>
    </section>
  </>
}
import { signOut } from 'next-auth/react'
import { Icon } from '@fernui/react'
import { vortex } from '@fernui/icons'
import { Link, Avatar } from 'components'
import { PAGES } from 'lib/global'

interface SidebarProps {
  session: Session
}

export default function Sidebar({ session: { user } }: SidebarProps) {
  return (
    <header className='sticky top-0 max-w-[14rem] w-full h-screen bg-green-500 overflow-hidden'>
      <Icon i={vortex} className='absolute w-full h-full bottom-[-70%] right-[60%] scale-[12] opacity-40' />
      <div className='relative space-y-6 px-6 py-12'>
        <div className='px-5'>
          <Link to='/profile'>
            <Avatar
              user={user}
              outerClass='border-[3px] border-gray-100'
              className='w-14 h-14'
              iconHover
            />
          </Link>
        </div>
        <nav className='flex flex-col items-start space-y-3.5'>
          <Divider />
          {PAGES.map(page =>
            <Link to={page.link} className='btn btn-nav' key={page.link}>
              {page.title}
            </Link>
          )}
          <Divider />
          <Link onClick={() => signOut()} className='btn btn-nav'>Sign out</Link>
        </nav>
      </div>
    </header>
  )
}

const Divider = () => (
  <div className='w-full px-5'>
    <div className='w-full h-[3px] rounded-full bg-green-900/20' />
  </div>
)
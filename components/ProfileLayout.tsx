import { User } from '@prisma/client'
import { Avatar } from 'components'

interface ProfileLayoutProps {
  user: User
  aboutSlot: any
  generalSlot: any
  coursesSlot: any
  ctaSlot?: any
  includeLowerCta?: boolean
}

export default function ProfileLayout({
  user,
  aboutSlot,
  generalSlot,
  coursesSlot,
  ctaSlot,
  includeLowerCta,
}: ProfileLayoutProps) {
  const CTA = () => (
    <div className='link-group w-full justify-end'>
      {ctaSlot}
    </div>
  )
  
  return (
    <div className='container layout-split xl:flex'>
      <div className='xl:max-w-sm w-full space-y-7'>
        <Avatar
          user={user}
          className='w-24 h-24'
          lg
        />
        <div className='space-y-2'>
          <p className='h3'>{user.name}</p>
          <p className='h4 text-green-500'>{user.email}</p>
        </div>
        {aboutSlot}
      </div>
      <div className='w-full space-y-6'>
        <CTA />
        <div className='space-y-8'>
          <div className='space-y-3'>
            <p className='h3 text-green-700'>General info</p>
            <div className='space-y-4'>
              {generalSlot}
            </div>
          </div>
          {coursesSlot}
        </div>
        {includeLowerCta && <CTA />}
      </div>
    </div>
  )
}
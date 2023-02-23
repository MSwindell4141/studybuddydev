import { Avatar as FernAvatar } from '@fernui/react'
import { User } from '@prisma/client'
import { cn } from '@fernui/util'

interface AvatarProps {
  user: User
  outerClass?: string
  className: string
  iconHover?: boolean
  lg?: boolean
}

export default function Avatar({ user, outerClass, className, iconHover, lg }: AvatarProps) {
  return (
    <div className={cn('relative group rounded-full inline-block overflow-hidden', outerClass)}>
      <FernAvatar
        src={user.image}
        title={user.name}
        className={cn('font-normal text-gray-100', lg ? 'h2' : 'h4', className)}
      />
      {iconHover && <div className='absolute inset-0 group-hover:bg-gray-900/20 duration-75' />}
    </div>
  )
}
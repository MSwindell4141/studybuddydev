import { User } from '@prisma/client'
import { Icon } from '@fernui/react'
import { cn } from '@fernui/util'
import { Link, Avatar } from 'components'
import { arrow } from '@fernui/icons'

interface UserCardProps {
  user: User
  link?: string
  onClick?: Function
  subtitle: string
  fill?: boolean
}

export default function UserCard({ user, link, onClick, subtitle, fill }: UserCardProps) {
  return (
    <Link
      to={link || onClick ? undefined : `/profile/${user.slug}`}
      onClick={onClick}
      className={cn('inline-flex items-center space-x-4', fill ? 'group' : 'card w-full px-6 py-4')}
      key={user.id}
    >
      <div>
        <Avatar
          user={user}
          className={fill ? 'w-16 h-16' : 'w-14 h-14'}
        />
      </div>
      <div className='text-left'>
        <p className={fill ? 'h3' : 'h4'}>
          {user.name}
        </p>
        <div className={cn(
          'p flex items-center space-x-2',
          fill ? 'font-bold text-green-500 group-hover:text-green-400 duration-100' : 'text-green-500'
        )}>
          <span>
            {subtitle}
          </span>
          {fill && <Icon i={arrow} className='w-4 -rotate-90 group-hover:translate-x-1 duration-100' />}
        </div>
      </div>
    </Link>
  )
}
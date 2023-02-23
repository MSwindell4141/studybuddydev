import { cn } from '@fernui/util'
import { Link } from 'components'

type Page = { title: string, link?: string }

interface BreadcrumbsProps {
  path?: Array<Page>
}

export default function Breadcrumbs({ path = [] }: BreadcrumbsProps) {
  const home = { title: 'Study Buddy', link: '/' } as Page

  return (
    <div className='container flex space-x-3 mb-8'>
      {[home, ...path].map((page, index) =>
        (index < path.length) ? (
          <div className='flex space-x-3' key={index}>
            <Link
              to={page.link}
              className='h3 text-gray-400 hover:text-green-400'
            >
              {page.title}
            </Link>
            <p className='h3 text-gray-400'>&gt;</p>
          </div>
        ) : (
          <h1 className={cn('h3', path.length === 0 && 'text-green-400')} key={index}>{page.title}</h1>
        )
      )}
    </div>
  )
}
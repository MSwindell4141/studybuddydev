import { Link } from 'components'

interface HomeCardProps {
  link: string
  text: string
}

export default function HomeCard({ link, text }: HomeCardProps) {
  return (
    <Link
      to={link}
      className='card group space-y-3.5 px-6 py-4 md:px-10 md:py-8 lg:px-14 lg:py-12'
    >
      <p className='h3'>
        {text}
      </p>
      <div className='w-32 h-1 bg-green-400 rounded-full group-hover:scale-x-125 origin-left duration-300' />
    </Link>
  )
}
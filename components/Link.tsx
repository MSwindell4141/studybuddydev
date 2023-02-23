import NextLink from 'next/link'
import { Link as FernLink, LinkProps } from '@fernui/react'

export default function Link({ to, ...props }: LinkProps) {
  return (
    <FernLink as={to ? NextLink: null} to={to} {...props} />
  )
}
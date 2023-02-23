import Head from 'next/head'
import { Meta as FernMeta } from '@fernui/react'

export default function Meta() {
  return (
    <FernMeta
      as={Head}
      title='Study Buddy'
      desc=''
      image=''
      canonical=''
      noindex={true}
      icon='/sb_icon.png'
      touchIcon='/sb_icon.png'
      themeColor='#fafafa'
    />
  )
}
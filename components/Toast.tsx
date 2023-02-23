import { useState } from 'react'
import { Modal } from '@fernui/react'
import { cn } from '@fernui/util'

export default function Toast() {
  const [data, setData] = useState({ status: 'info', message: '' })

  return (
    <Modal
      id='toast'
      onAction={(e: any) => setData(e.detail)}
      className={cn(
        'top-12 right-12 bg-gray-100 border-4 border-gray-200 rounded-xl duration-[0.4s] transition-[opacity,transform,visibility] px-10 py-6',
        `toast-${data.status}`
      )}
      activeClass='toast-active'
      inactiveClass='toast-inactive'
      bgClass='hidden'
      exitOnEscape={false}
      exitOnOutsideClick={false}
      closeDelay={2000}
    >
      {data.message}
    </Modal>
  )
}
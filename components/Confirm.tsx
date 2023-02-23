import { useState } from 'react'
import { Modal } from '@fernui/react'
import { Link } from 'components'
import { cn, closeUI } from '@fernui/util'

export default function Confirm() {
  const [data, setData] = useState({ message: '', confirmText: '', onConfirm: null })

  return (
    <Modal
      id='confirm'
      onAction={(e: any) => e.detail.message && setData(e.detail)}
      className={cn(
        'm-auto inset-0 max-w-2xl max-h-min bg-gray-100 rounded-xl duration-[0.4s] transition-[opacity,transform,visibility] space-y-8 px-14 py-10',
      )}
      bgClass='bg-gray-900/40'
    >
      <div className='space-y-4'>
        <p className='h2'>Confirm Action</p>
        <p>{data.message}</p>
        <p>Are you sure you want to proceed?</p>
      </div>
      <div className='link-group'>
        <Link
          onClick={data.onConfirm}
          text={data.confirmText}
          className='btn btn-warning'
        />
        <Link
          onClick={closeUI}
          text='Cancel'
          className='btn btn-light'
        />
      </div>
    </Modal>
  )
}
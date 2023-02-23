import { Form, FormButton, FormProps } from '@fernui/react'

interface TriggerProps {
  id?: string
  onSubmit: FormProps['onSubmit']
  onStateChange: FormProps['onStateChange']
  type?: string
  onClick?: Function
  text: string
  variant?: string
}

export default function Trigger({
  id,
  onSubmit,
  onStateChange,
  type = 'submit',
  onClick,
  text,
  variant = 'save',
}: TriggerProps) {
  return (
    <Form
      id={id}
      onSubmit={onSubmit}
      onStateChange={onStateChange}
      maxSubmissions={1}
      requireChanges={false}
    >
      <FormButton id={`${id}-trigger`} type='submit' className='hidden' />
      <FormButton
        id={`${id}-btn`}
        type={type}
        onClick={onClick}
        text={text}
        className={`btn btn-${variant}`}
      />
    </Form>
  )
}
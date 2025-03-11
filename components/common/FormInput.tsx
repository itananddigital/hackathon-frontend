import React from 'react'
import { Label } from '../ui/label'

interface FormInputProps {
    label: string
    children: React.ReactNode
    props?: any
}

export const FormInput = ({label, children, props}: FormInputProps) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label className='text-white' {...props}>{label}</Label>
      {children}
    </div>
  )
}

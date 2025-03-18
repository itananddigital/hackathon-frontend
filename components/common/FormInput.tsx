import { Text } from '@chakra-ui/react'
import React from 'react'

interface FormInputProps {
    label: string
    children: React.ReactNode
    props?: any
}

export const FormInput = ({label, children, props}: FormInputProps) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Text {...props}>{label}</Text>
      {children}
    </div>
  )
}

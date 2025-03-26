import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import React, { ReactNode } from 'react';

interface FormInputProps {
  name: string;
  label: string;
  children: ReactNode;
  helperText?: string;
  isRequired?: boolean;
  [key: string]: any;
}

export const FormInput = ({
  name,
  label,
  children,
  helperText,
  isRequired = false,
  ...props
}: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="space-y-2">
          <FormLabel>
            {label}
            {isRequired && <span className="text-red-400">*</span>}
          </FormLabel>
          <FormControl>
            {React.cloneElement(children as React.ReactElement, {
              ...field,
            })}
          </FormControl>
          {helperText && <p className="text-sm text-muted-foreground">{helperText}</p>}
          <FormMessage />
        </div>
      )}
    />
  );
};
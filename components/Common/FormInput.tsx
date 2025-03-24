import { Label } from '@/components/ui/label';
import { ReactNode } from 'react';

export const FormInput = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="space-y-1">
    <Label>{label}</Label>
    {children}
  </div>
);
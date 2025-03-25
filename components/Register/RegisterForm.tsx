'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { axiosInstance } from '@/lib/api/axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormInput } from '../Common/FormInput';
import { PasswordInput } from '../ui/PasswordInput';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      role: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/method/hackathon.API.register_api.register', {
        email: formData.email,
        pwd: formData.password,
        first_name: formData.name,
        role: formData.role,
      });

      if (response.status === 200) {
        router.push('/login');
      } else {
        console.log(response);
      }
    } catch (error: any) {
      console.log(error);
      setFormError(error?.message?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card className="w-full rounded-lg shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Welcome to Hackathon
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Register to create your first account
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                <div className="flex-1 space-y-2">
                  <FormInput label="Name">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </FormInput>
                </div>
                <div className="flex-1 space-y-2">
                  <FormInput label="Role">
                    <Select value={formData.role} onValueChange={handleRoleChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Developer</SelectLabel>
                          <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                          <SelectItem value="ERPNext Developer">ERPNext Developer</SelectItem>
                          <SelectItem value="Project Manager">Project Manager</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Consultant</SelectLabel>
                          <SelectItem value="ERPNext Consultant">ERPNext Consultant</SelectItem>
                          <SelectItem value="Finance Consultant">Finance Consultant</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormInput>
                </div>
              </div>
              <div className="space-y-2">
                <FormInput label="Email">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </FormInput>
              </div>
              <div className="space-y-2">
                <FormInput label="Password">
                  <PasswordInput
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </FormInput>
              {formError && <div className="text-red-500">{formError}</div>}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="underline hover:text-primary">
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
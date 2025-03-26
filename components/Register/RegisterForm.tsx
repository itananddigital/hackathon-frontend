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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { FormInput } from '../Common/FormInput';
import { PasswordInput } from '../ui/PasswordInput';
import useSWRMutation from 'swr/mutation';
import { postFetcher } from '@/lib/api/swrFetcher';

interface FormData {
  name: string;
  role: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      role: '',
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: async (data) => {
      const errors: any = {};

      if (!data.name) {
        errors.name = { message: 'Name is required' };
      } else if (data.name.length < 2) {
        errors.name = { message: 'Name must be at least 2 characters' };
      }

      if (!data.role) {
        errors.role = { message: 'Please select a role' };
      }

      if (!data.email) {
        errors.email = { message: 'Email is required' };
      } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = { message: 'Invalid email format' };
      }

      if (!data.password) {
        errors.password = { message: 'Password is required' };
      } else if (data.password.length < 8) {
        errors.password = { message: 'Password must be at least 8 characters' };
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(data.password)) {
        errors.password = {
          message: 'Password must contain uppercase, lowercase, and numbers',
        };
      }

      return { values: data, errors };
    },
  });

  const { trigger, isMutating } = useSWRMutation(
    '/api/method/hackathon.API.register_api.register',
    postFetcher
  );

  const onSubmit = async (data: FormData) => {
    try {
      await trigger({
        email: data.email,
        pwd: data.password,
        first_name: data.name,
        role: data.role,
      });
      router.push('/login');
    } catch (error: any) {
      methods.setError('root.serverError', {
        message: error?.message?.message || 'Something went wrong',
      });
    }
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
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                  <div className="flex-1 space-y-2">
                    <FormInput label="Name" name="name" isRequired>
                      <Input
                        type="text"
                        placeholder="Name"
                        className="w-full"
                      />
                    </FormInput>
                  </div>
                  <div className="flex-1 space-y-2">
                    <FormInput label="Role" name="role" isRequired>
                      <Controller
                        name="role"
                        control={methods.control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
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
                        )}
                      />
                    </FormInput>
                  </div>
                </div>

                <div className="space-y-2">
                  <FormInput label="Email" name="email" isRequired>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="w-full"
                    />
                  </FormInput>
                </div>

                <div className="space-y-2">
                  <FormInput label="Password" name="password" isRequired>
                    <PasswordInput placeholder="Password" />
                  </FormInput>
                  {methods.formState.errors.root?.serverError && (
                    <p className="text-sm text-red-500">
                      {methods.formState.errors.root.serverError.message}
                    </p>
                  )}
                </div>

                <Button
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className="w-full"
                  loading={isMutating}
                >
                  Register
                </Button>
              </form>
            </FormProvider>

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
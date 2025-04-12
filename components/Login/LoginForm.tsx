'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/api/axios";
import { cn } from "@/lib/utils";
import { setCookie } from "@/utils/cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { FormInput } from "../Common/FormInput";
import { PasswordInput } from "../ui/PasswordInput";

interface LoginCredentials {
  usr: string;
  pwd: string;
}

export interface LoginResponse {
  message: {
    success_key: number;
    error?: string;
    sid: string;
    api_key: string;
    email: string;
    avatar: string;
    api_secret: {
      token: string;
    };
  };
  full_name: string;
}

const loginFetcher = async (
  url: string,
  { arg }: { arg: LoginCredentials }
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(url, arg);
  return response.data;
};

interface FormData {
  email: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const methods = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: async (data) => {
      const errors: any = {};

      if (!data.email) {
        errors.email = { message: 'Email is required' };
      } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = { message: 'Invalid email format' };
      }

      if (!data.password) {
        errors.password = { message: 'Password is required' };
      }

      return { values: data, errors };
    },
  });
  const { trigger, isMutating } = useSWRMutation(
    '/api/method/hackathon.API.api_login.login',
    loginFetcher
  );

  const onSubmit = async (data: FormData) => {
    try {
      const response = await trigger({ usr: data.email, pwd: data.password });
      if (response?.message?.success_key === 1) {
        setCookie('sid', response.message.sid);
        setCookie('token', response.message.api_secret.token);
        setCookie('api_key', response.message.api_key);
        setCookie('email', response.message.email);
        setCookie('full_name', response.full_name);
        setCookie('avatar', response.message.avatar);
        router.push('/about');
      }
    } catch (error: any) {
      methods.setError('root.serverError', {
        message: 'Username or Password is incorrect',
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-4">
                  <FormInput label="Email" name="email" isRequired>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      className="w-full"
                    />
                  </FormInput>
                  <FormInput label="Password" name="password" isRequired>
                    <PasswordInput placeholder="Enter password" />
                  </FormInput>
                  {methods.formState.errors.root?.serverError && (
                    <p className=" text-sm text-red-500">
                      {methods.formState.errors.root.serverError.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isMutating}
                  loading={isMutating}
                >
                  Login
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="underline hover:text-primary">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
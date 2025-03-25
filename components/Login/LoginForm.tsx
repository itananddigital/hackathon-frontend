'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { axiosInstance } from "@/lib/api/axios"
import { cn } from "@/lib/utils"
import { setCookie } from "@/utils/cookies"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import useSWRMutation from "swr/mutation"
import { FormInput } from "../Common/FormInput"
import { PasswordInput } from "../ui/PasswordInput"

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


export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const router = useRouter()

  const { trigger, error, isMutating } = useSWRMutation(
    '/api/method/hackathon.API.api_login.login',
    loginFetcher
  );

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await trigger({ usr: email, pwd: password })
      if(data?.message?.success_key === 1) {
      setCookie('sid', data?.message?.sid);
      setCookie('token', data?.message?.api_secret.token);
      setCookie('api_key', data?.message?.api_key);
      setCookie('email', data?.message?.email);
      setCookie('full_name', data?.full_name);
      setCookie('avatar', data?.message?.avatar);
      router.push('/dashboard');
      }
    }
    catch (error) {
      console.error(error)
    }
  }
  function handeChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.id === 'email') setEmail(e.target.value)
    if (e.target.id === 'password') setpassword(e.target.value)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlesubmit}>
            <div className="grid gap-6">
              <div className="grid gap-4">
                <FormInput label='Email'>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={handeChange}
                    value={email}
                  />
                </FormInput>
                <FormInput label="Password">
                  <PasswordInput id="password" required
                    onChange={handeChange}
                    value={password} />
                </FormInput>
                {error && <div className="text-red-500">Username or Password is incorrect</div>}
              </div>
              <Button type="submit" className="w-full" loading={isMutating}>
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
        </CardContent>
      </Card>
    </div >
  )
}

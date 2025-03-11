"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/api/axios";
import { setCookie } from "@/utils/cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

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

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()
    
    const { trigger, isMutating, error } = useSWRMutation(
        '/api/method/hackathon.API.api_login.login',
        loginFetcher,

    );

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await trigger({ usr: email, pwd: password })
            console.log(data);
            setCookie('sid', data?.message?.sid);
            setCookie('token', data?.message?.api_secret.token);
            setCookie('api_key', data?.message?.api_key);
            setCookie('email', data?.message?.email);
            setCookie('full_name', data?.full_name);
            router.push('/');
        } catch (err) {

        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold text-center">Welcome Back</h2>
                <p className="text-center text-gray-500 mb-4">Log in to your account</p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /> {error && <p className="text-red-500 text-start">Username or Password is incorrect</p>}
                    <Button
                        type="submit"
                        className="w-full bg-black text-white hover:bg-gray-900"
                        disabled={isMutating}
                    >

                        {isMutating ? "Logging in..." : "Log In"}
                    </Button>
                </form>

                <p className="mt-4 text-center text-gray-500">
                    {"Don't have an account?"} <Link href="/register" className="text-blue-500">Register</Link>
                </p>
            </Card>
        </div>
    );
}

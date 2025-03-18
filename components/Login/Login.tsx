// "use client";

// import { axiosInstance } from "@/lib/api/axios";
// import { setCookie } from "@/utils/cookies";
// import { Button, Card, CardBody, Center, IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
// import useSWRMutation from "swr/mutation";

// interface LoginCredentials {
//     usr: string;
//     pwd: string;
// }

// export interface LoginResponse {
//     message: {
//         success_key: number;
//         error?: string;
//         sid: string;
//         api_key: string;
//         email: string;
//         api_secret: {
//             token: string;
//         };
//     };
//     full_name: string;
// }

// const loginFetcher = async (
//     url: string,
//     { arg }: { arg: LoginCredentials }
// ): Promise<LoginResponse> => {
//     const response = await axiosInstance.post<LoginResponse>(url, arg);
//     return response.data;
// };

// export const LoginPage = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const router = useRouter()
//     const [show, setShow] = useState(false)
//     const handleClick = () => setShow(!show)

//     const { trigger, isMutating, error } = useSWRMutation(
//         '/api/method/hackathon.API.api_login.login',
//         loginFetcher,

//     );

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const data = await trigger({ usr: email, pwd: password })
//             console.log(data);
//             setCookie('sid', data?.message?.sid);
//             setCookie('token', data?.message?.api_secret.token);
//             setCookie('api_key', data?.message?.api_key);
//             setCookie('email', data?.message?.email);
//             setCookie('full_name', data?.full_name);
//             router.push('/');
//         } catch (err) {

//         }
//     };

//     return (
//         <Center alignItems={"center"} justifyContent={"center"} h={"100vh"}>
//             <Card>
//                 <CardBody>
//                     <h2 className="text-2xl font-semibold text-center">Welcome Back</h2>
//                     <p className="text-center text-gray-500 mb-4">Log in to your account</p>
//                     <form onSubmit={handleLogin} className="space-y-4">
//                         <Input
//                             type="email"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />

//                         <InputGroup>
//                             <InputRightElement>
//                                 <IconButton bg="transparent !important"
//                                     variant="ghost"
//                                     tabIndex={-1}
//                                     colorScheme='gray'
//                                     aria-label={show ? "Mask password" : "Reveal password"}
//                                     icon={show ? <AiFillEyeInvisible /> : <AiFillEye />}
//                                     onClick={handleClick}
//                                 />
//                             </InputRightElement>
//                             <Input name="password" rounded='lg' placeholder='Password' type={show ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} required />
//                         </InputGroup>
//                         {error && <p className="text-red-500 text-start">Username or Password is incorrect</p>}
//                         <Button
//                             type="submit"
//                             className="w-full bg-black text-white hover:bg-gray-900"
//                             disabled={isMutating}
//                         >

//                             {isMutating ? "Logging in..." : "Log In"}
//                         </Button>
//                     </form>

//                     <p className="mt-4 text-center text-gray-500">
//                         {"Don't have an account?"} <Link href="/register" className="text-blue-500">Register</Link>
//                     </p>
//                 </CardBody>

//             </Card>
//         </Center>
//     );
// }


"use client";

import { axiosInstance } from "@/lib/api/axios";
import { setCookie } from "@/utils/cookies";
import {
  Button,
  Card,
  CardBody,
  Center,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Text,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
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
  const [show, setShow] = useState(false);
  const router = useRouter();
  const handleClick = () => setShow(!show);

  const { trigger, isMutating, error } = useSWRMutation(
    '/api/method/hackathon.API.api_login.login',
    loginFetcher
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await trigger({ usr: email, pwd: password });
      console.log(data);
      setCookie('sid', data?.message?.sid);
      setCookie('token', data?.message?.api_secret.token);
      setCookie('api_key', data?.message?.api_key);
      setCookie('email', data?.message?.email);
      setCookie('full_name', data?.full_name);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Center h="100vh">
      <Card w={{ base: "full", sm: "md" }} mx={4}>
        <CardBody>
          <VStack spacing={4}>
            <Text fontSize="2xl" fontWeight="semibold" textAlign="center">
              Welcome Back
            </Text>
            <Text color="gray.500" textAlign="center">
              Log in to your account
            </Text>
            
            <VStack as="form" onSubmit={handleLogin} spacing={4} w="full">
              <FormControl isInvalid={!!error}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>

              <FormControl isInvalid={!!error}>
                <InputGroup>
                  <Input
                    name="password"
                    placeholder="Password"
                    type={show ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                  <InputRightElement>
                    <IconButton
                      bg="transparent"
                      variant="ghost"
                      colorScheme="gray"
                      aria-label={show ? "Mask password" : "Reveal password"}
                      icon={show ? <AiFillEyeInvisible /> : <AiFillEye />}
                      onClick={handleClick}
                      tabIndex={-1}
                    />
                  </InputRightElement>
                </InputGroup>
                {error && (
                  <FormErrorMessage>
                    Username or Password is incorrect
                  </FormErrorMessage>
                )}
              </FormControl>

              <Button
                type="submit"
                colorScheme="brand"
                w="full"
                isLoading={isMutating}
              >
                Log In
              </Button>
            </VStack>

            <Text color="gray.500" textAlign="center">
              Don&apos;t have an account?{' '}
              <Button
                as={Link}
                href="/register"
                variant="link"
                colorScheme="blue"
              >
                Register
              </Button>
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </Center>
  );
};
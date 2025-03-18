"use client";

import { axiosInstance } from "@/lib/api/axios";
import { Button, Card, Icon, IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
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
        router.push('/login')
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error)
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center">Welcome to Hackathon</h2>
        <p className="text-center text-gray-500 mb-4">Register to create your first account</p>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex flex-col gap-y-4 sm:flex-row sm:space-x-2 ">
            <Input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-3 border rounded-md"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="role"
              placeholder="Role"
              className="w-full p-3 border rounded-md"
              value={formData.role}
              onChange={handleChange}
            // required
            />
          </div>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputGroup>
            <InputRightElement>
              <IconButton bg="transparent !important"
                variant="ghost"
                tabIndex={-1}
                colorScheme='gray'
                aria-label={show ? "Mask password" : "Reveal password"}
                icon={show ? <AiFillEyeInvisible /> : <AiFillEye />}
                onClick={handleClick}
              />
            </InputRightElement>
            <Input name="password" rounded='lg' placeholder='Password' type={show ? "text" : "password"} onChange={handleChange} value={formData.password} required/>
          </InputGroup>

          <Button type="submit" className="w-full bg-black text-white p-3 rounded-md" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>

        </form>

        <p className="mt-4 text-center text-gray-500">
          Already have an account? <Link href="/login" className="text-blue-500">Login</Link>
        </p>
      </Card>
    </div>
  );
}

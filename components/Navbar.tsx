'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getCookie, removeCookie, setCookie } from '@/utils/cookies';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../public/assets/8848_Logo.svg';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const currentUser = getCookie('email')
  const full_name = getCookie('full_name')
  const isAuthenticated = full_name !== 'Guest'
  const router = useRouter()
  
  useEffect(() => {
    
  })
  const logout = () => {
    removeCookie('sid');
    removeCookie('token');
    removeCookie('api_key');
    setCookie('full_name', 'Guest');
    router.push('/');
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="max-w-7xl mx-auto px-4 shadow-lg relative">
        <div className="flex justify-between items-center h-16">
          <Image src={logo.src} width={64} height={64} alt="logo" onClick={() => { router.push('/') }} loading='lazy'/>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" className="text-white hover:bg-[#dcf7f1]">
                  <Link href="/themes">Themes</Link>
                </Button>
                <Button variant="ghost" className="text-white hover:bg-[#dcf7f1]">
                  <Link href="/teams">Team</Link>
                </Button>
                <Button variant="ghost" className="text-white hover:bg-[#dcf7f1]">
                  <Link href="/submission">Submission</Link>
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="">{currentUser?.split('')[0]}</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" side="bottom" align="end">
                    <p>Hi, {currentUser}</p>
                    <Button onClick={logout} className="w-full">Logout</Button>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-white hover:bg-[#dcf7f1]">
                  <CiLogin className="mr-2" />
                  <Link href="/login">Login</Link>
                </Button>
                <Button variant="default" className="bg-[#10635a] hover:bg-[#0d5048]">
                  <AiOutlineUser className="mr-2" />
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-white hover:bg-gray-800 transition"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 right-5 w-[200px] md:hidden bg-black shadow-lg z-50 rounded-lg border border-gray-700">
            <div className="px-4 py-3 space-y-2">
              {isAuthenticated ? (
                <>
                  <Button
                    variant="ghost"
                    className="w-full text-left text-white hover:bg-gray-800"
                  >
                    <Link href="/themes">Themes</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-left text-white hover:bg-gray-800"
                  >
                    <Link href="/teams">Team</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-left text-white hover:bg-gray-800"
                  >
                    <Link href="/submission">Submission</Link>
                  </Button>
                  <Button
                    variant="default"
                    className="w-full bg-[#10635a] hover:bg-[#0d5048]"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="w-full text-left text-white hover:bg-gray-800"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    variant="default"
                    className="w-full bg-[#10635a] hover:bg-[#0d5048]"
                  >
                    <Link href="/register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
// 'use client';

// import { Button, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Portal } from "@chakra-ui/react"
// import { getCookie, removeCookie, setCookie } from '@/utils/cookies';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { AiOutlineUser } from 'react-icons/ai';
// import { CiLogin } from 'react-icons/ci';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import logo from '../public/assets/8848_Logo.svg';

// const Navbar = () => {

//   const [open, setOpen] = useState(false)
//   const currentUser = getCookie('email')
//   const full_name = getCookie('full_name')
//   const isAuthenticated = full_name !== 'Guest'
//   const router = useRouter()

//   useEffect(() => {

//   })
//   const logout = () => {
//     removeCookie('sid');
//     removeCookie('token');
//     removeCookie('api_key');
//     setCookie('full_name', 'Guest');
//     router.push('/');
//   }

//   return (
//     <div className="fixed top-0 left-0 right-0 z-50 bg-black">
//       <div className="max-w-7xl mx-auto px-4 shadow-lg relative">
//         <div className="flex justify-between items-center h-16">
//           <Image src={logo.src} width={64} height={64} alt="logo" onClick={() => { router.push('/') }} loading='lazy'/>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-4">
//             {isAuthenticated ? (
//               <>
//                 <Button variant="ghost" className="text-white hover:bg-[#dcf7f1]">
//                   <Link href="/themes">Themes</Link>
//                 </Button>
//                 <Button variant="ghost" className="text-white hover:bg-[#dcf7f1]">
//                   <Link href="/teams">Team</Link>
//                 </Button>
//                 <Button variant="ghost" className="text-white hover:bg-[#dcf7f1]">
//                   <Link href="/submission">Submission</Link>
//                 </Button>
//                 <Popover>
//                 <PopoverTrigger>
//                 <Button className="">{currentUser?.split('')[0]}</Button>
//                 </PopoverTrigger>
//                 <Portal>
//                     <PopoverContent>
//                       <PopoverArrow />
//                       <PopoverBody>
//                       <p>Hi, {currentUser}</p>
//                       <Button onClick={logout} className="w-full">Logout</Button>
//                       </PopoverBody>
//                     </PopoverContent>
//                 </Portal>
//               </Popover>
//               </>
//             ) : (
//               <>
//                 <Button variant="ghost" className="text-white hover:bg-[#dcf7f1]">
//                   <CiLogin className="mr-2" />
//                   <Link href="/login">Login</Link>
//                 </Button>
//                 <Button  className="bg-[#10635a] hover:bg-[#0d5048]" >
//                   <AiOutlineUser className="mr-2" />
//                   <Link href="/register">Register</Link>
//                 </Button>
//               </>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setOpen(!open)}
//               className="p-2 rounded-md text-white hover:bg-gray-800 transition"
//             >
//               {open ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {open && (
//           <div className="absolute top-16 right-5 w-[200px] md:hidden bg-black shadow-lg z-50 rounded-lg border border-gray-700">
//             <div className="px-4 py-3 space-y-2">
//               {isAuthenticated ? (
//                 <>
//                   <Button
//                     variant="ghost"
//                     className="w-full text-left text-white hover:bg-gray-800"
//                   >
//                     <Link href="/themes">Themes</Link>
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     className="w-full text-left text-white hover:bg-gray-800"
//                   >
//                     <Link href="/teams">Team</Link>
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     className="w-full text-left text-white hover:bg-gray-800"
//                   >
//                     <Link href="/submission">Submission</Link>
//                   </Button>
//                   <Button
//                     className="w-full bg-[#10635a] hover:bg-[#0d5048]"
//                     onClick={logout}
//                   >
//                     Logout
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Button
//                     variant="ghost"
//                     className="w-full text-left text-white hover:bg-gray-800"
//                   >
//                     <Link href="/login">Login</Link>
//                   </Button>
//                   <Button
//                     className="w-full bg-[#10635a] hover:bg-[#0d5048]"
//                   >
//                     <Link href="/register">Register</Link>
//                   </Button>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;


'use client';

import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Flex,
  Box,
  HStack,
  VStack,
  IconButton,
  Collapse,
} from '@chakra-ui/react';
import { getCookie, removeCookie, setCookie } from '@/utils/cookies';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../public/assets/8848_Logo.svg';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const currentUser = getCookie('email');
  const full_name = getCookie('full_name');
  const isAuthenticated = full_name !== 'Guest';
  const router = useRouter();

  const logout = () => {
    removeCookie('sid');
    removeCookie('token');
    removeCookie('api_key');
    setCookie('full_name', 'Guest');
    router.push('/');
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      shadow="lg"
    >
      <Flex
        maxW="7xl"
        mx="auto"
        px={4}
        h={16}
        align="center"
        justify="space-between"
      >
        <Image
          src={logo.src}
          width={64}
          height={64}
          alt="logo"
          onClick={() => router.push('/')}
          loading="lazy"
        />

        {/* Desktop Menu */}
        <HStack
          display={{ base: 'none', md: 'flex' }}
          spacing={4}
        >
          {isAuthenticated ? (
            <>
              <Button variant="ghost" as={Link} href="/themes">
                Themes
              </Button>
              <Button variant="ghost" as={Link} href="/teams">
                Team
              </Button>
              <Button variant="ghost" as={Link} href="/submission">
                Submission
              </Button>
              <Popover>
                <PopoverTrigger>
                  <Button>
                    {currentUser?.charAt(0).toUpperCase()}
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody>
                      <VStack spacing={2}>
                        <Box>Hi, {currentUser}</Box>
                        <Button onClick={logout} w="full">
                          Logout
                        </Button>
                      </VStack>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            </>
          ) : (
            <>
              <Button variant="ghost" as={Link} href="/login" leftIcon={<CiLogin />}>
                Login
              </Button>
              <Button
                colorScheme="brand"
                as={Link}
                href="/register"
                leftIcon={<AiOutlineUser />}
              >
                Register
              </Button>
            </>
          )}
        </HStack>

        {/* Mobile menu button */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          icon={open ? <FaTimes /> : <FaBars />}
          onClick={() => setOpen(!open)}
          variant="ghost"
          aria-label="Toggle menu"
        />
      </Flex>

      {/* Mobile Menu */}
      <Collapse in={open} animateOpacity>
        <VStack
          display={{ base: 'flex', md: 'none' }}
          pos="absolute"
          top={16}
          right={5}
          w={200}
          shadow="lg"
          rounded="lg"
          borderWidth={1}
          p={3}
          spacing={2}
          align="stretch"
        >
          {isAuthenticated ? (
            <>
              <Button variant="ghost" as={Link} href="/themes" w="full">
                Themes
              </Button>
              <Button variant="ghost" as={Link} href="/teams" w="full">
                Team
              </Button>
              <Button variant="ghost" as={Link} href="/submission" w="full">
                Submission
              </Button>
              <Button colorScheme="brand" onClick={logout} w="full">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" as={Link} href="/login" w="full">
                Login
              </Button>
              <Button colorScheme="brand" as={Link} href="/register" w="full">
                Register
              </Button>
            </>
          )}
        </VStack>
      </Collapse>
    </Box>
  );
};

export default Navbar;
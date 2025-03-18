// 'use client'

import { Box, ChakraProvider, Flex } from '@chakra-ui/react'
import theme from '../theme'
import { headers } from 'next/headers';
import Sidebar from '../common/SIdebar';
import Navbar from '../Navbar';

export function Providers({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const navigationType = headersList.get('X-Navigation-Type') || 'navbar';
  console.log(navigationType, 'render')
  return (
    <ChakraProvider theme={theme}>
      <Sidebar>
        {children}
      </Sidebar>
    </ChakraProvider>
  )
}
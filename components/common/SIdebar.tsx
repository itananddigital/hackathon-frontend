'use client'

import {
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { AiOutlineTeam } from 'react-icons/ai';
import { FaWpforms } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { GoProjectRoadmap } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";

interface LinkItemProps {
  name: string
  icon: IconType
  href: string
}

const LinkItems: LinkItemProps[] = [
  { name: 'Dashboard', icon: IoHomeOutline, href: '/dashboard' },
  { name: 'Teams', icon: AiOutlineTeam, href: '/teams' },
  { name: 'Themes', icon: GoProjectRoadmap, href: '/themes' },
  { name: 'Submission', icon: FaWpforms, href: '/submission' },
  { name: 'Profile', icon: RxAvatar, href: '/profile' },
] as const

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh">
      <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose}>
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} display={{ base: 'flex', md: 'none' }}/>

      <Box ml={{ base: 0, md: 60 }}>
        {children}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...props }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('black', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...props}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      <Stack>

      {LinkItems.map(({ name, icon, href }) => (
        <NavItem key={name} icon={icon} href={href}>
          {name}
        </NavItem>
      ))}
      </Stack>
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: React.ReactNode
  href: string
}

const NavItem = ({ icon, children, href, ...props }: NavItemProps) => {
  const pathname = usePathname();
  console.log(pathname)
  return (
  <Box as="a" href={href} textDecoration="none" _focus={{ boxShadow: 'none' }}>
    <Flex
      align="center"
      p="3"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{ bg: 'cyan.400', color: 'white' }}
      bg={pathname.includes(href) ? 'cyan.400' : 'transparent'}
      {...props}
    >
      <Icon mr="4" fontSize="16" _groupHover={{ color: 'white' }} as={icon} />
      {children}
    </Flex>
  </Box>
)}

interface MobileProps extends FlexProps {
  onOpen: () => void
}

const MobileNav = ({ onOpen, ...props }: MobileProps) => (
  <Flex
    ml={{ base: 0, md: 60 }}
    px={{ base: 4, md: 24 }}
    height="20"
    alignItems="center"
    bg={useColorModeValue('dark', 'gray.900')}
    // borderBottomWidth="1px"
    // borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
    justifyContent="flex-start"
    {...props}
  >
    <IconButton variant="ghost" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />
    <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
      Logo
    </Text>
  </Flex>
)


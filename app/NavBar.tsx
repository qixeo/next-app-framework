'use client';

import { Skeleton } from '@/app/components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
import Image from 'next/image';
import logo from '@/public/images/logo.png';
import { CaretDownIcon } from '@radix-ui/react-icons';

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <Image
                src={logo}
                height="30"
                alt="My Image"
                className="mr-5"
                priority
              />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Users', href: '/users' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              'nav-link': true,
              '!text-zinc-900': link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Skeleton width="5rem" />;

  if (status === 'unauthenticated')
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  console.log(session);

  const fullName = session!.user.name;

  // TODO: Retrieve user ID
  // const userId = '';

  const array = fullName!.split(' ');
  // let initials = '?';

  // if (fullName!.length > 0) {
  //   if (array.length > 1) {
  //     const firstName = fullName!.split(' ')[0];
  //     const lastName = fullName!.split(' ')[1];
  //     initials = firstName.charAt(0) + lastName.charAt(0);
  //   } else if (array.length === 1) {
  //     initials = fullName!.charAt(0);
  //   }
  // }

  return (
    <>
      {/* TODO: Dropdown doesn't trigger with fallback */}
      {/* <Box>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session!.user!.image!}
              fallback={
                <Box>
                  <svg viewBox="0 0 64 64" fill="currentColor">
                    <path d="M41.5 14c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S33 27.962 33 23 36.813 14 41.5 14zM56.289 43.609C57.254 46.21 55.3 49 52.506 49c-2.759 0-11.035 0-11.035 0 .689-5.371-4.525-10.747-8.541-13.03 2.388-1.171 5.149-1.834 8.07-1.834C48.044 34.136 54.187 37.944 56.289 43.609zM37.289 46.609C38.254 49.21 36.3 52 33.506 52c-5.753 0-17.259 0-23.012 0-2.782 0-4.753-2.779-3.783-5.392 2.102-5.665 8.245-9.472 15.289-9.472S35.187 40.944 37.289 46.609zM21.5 17c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S13 30.962 13 26 16.813 17 21.5 17z" />
                  </svg>
                </Box>
              }
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session!.user.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/users/">{session!.user.name}</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ L">
              <Link href="/api/auth/signout">Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box> */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            Account
            <CaretDownIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>
            <Link href={`/users/${session!.user.id}`}>
              {session!.user!.name}
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};

export default NavBar;

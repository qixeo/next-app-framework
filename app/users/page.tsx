import React from 'react';
import UserTable from './UserTable';
import { Button, Flex, Heading } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  searchParams: { sortOrder: string };
}

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
  return (
    <>
      <Flex justify="between" my="5">
        <Heading size="5">Users</Heading>
        <Link href="/users/new">
          <Button>Add User</Button>
        </Link>
      </Flex>
      <UserTable sortOrder={sortOrder}></UserTable>
    </>
  );
};

export default UsersPage;

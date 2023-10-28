import React from 'react';
import Link from '@/app/components/Link';
import { Table } from '@radix-ui/themes';
import { sort } from 'fast-sort';
import prisma from '@/prisma/client';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder: string;
}

const UserTable = async ({ sortOrder }: Props) => {
  const users = await prisma.user.findMany();

  const sortedUsers = sort(users).asc(
    sortOrder === 'email' ? (user) => user.email : (user) => user.name
  );

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.RowHeaderCell>
            <Link href="/users?sortOrder=name">Name</Link>
          </Table.RowHeaderCell>
          <Table.RowHeaderCell>
            <Link href="/users?sortOrder=email">Email</Link>
          </Table.RowHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedUsers.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>
              <Link href={`/users/${user.id}`} children={`${user.name}`}></Link>
            </Table.Cell>
            <Table.Cell>
              <Link
                href={`/users/${user.id}`}
                children={`${user.email}`}
              ></Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default UserTable;

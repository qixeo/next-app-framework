import prisma from '@/prisma/client';
import {
  Card,
  Box,
  Button,
  Flex,
  Grid,
  Text,
  Avatar,
  Heading,
  Link,
  Table,
  Separator,
} from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const UserDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) notFound();
  return (
    <>
      <Flex justify="between" my="5">
        <Heading size="5">Personal Information</Heading>
        <Button>Edit Profile</Button>
      </Flex>
      <Grid columns="2" gap="1">
        <Flex align="start">
          <Text weight="bold">Name:</Text>
        </Flex>
        <Flex align="start">
          <Text>{user.name}</Text>
        </Flex>
        <Flex align="start">
          <Text weight="bold">Email:</Text>
        </Flex>
        <Flex align="start">
          <Text>{user.email}</Text>
        </Flex>
      </Grid>
      <Separator my="5" size="4" />
      <Flex justify="between" my="5">
        <Heading size="5">Password</Heading>
        <Button>Change Password</Button>
      </Flex>
      <Grid columns="2" gap="1">
        <Flex align="start">
          <Text weight="bold">Password:</Text>
        </Flex>
        <Flex align="start">
          <Text>••••••••</Text>
        </Flex>
      </Grid>
    </>
  );
};

export default UserDetailPage;

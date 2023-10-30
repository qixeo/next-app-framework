import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';
import UserForm from '../../_components/UserForm';
import { Heading } from '@radix-ui/themes';

interface Props {
  params: {
    id: string;
  };
}

const EditUserPage = async ({ params }: Props) => {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user) notFound();

  return (
    <div>
      <Heading mb="5">Edit Profile: {user.name}</Heading>
      <UserForm user={user}></UserForm>
    </div>
  );
};

export default EditUserPage;

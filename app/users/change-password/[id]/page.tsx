import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Heading } from '@radix-ui/themes';
import dynamic from 'next/dynamic';

const PasswordForm = dynamic(
  () => import('@/app/users/_components/PasswordForm'),
  {
    ssr: false,
  }
);

interface Props {
  params: {
    id: string;
  };
}

const ChangePasswordPage = async ({ params }: Props) => {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user) notFound();

  return (
    <div>
      <Heading mb="5">Change Password</Heading>
      <PasswordForm user={user}></PasswordForm>
    </div>
  );
};

export default ChangePasswordPage;

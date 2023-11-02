import { getServerSession } from 'next-auth/next';
import { getProviders } from 'next-auth/react';
import authOptions from '@/app/auth/authOptions';
import SignInForm from './_components/SignInForm';
import { redirect } from 'next/navigation';
import { Heading } from '@radix-ui/themes';

const SignInPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect('/');
  }

  const providers = (await getProviders()) || {};

  return (
    <>
      <SignInForm providers={providers} />
    </>
  );
};

export default SignInPage;

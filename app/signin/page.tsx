import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/auth/authOptions';
import SignInForm from './_components/SignInForm';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    error?: string;
  };
};

const SignInPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect('/');
  }

  return <SignInForm />;
};

export default SignInPage;

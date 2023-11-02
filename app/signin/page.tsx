'use client';

import { getProviders, signIn } from 'next-auth/react';
import { useState } from 'react';
import Spinner from '@/app/components/Spinner';
import {
  Box,
  Button,
  Callout,
  Flex,
  Link,
  TextField,
  Text,
} from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type Props = {
  params: {
    error?: string;
  };
};

const SignInPage = ({ params }: Props) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const authProviders = async function (req: any, res: any) {
    const providers = await getProviders();
    console.log(providers);
    return providers;
    res.end();
  };
  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.error !== 'Invalid credentials') {
      router.push('/');
      router.refresh();
    } else {
      setError(res.error);
      setSubmitting(false);
    }
  });

  return (
    <>
      <div className="flex justify-center">
        <Box style={{ width: '320px' }}>
          {error && (
            <Callout.Root color="red" className="mb-5">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
          <form className="space-y-4" onSubmit={onSubmit}>
            <TextField.Root>
              <TextField.Input
                size="3"
                placeholder="Email"
                {...register('email')}
              />
            </TextField.Root>
            <TextField.Root>
              <TextField.Input
                size="3"
                placeholder="Password"
                type="password"
                {...register('password')}
              />
            </TextField.Root>
            <Button
              size="4"
              style={{ marginTop: 28, width: '100%' }}
              disabled={isSubmitting}
            >
              Sign In {isSubmitting && <Spinner />}
            </Button>
          </form>
          <Link href="/users/forgot-password">
            <Text as="p" mt="4" align="center">
              Forgot Password
            </Text>
          </Link>
        </Box>
        <Flex direction="column" m="3">
          {Object.values(authProviders).map((provider) => {
            if (provider.name === 'Credentials') {
              return;
            }
            return (
              <Box key={provider.name}>
                <Button variant="outline" onClick={() => signIn(provider.id)}>
                  Sign In with {provider.name}
                </Button>
              </Box>
            );
          })}
        </Flex>
      </div>
    </>
  );
};

export default SignInPage;

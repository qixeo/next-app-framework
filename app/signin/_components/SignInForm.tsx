'use client';

import { signIn } from 'next-auth/react';
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
  Separator,
} from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';

// type Props = {
//   params: {
//     error?: string;
//   };
// };

const SignInForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    const res = await signIn(data.providerId, {
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
      <Flex direction="column" justify="center" align="center" m="3">
        <Box style={{ width: '320px' }}>
          {error && (
            <Callout.Root color="red" className="mb-5">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
          <form className="space-y-4" onSubmit={onSubmit}>
            <input
              type="hidden"
              value="credentials"
              {...register('providerId')}
            ></input>
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
            <Text as="p" my="4" align="center">
              Forgot Password
            </Text>
          </Link>
        </Box>
        <Separator size="3" />
        <Box style={{ width: '320px' }}>
          <Button
            variant="outline"
            size="4"
            style={{ marginTop: 28, width: '100%' }}
            disabled={isSubmitting}
            onClick={() => signIn('google')}
          >
            <FcGoogle /> Sign In with Google
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default SignInForm;

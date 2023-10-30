'use client';

import { TextField, Button, Callout } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUserSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type Inputs = z.infer<typeof registerUserSchema>;

const UserForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(registerUserSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post('/api/register', data);
      router.push('/users');
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
    }
  });

  return (
    <div className="w-full">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-4" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input size="3" placeholder="Name" {...register('name')} />
        </TextField.Root>
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
        <TextField.Root>
          <TextField.Input
            size="3"
            placeholder="Email"
            {...register('email')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <TextField.Root>
          <TextField.Input
            size="3"
            placeholder="Password"
            type="password"
            {...register('password')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <Button size="3" style={{ marginTop: 28 }} disabled={isSubmitting}>
          Sign Up {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default UserForm;

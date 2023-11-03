'use client';

import { TextField, Button, Callout } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { User } from '@prisma/client';

type UserFormData = z.infer<typeof userSchema>;

const UserForm = ({ user }: { user?: User }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const { data: session, status, update } = useSession();
  const updateSession = (formData: any) => {
    update(formData);
  };
  const onSubmit = handleSubmit(async (formData) => {
    try {
      setSubmitting(true);
      if (user) {
        await axios.patch('/api/users/' + user.id, formData);
        updateSession({ name: formData.name, email: formData.email });
        router.push('/users/' + user.id);
        router.refresh();
      } else {
        await axios.post('/api/users', formData);
        router.push('/users');
        router.refresh();
      }
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={user?.name!}
            placeholder="Name"
            {...register('name')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
        <TextField.Root>
          <TextField.Input
            defaultValue={user?.email!}
            placeholder="Email"
            {...register('email')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {user ? 'Update User' : 'Add New User'} {isSubmitting && <Spinner />}
        </Button>
      </form>
      {/* <Button onClick={() => update({ name: 'Paul Doe' })}>
        Update Session
      </Button> */}
    </div>
  );
};

export default UserForm;

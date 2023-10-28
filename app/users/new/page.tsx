import dynamic from 'next/dynamic';
// import UserFormSkeleton from './loading';

const UserForm = dynamic(() => import('@/app/users/_components/UserForm'), {
  ssr: false,
  // loading: () => <UserFormSkeleton />,
});

const NewUserPage = async () => {
  return <UserForm />;
};

export default NewUserPage;

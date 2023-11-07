// The following line by itself will protect the whole site
export { default } from 'next-auth/middleware';

// Protect only what is listed in `matcher`
export const config = {
  matcher: ['/users/new', '/users/edit/:id+', '/users'],
};

This is a Next.js app that includes a basic framework with Google Auth, user management, email integration, and the Prisma ORM. It should provide a good starting point for a basic web app and is an enhanced version of the [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Set up a MySQL database, or whatever DB you want. If using Postgres or anything other than MySQL, update the adapter and the schema accordingly in prisma/schema.prisma. Refer to the [`Prisma docs`](https://www.prisma.io/docs/concepts/database-connectors/postgresql).

To initialize Prisma, run:

```bash
npx prisma init

```

For migrations, run:

```bash
npx prisma migrate dev
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

This install uses the [Radix UI Theme](https://www.radix-ui.com/) which includes all kinds of slick styling.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## NextJS Starter App - Work-in-Progress

Last updated Nov 3, 2023

This is a Next.js starter app that includes a bunch of components to make life easier starting a brand new web app. Includes Next Auth with email credentials and Google Auth ready to go, basic user management, email integration, user registration with email confirmation and password retrieval, Prisma ORM, RadixUI components, and maybe some other things I'm missing. It should provide a good starting point for a basic web app and is an enhanced version of the [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

## Email

[React Email](https://react.email) with @react-email-components is integrated and includes a great way to preview emails in dev.

To see live email previews, run:

```bash
npm run preview-email
```

It may take 10 - 20 seconds the first time you run it.

Preview your emails at [http://localhost:3030](http://localhost:3030).

Note: The email preview server is set to [http://localhost:3030](http://localhost:3030) instead of the default port of `:3000` as indicated in the React Email docs.

This is set up for [Resend](https://resend.com) as the email provider but it's simple enough to use others such as Mailgun or Sendgrid.

## Learn More

Learn more about Next.js:

- [Next.js Docs](https://nextjs.org/docs)

This install uses the [Radix UI Theme](https://www.radix-ui.com/) which includes all kinds of slick styling.

## Deploy

I tried out [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the makers of Next.js and it seems pretty slick. I like to use [Render](https://render.com) but it's up to you!

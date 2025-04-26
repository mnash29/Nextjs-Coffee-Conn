This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## NextJS File Structure

<img src="./public/static/nextjs-mindmap.png" >

## Custom TailwindCSS

```css
@import "tailwindcss";

@theme {
  --color-purple-951: rgba(79, 70, 229, 1); /* Use as className='bg-purple-951' */
  --color-gray-951: hsla(0, 0%, 100%, 0.4);
  --color-gray-952: #373b64;
  --background-image-gradient: url('static/background.png');
  --font-sans: [ '--font-ibm-plex-sans']; /* Use as className='font-sans' */
  --font-inter: [ '--font-inter'];
}

body {
    @apply bg-gradient /* Uses above background-image gradient */
}
```

## Next Fonts

Automatically self-host Google fonts with [Next-Fonts](https://nextjs.org/docs/app/building-your-application/optimizing/fonts#google-fonts) to optimally load web fonts with zero `layout shift`. 

```js
import { IBM_Plex_Sans } from "next/font/google";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.className} antialiased`}>{children}</body>
    </html>
  );
}
```

### Apply Multiple Fonts

```js
import { IBM_Plex_Sans, Inter } from "next/font/google";

const ibmPlexSans = IBM_Plex_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-ibm-plex-sans"
});

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.variable} ${inter.variable} antialiased`}></body>
    </html>
  );
}
```

## Metadata API

Covers all [metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) fields necessary for effective search engine optimization

```js
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: { default: 'My Site', template: '%s | My Site' },
  description: 'Welcome to My Site',
  alternates: {
    canonical: 'https://example.com',
    languages: {
      'en-US': 'https://example.com/en-US',
      'de-DE': 'https://example.com/de-DE'
    }
  },
  openGraph: {
    title: 'My Site',
    description: 'Welcome to My Site',
    url: 'https://example.com',
    siteName: 'My Site',
    images: [{ url: 'https://example.com/og.png' }]
  },
}
```

## Server Components

Like React `Client` components but instead fetched and rendered at the server. [Server components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) are built by the server and are sent as streams of text data to reduce large dependencies and client-side javascript, keep sensitive data on the server (keys, api tokens). Client components are still needed to add interactivity, event listeners, use state and lifecycle effects, use browser-only APIs, custom hooks that depend on state, etc.

<img src="./public/static/server-components.png" width="500" style="display:flex;margin:auto;">
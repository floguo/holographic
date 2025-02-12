# Holographic Card

An interactive, 3D card component built with Next.js and Tailwind CSS. Features smooth animations, realistic lighting effects, and responsive mouse tracking.


## Features

- 🎨 Holographic gradient effects
- 🖱️ Interactive 3D rotation based on mouse position
- 💫 Double-click to trigger 360° spin animation
- 🔄 Click to flip card
- ✨ Dynamic lighting and shine effects
- 📱 Responsive design

## Tech Stack

- [Next.js 14](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [React](https://react.dev)

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

## Usage

The HolographicCard component can be imported and used in any Next.js page or component:

```tsx
import HolographicCard from '@/components/HolographicCard'

export default function Page() {
  return <HolographicCard />
}
```

## Interactions

- **Mouse movement**: Tilt the card in 3D space
- **Click**: Flip the card to see the back
- **Double-click**: Trigger a 360° spin animation
- **Hover**: Activate shine and lighting effects

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

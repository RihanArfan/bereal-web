# BeReal

[BeReal](https://bereal.com) 📸🕑⏳ as a progressive web app. - https://bereal.pages.dev

> 📢 This project is undergoing a major rewrite and currently does not work.

### What is BeReal

[BeReal](https://bereal.com) is the simplest photo sharing app to share once a day your real life in photo with friends.
Every day at a different time, everyone captures a photo within 2 minutes.
Capture and post in time to discover what your Friends are up to.

### Why does BeReal Web exist

BeReal's Android app was originally _really_ poorly designed, unlike their iOS app. I took it upon myself to create a platform agnostic PWA using their iOS app design. Since starting the project, BeReal's Android app UI has been updated to match their iOS app (🎉).

This project still exists since it works on any device, including laptops and tablets.

## Built with:

- [Nuxt 3 (+ Vue.js)](https://nuxt.com/)
- [Nuxt Image](https://image.nuxt.com/)
- [Nuxt UI](https://ui.nuxtlabs.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query/v5)
- [VueUse](https://vueuse.org/)
- [Vite PWA](https://vite-pwa-org.netlify.app/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## Developing

BeReal does not offer a public API and made it difficult to find values their source code, so they aren't include in this source code. BeReal Web handles these values server side only through environment variables. If you need them, you're probably technical enough to find them yourself, at which point [also look here](https://boards.eu.greenhouse.io/bereal).

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

In editors, we need to make the TypeScript language service aware of `.vue` types. We'll use Volar's [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669). You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### Install Dependencies

Make sure to install the dependencies:

```bash
pnpm install
```

### Development Server

Start the development server on `http://localhost:3000`

```bash
pnpm run dev
```

### Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm run lint
```

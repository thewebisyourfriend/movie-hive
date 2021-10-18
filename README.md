## Movie Hive - Movie and show search powered by TMDB

In order to get this site running please create an .env.local file that include the property: NEXT_PUBLIC_TMDB_SECRET equal to your API key for TMDB.

This project has been built with Next.js and Redux. The idea behind this project was to create a site that is server side rendered and then rehydrated with new information on the client side. The reason Redux was chosen was because I wanted to share some information between pages of the site, and would have been a useful experiment as Redux would be more useful on a larger site. Unfortunatly while Redux is being used, there was lots of issues getting it to work with Next.js - which seems like a common problem many face, with no solutions that work found on the internet.

### Improvements

There are many things that could be improved and continued to develop, some are:

- Getting Redux working correctly (data is being overidden when on rehydration on page change) - this involves a lot more research as there are no working examples of this and many people are facing the same issues.
- API calls could be all backend routes in order to mask the API key to the browser (a basic example of a route is included in the project under pages/api/trending)
- Pushing categories, search criteria to the router and url so that we can capture the data when using the browser navigation. This data could then be used to rehydrate the state to match the url (this data would already be there if Redux was working)
- Use NextAuth to login users to their own TMDB account so that the site has the ability to view personal lists etc
- Creating tests for pages, components and routes (I know this should be done while developing for TDD, however I have only little experience with writing them currently so I will come back to doing this as a learning exercise in the future)

This will be treated as a continuous project to come back to and improve.

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

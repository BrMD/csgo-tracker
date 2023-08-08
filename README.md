![Screenshot_20230808_121832](https://github.com/BrMD/csgo-tracker/assets/40863744/397c82df-6024-475a-87dd-7ffb23a70a1b)This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


****************************************************************************************************************************************************************************************************************

First Screen show only an Welcome message to the user and a Link if he dosen't know how to get his SteamID, if he click on the link he will be redirected for a Youtube Video of how he can get the ID and an Input where he put the ID.

![Screenshot_20230808_122527](https://github.com/BrMD/csgo-tracker/assets/40863744/195d6b72-f935-40f2-a2da-ac0474cdb7ab)

If is all good and the system has fetched his data and prices,the API used to get the data inventory is from steam(https://steamcommunity.com/inventory/{USER STEAMID}/730/2), after fetched his items other API is called and make a map method to go through the array of items and appending a Price Object to the ItemObject(http://csgobackpack.net/api/GetItemPrice/?currency=USD&id={NAMEITEM}), after all this steps the user is redirected to the main page of the application where all the data is getted by the cache of browser and runs another API to get the currencys(https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_ueSLnsniTYleqvyDK9iRiDhO5Ogl9FJOtYoVhdhZ).

![Screenshot_20230808_121832](https://github.com/BrMD/csgo-tracker/assets/40863744/17069c04-3e43-40c8-91a3-337d5acd5d42)

The user can choose the currency he wants and all the prices are automatically updated he can choose to show more or less items(begins with 16 but can be 24 or 32 per page) also the user can choose the Sorting method that is provided by fast-sort(https://www.npmjs.com/package/fast-sort) and the options are "None" where shows the order of the data is collected from API steam "Highest Price" shows the highest prices first, "LowestPrice" shows the lowests prices first, "Order Alphabethic Ascending" shows items that goes to A - Z and "Order Alphabethic Descending" shows items that goes to Z - A.

![Screenshot_20230808_121949](https://github.com/BrMD/csgo-tracker/assets/40863744/d4ec8600-1fcd-4e46-a9d6-c85ac81e2667)

The user can also click on any item he want and if the item has price show the type of the item, average price, highest price, average price, lowest price if the items dosen't has price just show and message that don't have any data.

![Screenshot_20230808_121937](https://github.com/BrMD/csgo-tracker/assets/40863744/aabd762b-680b-416a-8fa5-d90e43a93205)

The user can use the input on the top right of screen and search any item he want using the filter method provided by default on JS.





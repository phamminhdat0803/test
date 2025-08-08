# Affiliate Next.js App

This project is a basic affiliate marketing platform built with **Next.js 14**, **App Router**, **Tailwind CSS v4**, and **shadcn/ui**. Data is stored in Google Sheets and accessed via API routes.

## Features
- User login via Google Sheets account list.
- Product listing pulled from Google Sheets.
- Admin page to add products.
- Tracks product views and clicks.
- SEO friendly metadata.

## Environment Variables
Create a `.env` file with the following:
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=
PRODUCT_SHEET_ID=
ACCOUNT_SHEET_ID=
```

## Scripts
- `npm run dev` – start development server
- `npm run build` – build for production
- `npm test` – run tests (placeholder)

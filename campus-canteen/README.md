# Campus Canteen — React Frontend

A responsive student canteen menu built with React, Vite, React Router, Context, and a local JSON menu.

## Requirements
- Node.js and npm installed
- VS Code (recommended)

## Run the project
1. Extract/open the `campus-canteen` folder in VS Code.
2. Open Terminal → New Terminal.
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL printed by Vite, usually `http://localhost:5173/`.

If PowerShell blocks `npm`, use `npm.cmd install` and `npm.cmd run dev`.

## Features
- Loads menu data from `public/menu.json` using `useEffect`, `fetch`, and `async/await`.
- Loading and error messages.
- Search, category filters, and favourites toggle.
- Menu, item details, and cart screens using React Router.
- Shared cart Context keeps the header quantity and cart subtotal updated without reloading.
- Increase/decrease quantity, remove items, and demo checkout.
- Responsive CSS for phones, tablets, and desktops.

## Short screen recording checklist
Use Windows Snipping Tool (Win + Shift + R, if available) or Xbox Game Bar (Win + G) to record:
1. Show the menu page and search for an item.
2. Select a category and toggle a favourite.
3. Open an item details page and add it to the cart.
4. Show the header cart count changing.
5. Open the cart, increase/decrease quantity, and show the total updating.
6. Stop recording and save the clip as `campus-canteen-demo.mp4`.

The checkout is only a demo and does not process payments.

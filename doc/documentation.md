# CRONOS Social Media app
**Made by:** Ondřej Kačírek

**Contacts:** https://github.com/BluePixelDev

**Date:** 16.1.2025

**Description:**
Cronos is a simple social media app that allows user to register, create post follow people, post, and heart other people posts.

*This application was made as a school project for SPŠE Ječná* 

## Setup
First you have to install all dependecies
```js
npm i // Installs all node dependencies
```
Once thats done, create .env file using the provided template (.env.templete)

```js
# Server Side Variables
JWT_SECRET=<SUPER_SECRET_TOKEN>

# Database
DATABASE_URL="<databse-engine>://<password>:<username>@<host>:<port>/<database>"
DEFAULT_TRANSACTION_ISOLATION="READ COMMITTED"

```
#### Explanation:
- ``JWT_SECRET`` is a string used for authorization and authentication (Very important to set it)
- ``DATABASE_URL`` is a mysql connection string used by ORM for connecting.
-``DEFAULT_TRANSACTION_ISOLATION`` changes how transactions are isolated throughout the application

## Runnning
First thing first you must migrate the database.
```js
npx prisma migrate dev --name init
```
Then to run sveltekit locally you must run:
```js
npm run dev
```

## Output (Export)
In order to export information user has to have the role of ``ADMIN`` and must got to /admin where a button generating small report is located.

## Used Libraries
- Prisma (ORM)
- Mysql2 (Mysql connector for orm)
- Sveltekit (Web Application JS Framework)
- Bcryptjs (Encryption)
- JsonWebToken (JWT)
- Taiwlind (Styles)
- Marked (MArkdown)

## Sources

### Prisma
https://www.prisma.io/docs/orm/prisma-client/queries/transactions
https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries
https://www.prisma.io/docs/orm/prisma-client/queries/excluding-fields

### Svelte
https://svelte.dev/docs/svelte/$effect
https://svelte.dev/docs/kit/routing
https://svelte.dev/docs/kit/adapter-node
https://svelte.dev/docs/kit/hooks
https://svelte.dev/docs/kit/errors

### Tailwind
https://tailwindcss.com/docs/installation
https://tailwindcss.com/docs/customizing-colors
https://tailwindcss.com/docs/font-family
https://tailwindcss.com/docs/border-color
https://tailwindcss.com/docs/border-color
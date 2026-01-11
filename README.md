# Backend
## ENV
```cmd
BETTER_AUTH_SECRET=xyz
BETTER_AUTH_URL=http://localhost:4000

DATABASE_URL=postgres://user:password@localhost:5433/vessify
```

to generate BETTER_AUTH_SECRET 
```cmd
npx @better-auth/cli@latest secret
```
to generate BETTER_AUTH_SECRET use above command

1. If you don't have docker install Docker first. Then Clone the director
```cmd 
  git clone https://github.com/imkrish7/transaction.git
```
2. Enter the directory  backend
a. First, run the Docker instance for the PostgreSQL instance
b. Run Docker instance
```cmd 
docker compose up
```
c. Install all the dependencies
```cmd
npm install or yarn
```
d. do prisma 
```cmd
npx prisma studio
```
if table are not available in Prisma Studio.
```cmd
  npx prisma generate
```
then migrate
```cmd
npx prisma migrate dev --name 'xyz'
```
If tables are there in Prisma Studio, then no need to worry

Then, do to start the server in dev mode
```cmd
npm run dev
```

# Frontend
## ENV
```cmd
AUTH_SECRET=xyz
BACKEND_URI=http://localhost:4000/api
```
to generate the AUTH_SECRET of the environment variable
```cmd
npx auth secret
``` 
It will add AUTH_SECRET to .env
a. Enter the frontend directory
```cmd
cd frontend
```
b. install dependencies
```cmd
  npm install or yarn
```
c. run the server
```cmd
npm run dev
```
Then start using it




<h1 align="center"> SIMPLE AUTH SYSTEM </h1>

## Features:

-  Local authentication (email & password)
-  JWT tokens based authorization
-  maps api to get user's location & timezone
-  HttpOnly cookies to store tokens
-  https enabled server

#

## Known Issues:

-  api testing isn't working

#

## Limitations:

-  manually give latitude & longitude values
-  no refresh token rotation

#

## Future scope:

-  add frontend
-  add google oauth social login

## Setup :

### Step 1: Clone the repository

Clone the repo to backend directory:

```sh
git clone https://github.com/ankushknr19/auth-app.git ankush-auth-app
```

### Step 2: Open develop branch

```sh
cd ankush-auth-app
git checkout develop
```

### Step 3: Install Dependencies

```sh
cd backend
npm install
```

### Step 4: Build

```sh
npm run build
```

### Step 5: Setup Environment Variables

-  rename [.env.example](./backend/.env.example) file to [.env](/)
-  replace the values with your own valid values

### Step 6: Run the server

```sh
npm run dev
```

### Step 7: Perform CRUD operations from [rest.http](./backend/rest.http) file serially

#

# MERN Project

A full-stack MERN app scaffold with:
- **Client**: React + Vite
- **Server**: Express + Mongoose
- **Database**: MongoDB Atlas
- **Image uploads**: Cloudinary
- **Auth**: Google OAuth (Passport) + JWT cookie sessions

## Project structure

```
mern-project/
├── client/          # Vite React app
└── server/          # Express API
    └── src/
        ├── config/       # db, cloudinary, passport
        ├── models/       # Mongoose schemas
        ├── routes/       # auth + upload routes
        ├── middleware/   # JWT protect middleware
        └── utils/        # token helper
```

## 1. MongoDB Atlas setup

1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account.
2. Create a new **Project**, then build a free **M0 cluster**.
3. Under **Database Access**, add a database user with a username/password.
4. Under **Network Access**, add your IP (or `0.0.0.0/0` for development — allow-all, not for production).
5. Click **Connect** → **Drivers** → copy the connection string, it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Paste it into `server/.env` as `MONGO_URI` (add your db name before the `?`, e.g. `.../mydb?retryWrites...`).

## 2. Cloudinary setup

1. Sign up at https://cloudinary.com/users/register_free.
2. On your Cloudinary **Dashboard**, copy your **Cloud name**, **API Key**, and **API Secret**.
3. Paste them into `server/.env` as `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

The server is already set up with `multer-storage-cloudinary` so uploads go straight to Cloudinary — see `server/src/config/cloudinary.js` and `POST /api/upload`.

## 3. Google OAuth setup

1. Go to https://console.cloud.google.com/ and create a new project (or use an existing one).
2. Go to **APIs & Services → OAuth consent screen**, choose **External**, fill in the required fields, and add your email as a test user.
3. Go to **APIs & Services → Credentials → Create Credentials → OAuth client ID**.
   - Application type: **Web application**
   - Authorized JavaScript origins: `http://localhost:5173`
   - Authorized redirect URIs: `http://localhost:5000/api/auth/google/callback`
4. Copy the **Client ID** and **Client Secret** into `server/.env` as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

The flow is already wired: clicking "Sign in with Google" on the client hits `GET /api/auth/google`, which redirects to Google, then Google redirects back to `/api/auth/google/callback`, which creates/finds the user, sets a JWT cookie, and redirects to the client.

## 4. Running locally

**Server:**
```bash
cd server
cp .env.example .env   # then fill in the real values
npm run dev
```

**Client:**
```bash
cd client
cp .env.example .env   # defaults should work as-is for local dev
npm run dev
```

Client runs on `http://localhost:5173`, server on `http://localhost:5000`.

## 5. Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial commit: MERN scaffold with Mongo Atlas, Cloudinary, Google OAuth"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

> Create the empty repo on GitHub first (github.com/new) before running the `remote add` / `push` commands, and make sure `.env` files are never committed — `.gitignore` already excludes them.

<div align="center">

# 📚 BookNook

**Add a book. Borrow a book. Return a book.**

A small online library where readers share books, borrow them for a few days, and return them when they are done.

### 🌐 [Live Site: ] https://book-nook-client-two.vercel.app/

### linkdin => https://www.linkedin.com/in/towfiqul-tamal/

</div>

---

## ✨ Key Features

- 🎠 **Hero slider and dynamic home page**: Swiper.js slider, the latest 6 books loaded from the database, plus "How Borrowing Works" and "Top Categories" sections
- 🔍 **Browse and filter books**: view all books in a responsive grid and explore them by category, with a clear "No books available" state
- ➕ **Full book management**: add books with image upload (imgbb), edit them, and delete them with a confirmation modal
- 🤝 **Smart borrowing system**: borrow with a return date, return from My Borrows, copies update automatically, and the same book cannot be borrowed twice at once
- 🔐 **Secure authentication**: email/password and Google login with BetterAuth, private routes, and login that survives page reloads
- 🛡️ **Protected API**: JWT verification and ownership checks on the Express server, so users can only change their own data
- 📱 **Responsive and polished UI**: works on mobile, tablet and desktop, with toast messages, loading spinners, page titles and a custom 404 page

---

## 🗺️ Pages

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home with slider, new arrivals and extra sections |
| `/books` | Public | All books |
| `/books/:id` | Private | Book details and borrow button |
| `/category/:name` | Private | Books filtered by category |
| `/add-book` | Private | Add a new book |
| `/my-books` | Private | Edit and delete your books |
| `/my-borrows` | Private | Your borrowed books and return button |
| `/profile` | Private | View and update your profile |
| `/login`, `/register` | Public | Authentication |

---

## 🛠️ Tech Stack

**Frontend**
- Next.js (App Router), TypeScript
- Tailwind CSS
- Swiper.js, react-hot-toast, lucide-react, react-icons

**Authentication**
- BetterAuth with MongoDB adapter
- Google OAuth
- JWT (BetterAuth jwt plugin)

**Backend**
- Express.js, MongoDB
- JWT verification with `jose`

**Hosting**
- Client and server on Vercel

---

## 🔌 API Routes

| Method | Route | Access |
|---|---|---|
| GET | `/books` | Public |
| GET | `/books/:id` | Public |
| POST | `/books` | JWT |
| PATCH | `/books/:id` | JWT (owner only) |
| DELETE | `/books/:id` | JWT (owner only) |
| POST | `/borrows` | JWT |
| GET | `/borrows` | JWT |
| DELETE | `/borrows/:id` | JWT (owner only) |

---

## 🚀 Run Locally

**1. Clone the repository**

```bash
git clone https://github.com/Tamal-codes/BookNook-client.git
cd BookNook-client
```

**2. Install dependencies**

```bash
npm install
```

**3. Create a `.env` file in the project root**

```env
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**4. Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> The Express server lives in a separate repository: [BookNook-server](https://github.com/Tamal-codes/BookNook-server). Run it on port 8000 with `MONGO_URI` and `CLIENT_URL=http://localhost:3000` in its `.env` file.

---

## 📝 Notes

- The server runs on a free hosting plan, so the first request after a while may take a few seconds.
- Email verification and password reset are intentionally not included.

---

<div align="center">

Made with ❤️ by **Towfiqul**

</div>
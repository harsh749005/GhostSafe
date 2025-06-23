# 👻 GhostSafe  

**GhostSafe** is a secure web application designed to store users' **confidential data** such as passwords, bank details, card information, and personal notes — all encrypted and protected by modern authentication practices.

---

## 🚀 Features

-  **JWT Authentication** – Secure user authentication and protected routes
-  **Bcrypt Hashing** – Passwords are hashed before storage for enhanced security
-  **Secure Cookies** – JWT tokens are stored in HTTP-only cookies to prevent XSS
-  **Save and Manage:**
  - Passwords
  - Bank Details
  - Card Details
  - Personal Notes
- **Responsive Design** – Smooth and clean UI with responsive layouts

---

## 🛠 Tech Stack

| Tech          | Description                         |
|---------------|-------------------------------------|
| **Next.js**   | React-based framework for fullstack apps |
| **Neon DB**   | Serverless Postgres database        |
| **Prisma**    | Type-safe ORM for database access   |
| **Bcrypt.js** | Password hashing                    |
| **JWT**       | JSON Web Tokens for authentication  |
| **TailwindCSS** | Utility-first styling framework  |

---

## 🔐 Security Practices

- Passwords are **hashed using bcrypt** before storing in the database.
- **JWTs** are stored in **HTTP-only cookies**, making them inaccessible to JavaScript.
- Sensitive routes are **protected via token verification** middleware.
- Input validation and sanitization to avoid common web vulnerabilities.

---

## 📸 Screenshots

> _Add some screenshots here showing the dashboard, login, data entry pages, etc._

---

## ⚙️ Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/your-username/ghostsafe.git
cd ghostsafe
npm install
npm run dev
```
📦 Deployment
You can deploy GhostSafe using Vercel for seamless Next.js hosting. Ensure environment variables are correctly set in the Vercel dashboard.

 Contact
If you have feedback, feature requests, or just want to connect:

GMail : patelharsh749005@gmail.com   
LinkedIn : https://www.linkedin.com/in/harsh-patel-24a142223/

GhostSafe – because your secrets deserve a vault. 

```yaml
---

Let me know if you'd like:
- A version with badges (e.g., build status, tech stack)
- Screenshot/image placeholders
- Instructions for using Prisma or database setup

I can also format this as a downloadable file for you.





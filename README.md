# 💰 MoneyMap — Personal Finance Dashboard

MoneyMap is a **personal finance dashboard** that helps you **visualize, track, and manage your money with clarity**.  
It combines **budget tracking**, **expense categorization**, and **financial insights** into a sleek, responsive interface.

---

## 🚀 Features

- 📊 **Interactive Dashboard** – View income, expenses, and savings at a glance.  
- 🏷 **Smart Categorization** – Automatically tag and organize transactions.  
- 📅 **Monthly & Yearly Views** – Track spending trends over time.  
- 📈 **Financial Goals** – Set and monitor your savings targets.  
- 🔒 **Secure & Private** – Your data is encrypted and stored safely.  
- ☁ **Cloud Sync** – Access your dashboard anywhere, anytime.  

---

## 🛠 Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/) (React framework)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Chart.js](https://www.chartjs.org/) or [Recharts](https://recharts.org/) for visualizations

**Backend (via Next.js API Routes):**
- [Prisma ORM](https://www.prisma.io/) for database management
- [PostgreSQL](https://www.postgresql.org/) (or [MongoDB](https://www.mongodb.com/))
- [JWT](https://jwt.io/) for authentication

---

## 📦 Installation

Clone the repository
git clone https://github.com/your-username/moneymap.git
cd moneymap

Install dependencies
pnpm install


Create environment variables file
touch .env

Add the following to `.env`:
DATABASE_URL=your_database_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

Run database migrations:
npx prisma migrate dev


Start the development server:
pnpm dev

or
npm run dev


---

## 📂 Project Structure

```text
moneymap/
├── prisma/         # Prisma schema & migrations
├── public/         # Static assets (icons, images, etc.)
├── src/
│   ├── app/        # App Router pages, layouts, and API routes
│   ├── components/ # Reusable UI components
│   ├── lib/        # Utility functions (database client, helpers)
│   └── styles/     # Global styles and Tailwind CSS config
├── .env.local      # Local environment variables (untracked)
├── package.json
└── README.md
```


---

## 📜 Development Scripts

| Command       | Description                       |
|--------------|-----------------------------------|
| `pnpm dev`   | Start development server          |
| `pnpm build` | Build for production              |
| `pnpm start` | Start production server           |
| `pnpm lint`  | Run ESLint checks                 |
| `pnpm format`| Format code with Prettier         |

---

## 📸 Screenshots

<img width="1902" height="960" alt="dashboard" src="https://github.com/user-attachments/assets/01a28151-d59c-4dfe-ab77-0fd733a705fa" />

<img width="1903" height="938" alt="investment_planning" src="https://github.com/user-attachments/assets/af188312-675b-42e9-8e59-d04624193809" />

<img width="1904" height="955" alt="expense_tracker" src="https://github.com/user-attachments/assets/3a9f8fef-8ca7-4c0e-8a41-fd8b109a9fd6" />

---

## 🛡 Security

- **Sensitive data is encrypted before storage**
- **JWT-based authentication** for API security
- **Role-based access control** for multi-user setups

---

## 🤝 Contributing

Pull requests are welcome!  
If you have suggestions for new features or improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push to your branch (`git push origin feature-name`)
5. Open a Pull Request 🎉

---

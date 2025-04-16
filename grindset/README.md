# Grindset 🧠🔥

Grindset is a goal-enforcing fitness and productivity app built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **MongoDB**. It’s designed to keep users accountable, help build consistency, and maintain momentum toward their goals.

---

👥 Authors

- Cody Karl
- Edgar David Cure Sanchez
- Jeremy Diamond

---

## 🚀 Features

- ✅ User authentication with Clerk  
- 🗕️ Scheduled tasks and reminders using `node-schedule`  
- 📧 Email notifications powered by Resend and React Email  
- 🌿 Clean UI components with Radix UI and Lucide  
- ⚙️ MongoDB for persistent goal and user data  
- 🧪 Type-safe forms and validation with Zod  
- 🔀 Smooth animations and UX enhancements with Tailwind CSS and Tailwind Animate  

---

## 🛠 Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/docs/app)  
- **Language**: TypeScript  
- **Styling**: Tailwind CSS, Tailwind Merge, Radix UI  
- **Database**: MongoDB via Mongoose  
- **Authentication**: Clerk  
- **Emailing**: Resend + React Email  
- **Validation**: Zod  
- **Job Scheduling**: Node Schedule  

---

## 📦 Getting Started

### 1. **Clone the Repository**

```bash
## Clone Repo
git clone https://github.com/Jeremy-Diamond/GoalEnforcer

## Navigate to grindset
cd grindset

## Install dependencies 
npm install

##Run DEvelopment Server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

If you plan to store create a full working app you will need to create a .env file with the following variables. 

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
MONGODB_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

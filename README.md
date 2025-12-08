# Nadun Malwenna - Personal Portfolio

A modern, high-performance personal portfolio website built with **Next.js 15**, **Firebase**, and **Google Gemini AI**. This project showcases professional experience, projects, skills, and includes an interactive AI assistant and guestbook.

## 🚀 Key Features

### 👤 Public Portfolio
- **Dynamic Content**: Data-driven sections for Experience, Projects, Education, and Tech Stack fetched from Firestore.
- **Interactive Guestbook**: Allows visitors to leave messages using their Google account (secured via Firebase Auth).
- **AI Portfolio Assistant**: A smart chatbot powered by **Gemini 2.0 Flash Lite** that answers questions about Nadun's professional background.
- **Responsive Design**: Fully mobile-responsive UI built with Tailwind CSS.
- **Dark Mode**: Seamless theme switching support.

### 🛡️ Admin Dashboard (`/admin`)
- **Secure Authentication**: Protected routes for content management.
- **Content Management**: CRUD operations for Blogs, Projects, Experiences, and Skills.
- **Analytics**: Integrated Google Analytics dashboard to track visitor engagement.
- **Message Management**: Moderation tools for Guestbook entries.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Framer Motion (Animations)
- **Backend / Database**: Firebase (Auth, Firestore, Storage)
- **AI Integration**: Google Generative AI SDK (Gemini)
- **Icons**: Lucide React, React Icons
- **Markdown**: React Markdown (for blog & chat rendering)

## ⚙️ Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```bash
# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Firebase Admin SDK (Service Account)
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

## 🏃‍♂️ Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Security & Privacy

- **Verification**: Guestbook writes are secured via server-side ID token verification.
- **AI Safety**: The Chatbot implements strict safety settings and system instructions to prevent abuse and keep conversations relevant.
- **Policies**: Includes dedicated Privacy Policy and Terms of Service pages compliant with data collection practices (Auth, Analytics).

## 📄 License

This project is for personal portfolio usage.

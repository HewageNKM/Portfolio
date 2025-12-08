
# Portfolio Website

A personal portfolio website built with React, TypeScript, and Vite, featuring a dynamic Admin Dashboard for content management. This project serves as a showcase of skills, projects, and blogs, with a fully integrated backend using Firebase.

## 🚀 Deployment

**Live Site:** [https://hewagenkm.com](https://hewagenkm.com)

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **State Management & Animations:** Framer Motion
- **Backend / BaaS:** Firebase (Authentication, Firestore, Storage, Cloud Functions, Analytics)
- **Editor:** React Quill (Rich Text)
- **Icons:** React Icons, Lucide React

## ✨ Features

### Public Interface
- **Responsive Design:** Fully optimized for all device sizes.
- **Dynamic Content:** Blogs, Projects, and Experience data fetched from Firestore.
- **Contact Form:** Integrated WhatsApp direct messaging.
- **SEO Optimized:** Meta tags, Open Graph support, and dynamic sitemap generation.

### Admin Dashboard (Protected)
- **Authentication:** Secure login for admin access.
- **Analytics:** Integrated Google Analytics dashboard.
- **Content Management:**
  - **Blogs:** Create, edit, delete blog posts with rich text and tags.
  - **Projects:** Manage portfolio projects.
  - **Experience & Education:** Update professional background.
  - **Tech Stack:** Manage displayed technologies.
- **AI Assistance:** Integrated AI tools for content generation (Drafting blogs, descriptions).
- **Settings:** Profile and site configuration.

## 💻 Local Development

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/hewagenkm/hewagenkm.github.io.git
    cd hewagenkm.github.io
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env` file in the root directory and add the following Firebase configuration keys. You can obtain these from your Firebase Console.

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_WHATSAPP_NUMBER=your_whatsapp_number
```

### Running the App

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist` directory.

## ☁️ Deployment

This project is configured for Firebase Hosting.

1.  **Install Firebase CLI:**
    ```bash
    npm install -g firebase-tools
    ```

2.  **Login to Firebase:**
    ```bash
    firebase login
    ```

3.  **Deploy:**
    ```bash
    firebase deploy
    ```

## 📄 License

This project is for personal use.
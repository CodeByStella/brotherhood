# Brothers Community

Welcome to Brothers International Community!

Join us in fostering a community of brotherhood, collaboration, and knowledge-sharing. Explore the diverse perspectives and engage with fellow members.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Ant Design](https://ant.design/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Backend**: [Firebase](https://firebase.google.com/) (Auth, Firestore, Storage, Cloud Functions)
- **Language**: TypeScript

## Prerequisites

- Node.js 20 or later
- npm, yarn, pnpm, or bun
- A Firebase project with the following services enabled:
  - Authentication
  - Firestore Database
  - Storage
  - (Optional) Cloud Functions

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd brotherhood
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> You can find these values in the Firebase Console under Project Settings > Your Apps > Web App.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint to check code quality |

## Project Structure

```
brotherhood/
├── public/              # Static assets (images, icons)
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── Components/      # React components
│   ├── constants/       # Application constants
│   ├── Fonts/           # Custom fonts
│   ├── lib/             # Firebase configuration and utilities
│   ├── redux/           # Redux store and slices
│   └── utils/           # Helper functions
├── functions/           # Firebase Cloud Functions
├── tailwind.config.ts   # Tailwind CSS configuration
└── next.config.js       # Next.js configuration
```

## Firebase Cloud Functions Setup

The project includes Firebase Cloud Functions in the `functions/` directory. To set them up:

```bash
cd functions
npm install
```

Deploy functions:
```bash
firebase deploy --only functions
```

## Contributing

Please refer to our [Contributing file](CONTRIBUTING.md) for guidelines on how to contribute to the project.

## Maintainer

This project is maintained by [Harun Bekri](https://github.com/hariyebk). If you have any questions or need help with a pull request, feel free to reach out to me.

Thank you for your interest!
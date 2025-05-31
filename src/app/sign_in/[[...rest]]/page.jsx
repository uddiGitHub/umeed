// app/sign-in/page.tsx
'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <main
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#f8fafc', // light tailwind-gray
      }}
    >
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 600 }}>
        Admin Login
      </h1>
      <SignIn
        appearance={{
          elements: {
            card: {
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '0.75rem',
              padding: '1rem',
            },
          },
        }}
      />
    </main>
  );
}

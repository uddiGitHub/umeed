// app/sign-in/page.tsx
'use client';

// import { SignIn } from '@clerk/nextjs';
import { useSignIn } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SignInPage() {
  const { isLoaded, signIn } = useSignIn();

  if (!isLoaded) return null;

  const handleGoogleSignIn = async () => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/admin',
      });
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Google login failed');
    }
  };

  return (
    <main
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#f8fafc',
      }}
    >
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 600 }}>
        Admin Login
      </h1>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to access admin dashboard.</CardTitle>
          <CardDescription>
            Login with the Gmail account that have admin access.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" onClick={handleGoogleSignIn} className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>

      {/* only keeping this for signUp purpose of new account to give them access to the admin dashboard */}
      {/* <SignIn
        appearance={{
          elements: {
            card: {
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '0.75rem',
              padding: '1rem',
            },
          },
        }}
      /> */}
    </main>
  );
}

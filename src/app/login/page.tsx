import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/icons/logo";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
         <div className="flex flex-col items-center justify-center gap-4 mb-8">
            <Logo className="size-12 text-primary" />
            <h1 className="font-headline text-3xl font-bold text-center">
              Webflow Sentinel
            </h1>
            <p className="text-center text-muted-foreground">
              Securely access your webhook dashboard.
            </p>
          </div>
        <LoginForm />
      </div>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Webflow Sentinel. All rights reserved.
      </footer>
    </main>
  );
}

import { AuthForm } from '@/components/auth-form';
import { FloatingBackButton } from '@/components/floating-back-button';

export default function LoginPage() {
  return (
    <>
      <FloatingBackButton />
      <AuthForm mode="login" />
    </>
  );
}

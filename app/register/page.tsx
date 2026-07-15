import { AuthForm } from '@/components/auth-form';
import { FloatingBackButton } from '@/components/floating-back-button';

export default function RegisterPage() {
  return (
    <>
      <FloatingBackButton />
      <AuthForm mode="register" />
    </>
  );
}

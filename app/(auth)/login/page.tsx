import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { images } from "@/constants/images";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome Back!"
      formTitle="Sign In"
      description="Start your farming growth journey by creating an account with us today."
      imageSrc={images.authLayoutImage}
      imageAlt="Farmcash login illustration"
      reverse={true}
      actionBtn="Sign In"
    >
      <LoginForm />
    </AuthShell>
  );
}

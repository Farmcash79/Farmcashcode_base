import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";
import { images } from "@/constants/images";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Hello, Welcome to Farmcash!"
      formTitle="Sign Up"
      description="Start your farming growth journey by creating an account with us today."
      imageSrc={images.authLayoutImage}
      imageAlt="Farmcash register illustration"
      reverse={false}
      actionBtn="Sign Up"
    >
      <RegisterForm />
    </AuthShell>
  );
}

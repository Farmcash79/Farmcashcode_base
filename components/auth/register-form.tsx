"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterInput } from "@/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loading } from "../feedback/loading";
import Link from "next/link";

export function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
    mode: "all",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (!res.ok) {
      setServerError(data.message || "Registration failed");
      return;
    }

    router.push(data.redirect);
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="Full Name" {...form.register("name")} />
        <FieldError>{form.formState.errors.name?.message}</FieldError>
      </Field>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input
          type="email"
          placeholder="Email Address"
          {...form.register("email")}
        />
        <FieldError>{form.formState.errors.email?.message}</FieldError>
      </Field>
      <Field>
        <FieldLabel>Password</FieldLabel>
        <Input
          type="password"
          placeholder="Create Password"
          {...form.register("password")}
        />
        <FieldError>{form.formState.errors.password?.message}</FieldError>
      </Field>

      <Field>
        <FieldLabel>Confirm Password</FieldLabel>
        <Input
          type="password"
          placeholder="Confirm Password"
          {...form.register("confirmPassword")}
        />
        <FieldError>
          {form.formState.errors.confirmPassword?.message}
        </FieldError>
      </Field>
      {serverError ? (
        <p className="text-sm text-red-300">{serverError}</p>
      ) : null}
      <Button
        type="submit"
        className="btn w-2xs mx-auto flex justify-center"
        disabled={form.formState.isSubmitting || !form.formState.isValid}
      >
        {form.formState.isSubmitting ? <Loading /> : "Sign Up"}
      </Button>

      <p className="font-medium text-sm text-center">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary">
          Sign In
        </Link>
      </p>
    </form>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginInput } from "@/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { Loading } from "../feedback/loading";

export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "all",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (!res.ok) {
      setServerError(data.message || "Login failed");
      return;
    }

    router.push(data.redirect);
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input
          type="email"
          placeholder="you@example.com"
          {...form.register("email")}
        />
        <FieldError>{form.formState.errors.email?.message}</FieldError>
      </Field>

      <Field>
        <FieldLabel>Password</FieldLabel>
        <Input
          type="password"
          placeholder="••••••••"
          {...form.register("password")}
        />
        <FieldError>{form.formState.errors.password?.message}</FieldError>
      </Field>

      {serverError ? (
        <p className="text-sm text-red-300">{serverError}</p>
      ) : null}

      <Button
        type="submit"
        className="btn w-2xs mx-auto flex justify-center"
        disabled={form.formState.isSubmitting || !form.formState.isValid}
      >
        {form.formState.isSubmitting ? <Loading /> : "Sign In"}
      </Button>

      <p className="font-medium text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-primary">
          Sign Up
        </Link>
      </p>
    </form>
  );
}

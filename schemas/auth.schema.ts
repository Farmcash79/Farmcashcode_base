import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter valid email").nonempty(),
  password: z.string().min(2, "Password is required"),
});

export const registerSchema = z
  .object({
    name: z.string().min(4, "Name is required").nonempty(),
    email: z.email("Enter valid email").nonempty(),
    password: z
      .string()
      .nonempty()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must not exceed 128 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string().nonempty(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterType = z.infer<typeof registerSchema>;
export type LoginType = z.infer<typeof loginSchema>;

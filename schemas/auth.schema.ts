import { z } from "zod";

export const roleSchema = z.enum(["FARMER", "ADMIN", "AGENT"]);

export const loginSchema = z.object({
  email: z.email("Enter a valid email").nonempty(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty(),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must not exceed 128 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RoleType = z.infer<typeof roleSchema>;

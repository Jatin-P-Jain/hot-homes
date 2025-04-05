import { z } from "zod";
export const passwordValidation = z.string().refine((value) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
  return regex.test(value);
}, "Password must be at lest 6 characters, 1 uppercase, 1 lowercase, 1 special character");
export const registerUserSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    password: passwordValidation,
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        message: "Passwords do not match",
        path: ["passwordConfirm"],
        code: "custom",
      });
    }
  });

import { z } from 'zod';

const loginSchema = z.object({
    email: z
        .string()
        .email('Email không hợp lệ')
        .min(5, 'Email phải có ít nhất 5 ký tự')
        .max(100, 'Email không được vượt quá 100 ký tự'),
    password: z
        .string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .max(50, 'Mật khẩu không được vượt quá 50 ký tự'),
});
export type LoginSchema = z.infer<typeof loginSchema>;

export { loginSchema };

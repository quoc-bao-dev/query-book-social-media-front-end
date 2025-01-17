import { z } from 'zod';

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(3, 'Tên người dùng phải có ít nhất 3 ký tự')
            .max(20, 'Tên người dùng không được vượt quá 20 ký tự')
            .regex(
                /^[a-zA-Z0-9_]+$/,
                'Tên người dùng chỉ được chứa chữ, số, và dấu gạch dưới'
            ),
        email: z.string().email('Email không hợp lệ'),
        password: z
            .string()
            .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
            .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa')
            .regex(/[a-z]/, 'Mật khẩu phải chứa ít nhất một chữ cái thường')
            .regex(/\d/, 'Mật khẩu phải chứa ít nhất một chữ số')
            .regex(
                /[@$!%*?&]/,
                'Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@$!%*?&)'
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu xác nhận không khớp',
        path: ['confirmPassword'], // Liên kết lỗi với trường confirmPassword
    });

export type RegisterSchema = z.infer<typeof registerSchema>;

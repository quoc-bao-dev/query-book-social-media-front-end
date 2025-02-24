import { z } from 'zod';

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Mật khật phải có ít nhất 8 ký tự')
      .regex(/[A-Z]/, 'Mật khật phải chứa ít nhất một chữ cái viết hoa')
      .regex(/[a-z]/, 'Mật khật phải chứa ít nhất một chữ cái thường')
      .regex(/\d/, 'Mật khật phải chứa ít nhất một chữ số')
      .regex(
        /[@$!%*?&]/,
        'Mật khật phải chứa ít nhất một ký tự đặc biệt (@$!%*?&)',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khật xác nhận không khớp',
    path: ['confirmPassword'], // Liên kết lỗi với trường confirmPassword
  });

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

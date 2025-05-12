import { z } from 'zod';

export const formUserOnboarding = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' }) // Không được để trống
    .max(50, { message: 'First name must be less than 50 characters' }), // Giới hạn độ dài
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' }) // Không được để trống
    .max(50, { message: 'Last name must be less than 50 characters' }), // Giới hạn độ dài
  avatarFile: z.any().optional().or(z.literal('')), // Hỗ trợ trường hợp không upload file
  jobTitle: z
    .string()
    .min(1, { message: 'Job title is required' }) // Không được để trống
    .max(100, { message: 'Job title must be less than 100 characters' }), // Giới hạn độ dài
});

export type FormUserOnboardingSchema = z.infer<typeof formUserOnboarding>;

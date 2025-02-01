import { z } from 'zod';

export const createHostingSchema = z.object({
    subdomain: z
        .string()
        .min(3, 'Subdomain phải có ít nhất 3 ký tự')
        .max(20, 'Subdomain không được vuien quá 20 ký tự')
        .regex(/^[a-zA-Z0-9_]+$/, 'Subdomain chi này bao gom chuỗi và so'),
});

export type CreateHostingSchema = z.infer<typeof createHostingSchema>;

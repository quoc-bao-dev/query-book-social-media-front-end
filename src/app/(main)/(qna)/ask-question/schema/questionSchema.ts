import { z } from 'zod';

// Zod schema for uploading a question
export const questionSchema = z.object({
    topic: z.string(),
    title: z.string().min(5, 'Title must be at least 5 characters long'),
    content: z.string().min(10, 'Content must be at least 10 characters long'),
    code: z.string().optional(),
    hashtags: z.array( z.string().min(1, 'Hashtag cannot be empty')).optional(),
});
export type QuestionSchema = z.infer<typeof questionSchema>;

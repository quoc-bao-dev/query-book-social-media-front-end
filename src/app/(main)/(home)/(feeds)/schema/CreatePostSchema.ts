import { z } from 'zod';

export const createPost = z.object({
  content: z.string({ message: 'Vui lòng nhập nội dung bài viết' }).min(1, 'Nội dung bài viết không được để trống'),
  hashTags: z
    .array(
      z
        .string()
        .min(1, 'Thẻ tag không được để trống')
        .max(20, 'Thẻ tag không được vượt quá 20 ký tự'),
    )
    .optional(), // Cho phép bỏ trống nếu cần
  status: z
    .enum(['friend', 'hidden', 'public', 'private'])
    .refine(
      (value) =>
        value === 'public' ||
        value === 'private' ||
        value === 'hidden' ||
        value === 'friend',
      {
        message: "Trạng thái phải là 'public' hoặc 'private'",
      },
    )
    .optional(),
  media: z
    .array(
      z.object({
        fileName: z.string().min(1, 'Tên file không được để trống').optional(),
        url: z.string().url('URL không hợp lệ').optional(),
        type: z.literal('image').optional(),
        sourceType: z
          .string()
          .min(1, 'Loại nguồn không được để trống')
          .optional(),
      }),
    )
    .max(10, 'Không được vượt quá 10 file')
    .optional(),
});

export type CreatePostSchema = z.infer<typeof createPost>;

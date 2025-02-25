import { z } from 'zod'
export const CreateFeed = z.object({
    media: z.object({})
})


export type CreateFeedType = z.infer<typeof CreateFeed> 